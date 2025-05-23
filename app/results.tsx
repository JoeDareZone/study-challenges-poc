import { useChallenge } from '@/hooks/useChallenge'
import { useStreak } from '@/hooks/useStreak'
import { useXP } from '@/hooks/useXP'
import { getPercentage } from '@/utils/helpers'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function ResultScreen() {
	const router = useRouter()
	const { score, totalQuestions, grade, subject } = useLocalSearchParams()
	const { completeChallenge, loadStoredChallenge, challenge } = useChallenge(
		grade as string,
		subject as string
	)
	const { addXP } = useXP()
	const { updateStreak } = useStreak()
	const resultsHandled = useRef(false)
	const xpAdded = useRef(false)
	const [scorePercentage, setScorePercentage] = useState('')
	const [isPassed, setIsPassed] = useState(false)

	const xpEarned = 50

	const handleChallengeCompletion = async () => {
		await completeChallenge()
		await updateStreak()
		if (!xpAdded.current) {
			await addXP(xpEarned)
			xpAdded.current = true
		}
	}

	const forceChallengeCompletion = async () => {
		setScorePercentage('100')
		setIsPassed(true)
		await handleChallengeCompletion()
	}

	useEffect(() => {
		setScorePercentage(getPercentage(Number(score), Number(totalQuestions)))
		setIsPassed(Number(scorePercentage) >= 80)
	}, [score, totalQuestions])

	useEffect(() => {
		const handleResults = async () => {
			if (resultsHandled.current || !isPassed) return

			try {
				await loadStoredChallenge()
				if (!challenge) return

				await handleChallengeCompletion()
				resultsHandled.current = true
			} catch (error) {
				console.error('Error handling results:', error)
			}
		}

		handleResults()
	}, [loadStoredChallenge, handleChallengeCompletion, isPassed, xpEarned])

	return (
		<View className='flex-1 bg-gray-100 px-6 py-10 items-center justify-center gap-y-4'>
			<Text
				className={`text-4xl font-extrabold mb-4 ${
					isPassed ? 'text-green-600' : 'text-red-600'
				}`}
			>
				{isPassed ? '🎉 Quiz Passed! 🎉' : '❌ Quiz Failed ❌'}
			</Text>

			<Text className='text-lg font-medium text-gray-700 mb-3'>
				📚 <Text className='font-bold'>{subject}</Text> | 🎓 Grade:{' '}
				<Text className='font-bold'>{grade}</Text>
			</Text>

			<View className='bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md'>
				<Text className='text-2xl font-semibold text-gray-800 text-center mb-2'>
					Your Score
				</Text>
				<Text className='text-4xl font-bold text-gray-900 text-center'>
					{score} / {totalQuestions} ({scorePercentage}%)
				</Text>
				<Text className='text-base text-gray-600 text-center mt-2'>
					You needed <Text className='font-bold'>80%</Text> or more to
					pass.
				</Text>
			</View>

			{isPassed && (
				<Text className='text-xl font-bold text-blue-500 mt-4'>
					You gained {xpEarned} XP!
				</Text>
			)}

			<Text className={`text-2xl font-bold mb-8`}>
				{isPassed
					? 'Amazing job! 🎯'
					: 'Keep practicing and try again! 🔄'}
			</Text>

			<TouchableOpacity
				className='w-full max-w-md p-4 rounded-lg bg-blue-500 shadow-lg'
				onPress={() => router.push('/')}
			>
				<Text className='text-lg font-bold text-white text-center'>
					Home
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className='w-full max-w-md p-4 rounded-lg bg-orange-500 shadow-lg'
				onPress={forceChallengeCompletion}
			>
				<Text className='text-lg font-bold text-white text-center'>
					Complete-a-quiz
				</Text>
			</TouchableOpacity>
		</View>
	)
}
