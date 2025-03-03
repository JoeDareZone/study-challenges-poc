import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const quizQuestions = [
	{
		question: 'What is the capital of France?',
		options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
		answer: 'Paris',
	},
	{
		question: 'Which planet is known as the Red Planet?',
		options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
		answer: 'Mars',
	},
	{
		question: 'What is the square root of 64?',
		options: ['6', '7', '8', '9'],
		answer: '8',
	},
]

export default function QuizScreen() {
	const router = useRouter()
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
	const [score, setScore] = useState(0)

	const handleAnswerSelect = (option: string) => {
		setSelectedAnswer(option)
	}

	const handleNextQuestion = () => {
		if (selectedAnswer === quizQuestions[currentQuestion].answer) {
			setScore(score + 1)
		}

		if (currentQuestion < quizQuestions.length - 1) {
			setCurrentQuestion(currentQuestion + 1)
			setSelectedAnswer(null)
		} else {
			// router.push(`/result?score=${score + 1}&total=${quizQuestions.length}`)
		}
	}

	return (
		<View className='flex-1 bg-gray-100 p-12 justify-center'>
			{/* Progress Indicator */}
			<Text className='text-lg font-semibold text-gray-600 mb-2'>
				Question {currentQuestion + 1} of {quizQuestions.length}
			</Text>

			{/* Question */}
			<Text className='text-2xl font-bold mb-6'>{quizQuestions[currentQuestion].question}</Text>

			{/* Answer Options */}
			{quizQuestions[currentQuestion].options.map(option => (
				<TouchableOpacity
					key={option}
					className={`p-4 rounded-lg mb-3 shadow ${
						selectedAnswer === option ? 'bg-blue-500' : 'bg-white'
					}`}
					onPress={() => handleAnswerSelect(option)}
				>
					<Text className={`text-lg font-semibold ${selectedAnswer === option ? 'text-white' : 'text-gray-800'}`}>
						{option}
					</Text>
				</TouchableOpacity>
			))}

			{/* Next Button */}
			<TouchableOpacity
				className={`p-4 rounded-lg mt-4 ${
					selectedAnswer ? 'bg-green-500' : 'bg-gray-300'
				}`}
				onPress={handleNextQuestion}
				disabled={!selectedAnswer}
			>
				<Text className='text-lg font-bold text-white text-center'>
					{currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
				</Text>
			</TouchableOpacity>
		</View>
	)
}
