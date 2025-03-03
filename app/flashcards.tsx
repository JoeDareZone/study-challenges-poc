import React, { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CardsSwipe from 'react-native-cards-swipe'

const cardsData = [
	{ text: 'Card 1' },
	{ text: 'Card 2' },
	{ text: 'Card 3' },
	{ text: 'Card 4' },
]

export default function FlashcardScreen() {
	const swiper = useRef<any>(null)

	return (
		<View className='flex-1 items-center justify-center px-4 py-24'>
			<CardsSwipe
				ref={swiper}
				cards={cardsData}
				cardContainerStyle={styles.cardContainer}
				containerStyle={styles.container}
				renderYep={() => (
					<View className='border-4 border-green-500 rounded-lg p-2 mt-5 ml-10 transform rotate-22'>
						<Text className='text-4xl text-green-500 font-bold'>
							YEP
						</Text>
					</View>
				)}
				renderNope={() => (
					<View className='border-4 border-red-500 rounded-lg p-2 mt-6 mr-10 transform rotate-22'>
						<Text className='text-4xl text-red-500 font-bold'>
							NOPE
						</Text>
					</View>
				)}
				loop={false}
				renderCard={card => (
					<View className='w-full h-full items-center justify-center bg-white rounded-2xl shadow-sm'>
						<Text className='text-2xl font-bold'>{card.text}</Text>
					</View>
				)}
				renderNoMoreCard={() => (
					<View className='w-full h-full items-center justify-center  rounded-2xl'>
						<Text className='text-2xl font-bold'>
							No more cards
						</Text>
					</View>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardContainer: {
		width: '92%',
		height: '70%',
	},
})
