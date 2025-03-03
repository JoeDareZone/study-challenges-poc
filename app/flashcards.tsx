import React from 'react'
import { Text, View } from 'react-native'

import CardsSwipe from 'react-native-cards-swipe'

const cardsData = [
	{ text: 'Card 1' },
	{ text: 'Card 2' },
	{ text: 'Card 3' },
	{ text: 'Card 4' },
]

export default function App() {
	return (
		<View className='flex-1 items-center justify-center px-4 py-24'>
			<CardsSwipe
				cards={cardsData}
				cardContainerStyle={{
					width: '100%',
					height: '100%',
				}}
				renderCard={card => (
					<View className='w-full h-full items-center justify-center bg-white rounded-2xl shadow-sm'>
						<Text className='text-2xl font-bold'>{card.text}</Text>
					</View>
				)}
			/>
		</View>
	)
}
