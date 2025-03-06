import { useChallenge } from '@/hooks/useChallenge'
import { shuffleArray } from '@/utils/helpers'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function QuizScreen() {
	const { grade, subject } = useLocalSearchParams()
	const { challenge, loadStoredChallenge, loading } = useChallenge(
		grade as string,
		subject as string
	)
	const router = useRouter()

	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
	const [score, setScore] = useState(0)
	const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([])

	useEffect(() => {
		loadStoredChallenge()
	}, [])

	useEffect(() => {
		if (!challenge) return

		const currentQuiz = challenge.quizzes[currentQuestion]
		const answers = shuffleArray([
			currentQuiz.correct_answer,
			...currentQuiz.incorrect_answers,
		])
		setShuffledAnswers(answers)
	}, [challenge, currentQuestion])

	const handleAnswerSelect = (option: string) => {
		setSelectedAnswer(option)
		if (option === challenge?.quizzes[currentQuestion].correct_answer) {
			setScore(prevScore => prevScore + 1)
		}
	}

	if (loading || !challenge) return <Text>Loading...</Text>

	const handleNextQuestion = () => {
		if (currentQuestion < challenge.quizzes.length - 1) {
			setCurrentQuestion(prev => prev + 1)
			setSelectedAnswer(null)
		} else {
			router.push(
				`/results?grade=${grade}&subject=${subject}&score=${score}&totalQuestions=${challenge.quizzes.length}`
			)
		}
	}

	return (
		<View className='flex-1 bg-gradient-to-b from-blue-50 to-gray-100 p-8 justify-between'>
			<View>
				<Text className='text-center text-xl font-bold text-gray-800 mb-4'>
					Question {currentQuestion + 1} of {challenge.quizzes.length}
				</Text>
				<View className='absolute top-12 left-0 right-0'>
					<View className='bg-white rounded-xl shadow-md p-6'>
						<Text className='text-2xl font-bold text-gray-900 text-center'>
							{challenge.quizzes[currentQuestion].question}
						</Text>
					</View>
				</View>
			</View>
			<View className='space-y-4 mt-16'>
				{shuffledAnswers.map(option => (
					<TouchableOpacity
						key={option}
						onPress={() => handleAnswerSelect(option)}
						disabled={selectedAnswer !== null}
						className={`p-4 rounded-lg shadow-md mb-6 ${
							selectedAnswer
								? option ===
								  challenge.quizzes[currentQuestion]
										.correct_answer
									? 'bg-green-500'
									: selectedAnswer === option
									? 'bg-red-500'
									: 'bg-white'
								: 'bg-white'
						}`}
					>
						<Text
							className={`text-center text-lg font-semibold ${
								selectedAnswer
									? option ===
									  challenge.quizzes[currentQuestion]
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
			</View>

			<TouchableOpacity
				onPress={handleNextQuestion}
				disabled={!selectedAnswer}
				className={`mt-10 p-4 rounded-xl shadow-lg ${
					selectedAnswer ? 'bg-green-500' : 'bg-gray-300'
				}`}
			>
				<Text className='text-center text-lg font-bold text-white'>
					{currentQuestion === challenge.quizzes.length - 1
						? 'Finish'
						: 'Next'}
				</Text>
			</TouchableOpacity>
		</View>
	)
}
