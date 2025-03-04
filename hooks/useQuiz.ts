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
				`${API_URL}?amount=10&difficulty=${difficulty}&category=${categoryId}&type=multiple`
			)
			const data = await response.json()

			if (!data.results) throw new Error('No questions found')

			// Process questions for quiz
			const formattedQuestions: QuizQuestion[] = data.results.map(
				(q: any) => ({
					question: q.question,
					correct_answer: q.correct_answer,
					incorrect_answers: q.incorrect_answers,
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
					// Dynamically generate the key for AsyncStorage based on grade and subject
					const storageKey = `@quizQuestions-${difficulty}-${categoryId}`

					// Store the quiz questions in AsyncStorage
					await AsyncStorage.setItem(
						storageKey,
						JSON.stringify(formattedQuestions)
					).then(() => {
						console.log('Quiz questions stored')
					})

					// Optionally, you can update your state with the stored questions
					setQuizQuestions(formattedQuestions)
				} catch (err) {
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

	// Retrieve stored quiz questions
	const loadStoredQuiz = async () => {
		try {
			const storedQuiz = await AsyncStorage.getItem(
				`@quizQuestions-${difficulty}-${categoryId}`
			)

			if (storedQuiz) setQuizQuestions(JSON.parse(storedQuiz))
		} catch (err) {
			setError('Failed to load stored data')
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
