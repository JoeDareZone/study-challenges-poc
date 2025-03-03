import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
	const router = useRouter()

	// Mock active challenges
	const [challenges, setChallenges] = useState([
		{ id: '1', subject: 'Math', grade: 'Grade 7', progress: '50%' },
		{ id: '2', subject: 'Science', grade: 'Grade 8', progress: '30%' },
	])

	return (
		<SafeAreaView className='flex-1 bg-gray-100 p-5'>
			<Text className='text-2xl font-bold mb-4'>Study Challenges</Text>

			<FlatList
				data={challenges}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						className='bg-white p-4 rounded-lg mb-3 shadow'
						onPress={() => router.push(`/challenges/${item.id}`)}
					>
						<Text className='text-lg font-semibold'>
							{item.subject} - {item.grade}
						</Text>
						<Text className='text-gray-500'>
							Progress: {item.progress}
						</Text>
					</TouchableOpacity>
				)}
				ListEmptyComponent={
					<Text className='text-gray-500 text-center mt-4'>
						No active challenges. Start one below!
					</Text>
				}
				ListFooterComponent={
					<TouchableOpacity
						className='bg-blue-500 p-4 rounded-lg mt-5 mb-20'
						onPress={() => router.push('/challenges')}
					>
						<Text className='text-white text-lg font-bold text-center'>
							Start New Challenge
						</Text>
					</TouchableOpacity>
				}
			/>
		</SafeAreaView>
	)
}
