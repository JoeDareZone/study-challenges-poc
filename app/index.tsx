import { IconSymbol } from '@/components/ui/IconSymbol.ios'
import { useAllChallenges } from '@/hooks/useAllChallenges'
import { useStreak } from '@/hooks/useStreak'
import { useXP } from '@/hooks/useXP'
import { getToday } from '@/utils/helpers'
import { useRouter } from 'expo-router'
import React from 'react'
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

export default function HomeScreen() {
	const router = useRouter()
	const {
		challenges,
		loading: challengesLoading,
		resetAllChallenges,
	} = useAllChallenges()
	const { xp, loading: xpLoading } = useXP()
	const { streak, loading: streakLoading } = useStreak()

	const todaysChallenges = challenges.filter(challenge =>
		challenge.createdAt.startsWith(getToday())
	)

	const handleResetAllChallenges = () => {
		Alert.alert('Are you sure?', 'This action cannot be undone', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Reset',
				style: 'destructive',
				onPress: () => resetAllChallenges(),
			},
		])
	}

	return (
		<View className='flex-1 bg-gray-100 p-5'>
			<View className='absolute top-5 right-5 flex-row gap-x-4'>
				<View>
					{streakLoading ? (
						<Text>Loading streak...</Text>
					) : (
						<View className='relative rounded-full'>
							<IconSymbol
								name='flame.fill'
								size={36}
								color='red'
							/>
							<View className='absolute left-1/2 -translate-x-1/2 top-[20px] -translate-y-1/2 flex-row items-center justify-center'>
								{streakLoading ? (
									<Text className='text-sm font-bold text-white'>
										...
									</Text>
								) : (
									<Text className='text-md font-bold text-white bg-[#FF0000] rounded-full py-[3px] px-[2px]'>
										{streak}
									</Text>
								)}
							</View>
						</View>
					)}
				</View>
				<View className=' bg-blue-500 rounded px-2 py-1 min-w-16 justify-center'>
					{xpLoading ? (
						<ActivityIndicator color='white' />
					) : (
						<Text className='text-sm font-bold text-white text-center'>
							XP: {xp}
						</Text>
					)}
				</View>
			</View>

			<Text className='text-2xl font-bold mb-4'>Study Challenges</Text>

			{challengesLoading ? (
				<ActivityIndicator
					size='large'
					className='flex-1 justify-center items-center'
				/>
			) : (
				<FlatList
					data={todaysChallenges}
					keyExtractor={item => item.id}
					contentContainerStyle={{
						paddingTop: 20,
						paddingHorizontal: 16,
					}}
					renderItem={({ item }) => (
						<View className='bg-white rounded-xl shadow-md p-6 mb-6'>
							<View className='justify-between mb-2'>
								<View className='flex-row gap-x-2 justify-between'>
									<View>
										<Text className='text-lg font-bold text-gray-800 mb-1'>
											Daily Challenge:{' '}
										</Text>
										<Text className='text-lg font-bold text-orange-500'>
											Complete the Quiz
										</Text>
									</View>
									<Text
										className={`text-sm font-semibold self-start ${
											item.completed
												? 'text-white bg-gray-600'
												: 'text-gray-600 bg-gray-200'
										} rounded-md px-2 py-1`}
									>
										50 XP
									</Text>
								</View>
							</View>
							<View className='flex-row justify-between mb-4'>
								<Text className='text-lg font-medium text-gray-700'>
									📚 <Text>{item.subject}</Text> | 🎓 Grade:{' '}
									<Text className='font-bold'>
										{item.grade[item.grade.length - 1]}
									</Text>
								</Text>
							</View>
							{item.completed ? (
								<View className='bg-green-100 border border-green-400 rounded-md p-3'>
									<Text className='text-green-600 text-center font-semibold'>
										✅ Challenge Completed Today!
									</Text>
								</View>
							) : (
								<View className='flex-row gap-x-4'>
									<TouchableOpacity
										className='flex-1 bg-blue-500 p-3 rounded-lg'
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
										className='flex-1 bg-green-500 p-3 rounded-lg justify-center'
										onPress={() =>
											router.push(
												`/quiz?grade=${item.grade}&subject=${item.subject}`
											)
										}
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
						<Text className='text-gray-500 text-center mt-4 mb-5'>
							No active challenges. Start one below!
						</Text>
					}
					ListFooterComponent={
						<>
							<TouchableOpacity
								className='bg-blue-500 p-4 rounded-lg mt-5'
								onPress={() => router.push('/grades')}
							>
								<Text className='text-white text-lg font-bold text-center'>
									Start New Challenge
								</Text>
							</TouchableOpacity>
							{challenges.length > 0 && (
								<TouchableOpacity
									className='bg-red-500 p-4 rounded-lg mt-5'
									onPress={() => handleResetAllChallenges()}
								>
									<Text className='text-white text-lg font-bold text-center'>
										Reset All Challenges
									</Text>
								</TouchableOpacity>
							)}
						</>
					}
				/>
			)}
		</View>
	)
}
