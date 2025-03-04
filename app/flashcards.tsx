import { useQuiz } from '@/hooks/useQuiz'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import CardsSwipe from 'react-native-cards-swipe'
import { Rating } from 'ts-fsrs'
import { updateFlashcard } from '../utils/flashcardStorage'

export default function FlashcardScreen() {
	const swiper = useRef<any>(null)
	const { grade, subject } = useLocalSearchParams()
	// const [flashcards, setFlashcards] = useState<any[]>([]);

	// useEffect(() => {
	//     const loadFlashcards = async () => {
	//         const data = await getFlashcards(grade as string, subject as string);
	//         setFlashcards(data);
	//     };
	//     loadFlashcards();
	// }, []);

	const {
		quizQuestions,
		flashcards,
		loading,
		error,
		fetchQuizQuestions,
		loadStoredQuiz,
	} = useQuiz(19, 'medium')

	useEffect(() => {
		loadStoredQuiz()
	}, [])

	const handleRating = async (index: number, rating: Rating) => {
		await updateFlashcard(grade as string, subject as string, index, rating)
		swiper.current?.swipeTop()
	}

	return (
		<View className='flex-1 items-center justify-center px-4 py-24'>
			{flashcards.length > 0 ? (
				<CardsSwipe
					ref={swiper}
					cards={flashcards}
                    
					renderCard={card => (
						<View className='w-full h-full items-center justify-center bg-white rounded-2xl shadow-sm p-5'>
							<Text className='text-2xl font-bold'>
								{card.question}
							</Text>
						</View>
					)}
					renderNoMoreCard={() => (
						<View className='w-full h-full items-center justify-center'>
							<Text className='text-2xl font-bold'>
								No more cards
							</Text>
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
						router.push(`/quiz`)
					}}
				/>
			) : (
				<Text className='text-xl'>No flashcards available</Text>
			)}

			{/* <View className="flex-row mt-5">
                <TouchableOpacity
                    className="bg-red-500 p-3 rounded-lg mr-3"
                    onPress={() => handleRating(0, Rating.Again)}
                >
                    <Text className="text-white">Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-yellow-500 p-3 rounded-lg mr-3"
                    onPress={() => handleRating(0, Rating.Hard)}
                >
                    <Text className="text-white">Hard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-green-500 p-3 rounded-lg mr-3"
                    onPress={() => handleRating(0, Rating.Good)}
                >
                    <Text className="text-white">Good</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-blue-500 p-3 rounded-lg"
                    onPress={() => handleRating(0, Rating.Easy)}
                >
                    <Text className="text-white">Easy</Text>
                </TouchableOpacity>
            </View> */}
		</View>
	)
}
