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

			const formattedQuestions: QuizQuestion[] = data.results.map(
				(q: QuizQuestion) => ({
					question: decodeURIComponent(q.question),
					correct_answer: decodeURIComponent(q.correct_answer),
					incorrect_answers: q.incorrect_answers.map(decodeURIComponent),
					category: q.category,
					difficulty: q.difficulty,
				})
			)

			console.log(formattedQuestions)

			const storeQuizQuestions = async (
				formattedQuestions: QuizQuestion[],
				difficulty: string,
				categoryId: number
			) => {
				try {
					const storageKey = `@quizQuestions-${difficulty}-${categoryId}`

					await AsyncStorage.setItem(
						storageKey,
						JSON.stringify(formattedQuestions)
					).then(() => {
						console.log('Quiz questions stored')
					})

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
