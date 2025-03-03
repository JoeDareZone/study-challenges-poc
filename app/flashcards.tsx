import { useGlobalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import CardsSwipe from 'react-native-cards-swipe';

const cardsData = [
	{ text: 'Hello' },
	{ text: 'Hello' },
	{ text: 'Hello' },
	{ text: 'Hello' },
]

export default function FlashcardsScreen() {
	const router = useRouter()
	const { grade, subject } = useGlobalSearchParams()

	return (
		<View className='flex-1 px-5 bg-white justify-center items-center'>
			<CardsSwipe
				cards={cardsData}
				// cardContainerStyle='w-11/12 h-7/10 rounded-lg shadow-md'
				renderCard={card => (
					<View className='w-full h-full rounded-lg overflow-hidden'>
						<Text>{card.text}</Text>
					</View>
				)}
			/>
		</View>
	)
}
