import { useLocalSearchParams, useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function ResultScreen() {
	const router = useRouter()
	const { score, total } = useLocalSearchParams()

	return (
		<View className='flex-1 bg-gray-100 p-5 items-center justify-center'>
			<Text className='text-3xl font-bold text-gray-800 mb-4'>Quiz Completed!</Text>
			<Text className='text-xl font-semibold text-gray-600 mb-6'>
				Your Score: {score} / {total}
			</Text>

			<TouchableOpacity   
				className='w-full p-4 rounded-lg bg-blue-500'
				onPress={() => router.push('/')}
			>
				<Text className='text-lg font-bold text-white text-center'>Home</Text>
			</TouchableOpacity>
		</View>
	)
}
