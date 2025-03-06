import { Challenge, QuizQuestion } from '@/types/types'
import { getCategoryIdFromSubject, getDifficulty } from '@/utils/helpers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'

const generateId = () =>
	`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const API_URL = 'https://opentdb.com/api.php'

export const useChallenge = (grade?: string, subject?: string) => {
	const [challenge, setChallenge] = useState<Challenge | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const fetchNewChallengeQuestions = async () => {
		setLoading(true)
		setError(null)

		try {
			const response = await fetch(
				`${API_URL}?amount=10&difficulty=${getDifficulty(
					grade as string
				)}&category=${getCategoryIdFromSubject(
					subject as string
				)}&type=multiple&encode=url3986`
			)
			const data = await response.json()

			if (!data.results) throw new Error('No questions found')

			const formattedQuestions: QuizQuestion[] = data.results.map(
				(q: QuizQuestion) => ({
					question: decodeURIComponent(q.question),
					correct_answer: decodeURIComponent(q.correct_answer),
					incorrect_answers:
						q.incorrect_answers.map(decodeURIComponent),
					category: q.category,
					difficulty: q.difficulty,
				})
			)

			if (!grade || !subject) throw new Error('No grade or subject')

			const newChallenge: Challenge = {
				id: generateId(),
				subject,
				grade,
				createdAt: new Date().toISOString(),
				totalQuizzes: 10,
				quizzes: formattedQuestions,
				completed: false,
			}

			const storageKey = `@challenge-${subject}-${grade}`
			await AsyncStorage.setItem(storageKey, JSON.stringify(newChallenge))
			setChallenge(newChallenge)
		} catch (err) {
			console.error('Error fetching challenge questions:', err)
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	const loadStoredChallenge = async () => {
		setLoading(true)
		try {
			const storageKey = `@challenge-${subject}-${grade}`
			const storedChallenge = await AsyncStorage.getItem(storageKey)
			if (!storedChallenge) throw new Error('No challenge data found')

			const parsedChallenge: Challenge = JSON.parse(storedChallenge)
			if (
				!parsedChallenge ||
				!parsedChallenge.quizzes ||
				parsedChallenge.quizzes.length === 0
			)
				return false

			setChallenge(parsedChallenge)
			return true
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Failed to load stored data'
			)
			return false
		} finally {
			setLoading(false)
		}
	}

	const addNewQuizzesToChallenge = async (newQuizzes: QuizQuestion[]) => {
		try {
			if (!challenge) return
			const updatedChallenge = {
				...challenge,
				quizzes: [...challenge.quizzes, ...newQuizzes],
				totalQuizzes: challenge.totalQuizzes + newQuizzes.length,
			}

			const storageKey = `@challenge-${subject}-${grade}`
			await AsyncStorage.setItem(
				storageKey,
				JSON.stringify(updatedChallenge)
			)
			setChallenge(updatedChallenge)
		} catch (err) {
			console.error('Error adding new quizzes:', err)
		}
	}

	const completeChallenge = async () => {
		if (!challenge) return
		const updatedChallenge = { ...challenge, completed: true }
		const storageKey = `@challenge-${challenge.subject}-${challenge.grade}`
		await AsyncStorage.setItem(storageKey, JSON.stringify(updatedChallenge))

		setChallenge(updatedChallenge)
	}

	return {
		challenge,
		loading,
		error,
		fetchNewChallengeQuestions,
		loadStoredChallenge,
		addNewQuizzesToChallenge,
		completeChallenge,
	}
}
