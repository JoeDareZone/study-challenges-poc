import { useRouter } from 'expo-router'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'

export default function GradesScreen() {
	const router = useRouter()

	const grades = ['Grade 7', 'Grade 8', 'Grade 9']

	return (
		<SafeAreaView className='flex-1 bg-gray-100 p-5'>
			<Text className='text-2xl font-bold mb-4'>Select Your Grade</Text>

			{grades.map(grade => (
				<TouchableOpacity
					key={grade}
					className='bg-white p-4 rounded-lg mb-3 shadow'
					onPress={() => router.push(`/subjects?grade=${grade}`)}
				>
					<Text className='text-lg font-semibold'>{grade}</Text>
				</TouchableOpacity>
			))}
		</SafeAreaView>
	)
}
