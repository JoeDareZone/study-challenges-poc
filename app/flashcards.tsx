import { useChallenge } from '@/hooks/useChallenge'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import CardsSwipe from 'react-native-cards-swipe'
import FlipCard from 'react-native-flip-card'

export default function FlashcardScreen() {
	const { grade, subject } = useLocalSearchParams()
	const {
		challenge,
		loading,
		fetchNewChallengeQuestions,
		loadStoredChallenge,
	} = useChallenge(grade as string, subject as string)

	const [isFlipped, setIsFlipped] = useState(false)

	useEffect(() => {
		loadStoredChallenge().then(res => {
			if (res) {
				console.log('Quiz questions loaded from storage')
			} else {
				console.log('No quiz, exists, fetching quiz questions')
				fetchNewChallengeQuestions()
			}
		})
	}, [])
	// const handleRating = async (index: number, rating: Rating) => {
	// 	await updateFlashcard(grade as string, subject as string, index, rating)
	// 	// swiper.current?.swipeTop()
	// }

	if (loading || !challenge)
		return (
			<ActivityIndicator
				size='large'
				className='flex-1 items-center justify-center'
			/>
		)

	return (
		<View className='flex-1 bg-gradient-to-b from-blue-50 to-gray-100 p-6'>
			{/* Header */}
			<Text className='text-3xl font-bold text-center text-gray-800 mb-6'>
				{subject} - {grade}
			</Text>

			{/* Cards Swipe */}
			<View className='flex-1'>
				<CardsSwipe
					cards={challenge.quizzes}
					cardContainerStyle={{ width: '100%', height: '100%' }}
					  lowerCardZoom={0.6}
					loop={false}
					onSwipeStart={() => setIsFlipped(false)}
					renderCard={card => (
						<View className='w-full h-full items-center justify-center py-20'>
							<FlipCard
								key={`${card.question}-${isFlipped}`}
								flipHorizontal={true}
								flipVertical={false}
								flip={isFlipped}
								alignHeight
								alignWidth
							>
								<View className='h-full w-full items-center justify-center bg-white rounded-2xl shadow-md p-6'>
									<Text className='text-2xl font-bold text-gray-900 text-center'>
										{card.question}
									</Text>
								</View>
								<View className='h-full w-full items-center justify-center bg-white rounded-2xl shadow-md p-6'>
									<Text className='text-2xl font-bold text-gray-900 text-center'>
										{card.correct_answer}
									</Text>
								</View>
							</FlipCard>
						</View>
					)}
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
					onNoMoreCards={() => {
						router.push(`/quiz?grade=${grade}&subject=${subject}`)
					}}
				/>
			</View>

			{/* Footer / Instruction */}
			<Text className='text-center text-base text-gray-600 mt-6'>
				Swipe cards to review your flashcards.
			</Text>
		</View>
	)
}
