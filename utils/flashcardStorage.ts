import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card, createEmptyCard, FSRS, Rating, RecordLog } from 'ts-fsrs'

// Initialize FSRS system
const fsrs = new FSRS({})

/**
 * Generate a new flashcard with FSRS scheduling
 */
export const createFlashcard = async (
	grade: string,
	subject: string,
	question: string,
	answer: string
) => {
	const card: Card = createEmptyCard()
	const flashcard = { question, answer, card }

	const key = `flashcards_${grade}_${subject}`
	const existingFlashcards = JSON.parse(
		(await AsyncStorage.getItem(key)) || '[]'
	)
	existingFlashcards.push(flashcard)

	await AsyncStorage.setItem(key, JSON.stringify(existingFlashcards))
}

/**
 * Fetch flashcards for a given grade and subject
 */
export const getFlashcards = async (grade: string, subject: string) => {
	const key = `flashcards_${grade}_${subject}`
	const flashcards = JSON.parse((await AsyncStorage.getItem(key)) || '[]')
	return flashcards
}

/**
 * Update flashcard after user rates it
 */
export const updateFlashcard = async (
	grade: string,
	subject: string,
	index: number,
	rating: Rating
) => {
	const key = `flashcards_${grade}_${subject}`
	const flashcards = JSON.parse((await AsyncStorage.getItem(key)) || '[]')

	if (flashcards[index]) {
		let card = flashcards[index].card
		let scheduling_cards: RecordLog = fsrs.repeat(card, new Date())

		// Update the card state based on user rating
		flashcards[index].card =
			scheduling_cards[rating as keyof typeof scheduling_cards].card

		await AsyncStorage.setItem(key, JSON.stringify(flashcards))
	}
}
