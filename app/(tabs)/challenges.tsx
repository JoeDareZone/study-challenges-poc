import { SafeAreaView, Text, StyleSheet } from 'react-native'

export default function ChallengesScreen() {
	return (
		<SafeAreaView>
			<Text>Challenges</Text>
		</SafeAreaView>
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
