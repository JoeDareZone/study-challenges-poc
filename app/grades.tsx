import { Grades } from '@/constants/constants'
import { useAllChallenges } from '@/hooks/useAllChallenges'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function GradesScreen() {
	const router = useRouter()
	const { challenges } = useAllChallenges()

	const filteredGrades = Grades.filter(
		grade => !challenges.some(challenge => challenge.grade === grade)
	)

	return (
		<View className='flex-1 bg-gray-100 p-5'>
			<Text className='text-2xl font-bold mb-4'>Select Your Grade</Text>

			{filteredGrades.map(grade => (
				<TouchableOpacity
					key={grade}
					className='bg-white p-4 rounded-lg mb-3 shadow'
					onPress={() => router.push(`/subjects?grade=${grade}`)}
				>
					<Text className='text-lg font-semibold'>{grade}</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}
