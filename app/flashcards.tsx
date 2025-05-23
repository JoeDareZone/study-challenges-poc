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
		loadStoredChallenge().then(challenge => {
			if (!challenge) {
				fetchNewChallengeQuestions()
			}
		})
	}, [])

	if (loading || !challenge)
		return (
			<ActivityIndicator
				size='large'
				className='flex-1 items-center justify-center'
			/>
		)

	return (
		<View className='flex-1 bg-gradient-to-b from-blue-50 to-gray-100 p-6'>
			<Text className='text-3xl font-bold text-center text-gray-800 mb-6'>
				{subject}: {grade}
			</Text>

			<View className='flex-1'>
				<CardsSwipe
					cards={challenge.quizzes}
					cardContainerStyle={{ width: '100%', height: '100%' }}
					lowerCardZoom={0.6}
					loop={false}
					onSwipeStart={() => setIsFlipped(false)}
					renderCard={card => (
						<View className='w-full h-full items-center justify-center py-12 '>
							<FlipCard
								style={{ width: '90%', minWidth: '90%' }}
								key={`${card.question}-${isFlipped}`}
								flipHorizontal={true}
								flipVertical={false}
								flip={isFlipped}
							>
								<View className='h-full justify-center items-center bg-white rounded-2xl shadow-md p-6'>
									<Text className='text-2xl font-bold text-gray-900 text-center'>
										{card.question}
									</Text>
								</View>
								<View className='h-full justify-center items-center bg-white rounded-2xl shadow-md p-6'>
									<Text className='text-2xl font-bold text-gray-900 text-center'>
										{card.correct_answer}
									</Text>
								</View>
							</FlipCard>
						</View>
					)}
					renderYep={() => (
						<View className='border-4 border-green-500 rounded-lg p-2 mt-20 ml-10 transform rotate-22'>
							<Text className='text-4xl text-green-500 font-bold'>
								YEP
							</Text>
						</View>
					)}
					renderNope={() => (
						<View className='border-4 border-red-500 rounded-lg p-2 mt-20 mr-10 transform rotate-22'>
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

			<Text className='text-center text-lg text-gray-500 mb-6'>
				Tap to flip
			</Text>
			<View className='mb-4 flex-row justify-between items-center px-2'>
				<View className='flex-1 flex-row items-center flex-wrap'>
					<Text className='text-xl text-gray-600'>←</Text>
					<Text className='text-sm text-red-600 ml-1'>
						Left for incorrect
					</Text>
				</View>
				<Text className='text-xl text-gray-600'>Swipe</Text>
				<View className='flex-1 flex-row items-center justify-end flex-wrap'>
					<Text className='text-sm text-green-600 mr-1'>
						Right for correct
					</Text>
					<Text className='text-xl text-gray-600'>→</Text>
				</View>
			</View>
		</View>
	)
}
