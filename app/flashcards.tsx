// FlashcardsScreen.js
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function FlashcardsScreen() {
	const router = useRouter()
	const { grade, subject } = useGlobalSearchParams() 

	return (
		<View className='flex-1 bg-gray-100 p-5'>
			<Text className='text-2xl font-bold mb-4'>
				Flashcards for {subject} ({grade})
			</Text>

			<Text className='text-lg mb-4'>Flashcards content goes here</Text>

			<TouchableOpacity
				className='bg-blue-500 p-4 rounded-lg mt-5'
				onPress={() =>
					router.push(`/quiz?grade=${grade}&subject=${subject}`)
				} 
			>
				<Text className='text-white text-lg font-bold text-center'>
					Start Quiz
				</Text>
			</TouchableOpacity>
		</View>
	)
}
