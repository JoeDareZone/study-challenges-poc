import { Categories } from '@/constants/Categories'
import { getDifficulty } from '@/helpers/getDifficulty'
import { shuffleArray } from '@/helpers/shuffleArray'
import { useQuiz } from '@/hooks/useQuiz'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function QuizScreen() {
	const { grade, subject } = useLocalSearchParams()

	const router = useRouter()
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
	const [score, setScore] = useState(0)
	const { quizQuestions, loadStoredQuiz } = useQuiz(
		getDifficulty(grade as string),
		Categories[subject as keyof typeof Categories]
	)
	const [isLoading, setIsLoading] = useState(true)

	const handleAnswerSelect = (option: string) => {
		setSelectedAnswer(option)
	}

	useEffect(() => {
		console.log(grade, subject)
		loadStoredQuiz().then(() => {
			setIsLoading(false)
			// quizQuestions.length > 0 ? null : fetchQuizQuestions()
		})
	}, [])

	const handleNextQuestion = () => {
		if (selectedAnswer === quizQuestions[currentQuestion].correct_answer) {
			setScore(score + 1)
		}

		if (currentQuestion < quizQuestions.length - 1) {
			setCurrentQuestion(currentQuestion + 1)
			setSelectedAnswer(null)
		} else {
			// router.push(
			// 	`/result?score=${score + 1}&total=${quizQuestions.length}`
			// )
		}
	}

	if (isLoading) return <Text>Loading</Text>

	const answers = shuffleArray([
		quizQuestions[currentQuestion].correct_answer,
		...quizQuestions[currentQuestion].incorrect_answers,
	])

	return (
		<View className='flex-1 bg-gray-100 p-12 justify-center'>
			<Text className='text-lg font-semibold text-gray-600 mb-2'>
				Question {currentQuestion + 1} of {quizQuestions.length}
			</Text>

			<Text className='text-2xl font-bold mb-6'>
				{quizQuestions[currentQuestion].question}
			</Text>

			{answers.map(option => (
				<TouchableOpacity
					key={option}
					className={`p-4 rounded-lg mb-3 shadow ${
						selectedAnswer === option ? 'bg-blue-500' : 'bg-white'
					}`}
					onPress={() => handleAnswerSelect(option)}
				>
					<Text
						className={`text-lg font-semibold ${
							selectedAnswer === option
								? 'text-white'
								: 'text-gray-800'
						}`}
					>
						{option}
					</Text>
				</TouchableOpacity>
			))}

			<TouchableOpacity
				className={`p-4 rounded-lg mt-4 ${
					selectedAnswer ? 'bg-green-500' : 'bg-gray-300'
				}`}
				onPress={handleNextQuestion}
				disabled={!selectedAnswer}
			>
				<Text className='text-lg font-bold text-white text-center'>
					{currentQuestion === quizQuestions.length - 1
						? 'Finish'
						: 'Next'}
				</Text>
			</TouchableOpacity>
		</View>
	)
}
