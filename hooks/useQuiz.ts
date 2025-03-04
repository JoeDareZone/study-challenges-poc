import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

interface QuizQuestion {
	question: string
	correct_answer: string
	incorrect_answers: string[]
	category: string
	difficulty: string
}

const API_URL = 'https://opentdb.com/api.php'

export const useQuiz = (categoryId: number, difficulty: string) => {
	const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchQuizQuestions()
	}, [categoryId, difficulty])

	const fetchQuizQuestions = async () => {
		setLoading(true)
		setError(null)

		try {
			const response = await fetch(
				`${API_URL}?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
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

			// Store in AsyncStorage
			await AsyncStorage.setItem(
				'@quizQuestions',
				JSON.stringify(formattedQuestions)
			).then(() => {
				console.log('quiz questions stored')
			})

			setQuizQuestions(formattedQuestions)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	// Retrieve stored quiz questions
	const loadStoredQuiz = async () => {
		try {
			const storedQuiz = await AsyncStorage.getItem('@quizQuestions')

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
