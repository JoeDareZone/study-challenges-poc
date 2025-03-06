import { Grades, Subjects } from '@/constants/constants'
import { useAllChallenges } from '@/hooks/useAllChallenges'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function GradesScreen() {
	const router = useRouter()
	const { challenges } = useAllChallenges()

	const filteredGrades = Grades.filter(grade => {
		const gradeChallenges = challenges.filter(
			challenge => challenge.grade === grade
		)

		return !Subjects.every(subject =>
			gradeChallenges.some(challenge => challenge.subject === subject)
		)
	})

	return (
		<View className='flex-1 bg-gradient-to-b from-blue-50 to-gray-100 p-5'>
			<Text className='text-3xl font-bold text-center mb-8'>
				Select Your Grade
			</Text>

			<View className='flex-1 justify-center px-4'>
				{filteredGrades.map(grade => (
					<TouchableOpacity
						key={grade}
						className='bg-white p-6 rounded-xl mb-6 shadow-md'
						onPress={() => router.push(`/subjects?grade=${grade}`)}
					>
						<Text className='text-xl font-semibold text-center text-gray-800'>
							{grade}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			<Text className='text-center text-gray-500 mt-8'>
				Choose a grade to begin your learning journey!
			</Text>
		</View>
	)
}
