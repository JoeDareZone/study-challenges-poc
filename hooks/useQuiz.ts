import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'

interface QuizQuestion {
	question: string
	correct_answer: string
	incorrect_answers: string[]
	category: string
	difficulty: string
}

const API_URL = 'https://opentdb.com/api.php'

export const useQuiz = (difficulty: string, categoryId: number) => {
	const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const fetchQuizQuestions = async () => {
		setLoading(true)
		setError(null)

		try {
			const response = await fetch(
				`${API_URL}?amount=10&difficulty=${difficulty}&category=${categoryId}&type=multiple&encode=url3986`
			)
			const data = await response.json()

			if (!data.results) throw new Error('No questions found')

			console.log('quiz questions fetched', data.results)

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

			const storeQuizQuestions = async (
				formattedQuestions: QuizQuestion[],
				difficulty: string,
				categoryId: number
			) => {
				try {
					console.log('storing quiz questions')
					const storageKey = `@quizQuestions-${difficulty}-${categoryId}`

					await AsyncStorage.setItem(
						storageKey,
						JSON.stringify(formattedQuestions)
					)

					console.log('quiz questions stored')

					setQuizQuestions(formattedQuestions)
				} catch (err) {
					console.log('error storing quiz questions', err)
					setError(
						err instanceof Error ? err.message : 'An error occurred'
					)
				} finally {
					setLoading(false)
				}
			}

			storeQuizQuestions(formattedQuestions, difficulty, categoryId)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	const loadStoredQuiz = async () => {
		setLoading(true)
		try {
			const storedQuiz = await AsyncStorage.getItem(
				`@quizQuestions-${difficulty}-${categoryId}`
			)
			if (!storedQuiz) throw new Error('No quiz data found')

			const parsedQuiz = JSON.parse(storedQuiz)

			if (!Array.isArray(parsedQuiz) || parsedQuiz.length === 0)
				return false

			setQuizQuestions(parsedQuiz)
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

	return {
		quizQuestions,
		loading,
		error,
		fetchQuizQuestions,
		loadStoredQuiz,
	}
}
