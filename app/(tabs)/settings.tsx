import { useAllChallenges } from '@/hooks/useAllChallenges'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function SettingsScreen() {
	const { resetAllChallenges } = useAllChallenges()
	return (
		<View className='flex-1 bg-gray-100 p-5'>
			<Text className='text-2xl font-bold mb-4'>Settings</Text>

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

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
})
