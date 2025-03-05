import { useAllChallenges } from '@/hooks/useAllChallenges'
import { useRouter } from 'expo-router'
import {
	ActivityIndicator,
	FlatList,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

export default function HomeScreen() {
	const router = useRouter()
	const { challenges, loading } = useAllChallenges()

	return (
		<View className='flex-1 bg-gray-100 p-5'>
			<Text className='text-2xl font-bold mb-4'>Study Challenges</Text>

			{loading ? (
				<ActivityIndicator
					size='large'
					className=' flex-1 justify-center items-center'
				/>
			) : (
				<FlatList
					data={challenges}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<TouchableOpacity
							className='bg-white p-4 rounded-lg mb-3 shadow'
							onPress={() =>
								router.push(`/challenges/${item.id}`)
							}
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
							onPress={() => router.push('/grades')}
						>
							<Text className='text-white text-lg font-bold text-center'>
								Start New Challenge
							</Text>
						</TouchableOpacity>
					}
				/>
			)}
		</View>
	)
}
