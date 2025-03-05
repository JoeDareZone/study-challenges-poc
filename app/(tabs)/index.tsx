import { useAllChallenges } from '@/hooks/useAllChallenges'
import { useXP } from '@/hooks/useXP'
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
	const { challenges, loading, resetAllChallenges } = useAllChallenges()
	const { xp, loading: xpLoading } = useXP()

	const today = new Date().toISOString().split('T')[0]

	const todaysChallenges = challenges.filter(challenge =>
		challenge.createdAt.startsWith(today)
	)

	return (
		<View className='flex-1 bg-gray-100 p-5'>
			<View className='absolute top-5 right-5 bg-blue-500 rounded  px-2 py-1 min-w-16 '>
				{xpLoading ? (
					<ActivityIndicator color='white' />
				) : (
					<Text className='text-sm font-bold text-white'>
						XP: {xp}
					</Text>
				)}
			</View>

			<Text className='text-2xl font-bold mb-4'>Study Challenges</Text>

			{loading ? (
				<ActivityIndicator
					size='large'
					className='flex-1 justify-center items-center'
				/>
			) : (
				<FlatList
					data={todaysChallenges}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<View className='bg-white p-4 rounded-lg mb-4 shadow'>
							<Text className='text-lg font-semibold mb-2'>
								Daily Challenge
							</Text>
							<Text className='text-gray-600'>
								{item.subject} - {item.grade}
							</Text>

							{item.completed ? (
								<Text className='text-green-500 mt-2'>
									✅ Challenge Completed Today!
								</Text>
							) : (
								<View>
									<TouchableOpacity
										className='p-3 rounded-lg mt-2 bg-blue-500'
										onPress={() =>
											router.push(
												`/flashcards?grade=${item.grade}&subject=${item.subject}`
											)
										}
									>
										<Text className='text-white text-center font-bold'>
											Start Flashcards
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										className='p-3 rounded-lg mt-2 bg-green-500'
										onPress={() => {
											router.push(
												`/quiz?grade=${item.grade}&subject=${item.subject}`
											)
										}}
									>
										<Text className='text-white text-center font-bold'>
											Attempt Quiz
										</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>
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

			<TouchableOpacity
				className='bg-red-500 p-4 rounded-lg mt-5 mb-20'
				onPress={() => resetAllChallenges()}
			>
				<Text className='text-white text-lg font-bold text-center'>
					Reset All Challenges
				</Text>
			</TouchableOpacity>
		</View>
	)
}
