// SubjectScreen.js
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function SubjectScreen() {
	const router = useRouter()
	const { grade } = useGlobalSearchParams()

	const subjects = ['Math', 'Science', 'History', 'Computers']

	return (
		<View className='flex-1 bg-gray-100 p-5'>
			<Text className='text-2xl font-bold mb-4'>
				Select Subject for {grade}
			</Text>

			{subjects.map(subject => (
				<TouchableOpacity
					key={subject}
					className='bg-white p-4 rounded-lg mb-3 shadow'
					onPress={() =>
						router.push(
							`/flashcards?grade=${grade}&subject=${subject}`
						)
					}
				>
					<Text className='text-lg font-semibold'>{subject}</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}
