import { Subjects } from '@/constants/constants'
import { useAllChallenges } from '@/hooks/useAllChallenges'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function SubjectScreen() {
	const router = useRouter()
	const { grade } = useGlobalSearchParams()
	const { challenges } = useAllChallenges()

	const filteredSubjects = Subjects.filter(
		subject =>
			!challenges.find(
				challenge =>
					challenge.subject === subject && challenge.grade === grade
			)
	)

	return (
		<View className='flex-1 bg-gradient-to-b from-blue-50 to-gray-100 p-5'>
			<Text className='text-3xl font-bold text-center mb-8'>
				Select Subject for {grade}
			</Text>

			<View className='flex-1 justify-center'>
				{filteredSubjects.map(subject => (
					<TouchableOpacity
						key={subject}
						className='bg-white p-6 rounded-xl mb-4 shadow-md'
						onPress={() =>
							router.push(`/flashcards?grade=${grade}&subject=${subject}`)
						}
					>
						<Text className='text-xl font-semibold text-center text-gray-800'>
							{subject}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			<Text className='text-center text-gray-500 mt-8'>
				Choose a subject to start your daily challenge!
			</Text>
		</View>
	)
}
