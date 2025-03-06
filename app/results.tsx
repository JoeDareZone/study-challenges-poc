import { useChallenge } from '@/hooks/useChallenge'
import { useXP } from '@/hooks/useXP'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function ResultScreen() {
	const router = useRouter()
	const { score, totalQuestions, grade, subject } = useLocalSearchParams()
	const { completeChallenge, loadStoredChallenge } = useChallenge(
		grade as string,
		subject as string
	)
	const { addXP } = useXP()

	const xpEarned = 50
	const percentage = ((Number(score) / Number(totalQuestions)) * 100).toFixed(
		1
	)
	const isPassed = Number(percentage) >= 80

	useEffect(() => {
		loadStoredChallenge()
	}, [])

	useEffect(() => {
		if (isPassed) {
			completeChallenge()
			addXP(xpEarned)
		}
	}, [])

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
					{score} / {totalQuestions} ({percentage}%)
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
		</View>
	)
}
