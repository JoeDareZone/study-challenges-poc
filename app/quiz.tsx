import { useChallenge } from '@/hooks/useChallenge'
import { shuffleArray } from '@/utils/helpers'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function QuizScreen() {
	const { grade, subject } = useLocalSearchParams()
	const router = useRouter()

	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
	const [score, setScore] = useState(0)
	const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([])

	const { challenge, loadStoredChallenge, loading } = useChallenge(
		grade as string,
		subject as string
	)

	useEffect(() => {
		loadStoredChallenge()
	}, [])

	useEffect(() => {
		if (!challenge) return

		const answers = shuffleArray([
			challenge.quizzes[currentQuestion].correct_answer,
			...challenge.quizzes[currentQuestion].incorrect_answers,
		])
		setShuffledAnswers(answers)
	}, [currentQuestion, challenge])

	const handleAnswerSelect = (option: string) => {
		setSelectedAnswer(option)

		if (option === challenge?.quizzes[currentQuestion].correct_answer) {
			setScore(score + 1)
		}
	}

	if (loading || !challenge) return <Text>Loading...</Text>

	const handleNextQuestion = () => {
		if (currentQuestion < challenge?.quizzes.length - 1) {
			setCurrentQuestion(currentQuestion + 1)
			setSelectedAnswer(null)
		} else {
			router.push(
				`/results?grade=${grade}&subject=${subject}&score=${score}&totalQuestions=${challenge?.quizzes.length}`
			)
		}
	}

	return (
		<View className='flex-1 bg-gray-100 p-12 justify-center'>
			<Text className='text-lg font-semibold text-gray-600 mb-2'>
				Question {currentQuestion + 1} of{' '}
				{challenge?.quizzes.length ?? 0}
			</Text>

			<Text className='text-2xl font-bold mb-6'>
				{challenge?.quizzes[currentQuestion].question}
			</Text>

			{shuffledAnswers.map(option => (
				<TouchableOpacity
					key={option}
					className={`p-4 rounded-lg mb-3 shadow ${
						selectedAnswer
							? option ===
							  challenge?.quizzes[currentQuestion].correct_answer
								? 'bg-green-500'
								: selectedAnswer === option
								? 'bg-red-500'
								: 'bg-white'
							: 'bg-white'
					}`}
					onPress={() => handleAnswerSelect(option)}
					disabled={selectedAnswer !== null}
				>
					<Text
						className={`text-lg font-semibold ${
							selectedAnswer
								? option ===
								  challenge?.quizzes[currentQuestion]
										.correct_answer
									? 'text-white'
									: selectedAnswer === option
									? 'text-white'
									: 'text-gray-800'
								: 'text-gray-800'
						}`}
					>
						{option}
					</Text>
				</TouchableOpacity>
			))}

			{/* {selectedAnswer !== null && (
				<Text
					className={`text-lg font-bold text-center mt-2 h-6 ${
						isAnswerCorrect ? 'text-green-600' : 'text-red-600'
					}`}
				>
					{isAnswerCorrect ? 'Correct!' : 'Wrong!'}
				</Text>
			)} */}

			<TouchableOpacity
				className={`p-4 rounded-lg mt-4 ${
					selectedAnswer ? 'bg-green-500' : 'bg-gray-300'
				}`}
				onPress={handleNextQuestion}
				disabled={!selectedAnswer}
			>
				<Text className='text-lg font-bold text-white text-center'>
					{currentQuestion === challenge?.quizzes.length - 1
						? 'Finish'
						: 'Next'}
				</Text>
			</TouchableOpacity>
		</View>
	)
}
