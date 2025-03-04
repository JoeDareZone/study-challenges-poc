import AsyncStorage from "@react-native-async-storage/async-storage"
import { flashcardsData } from "../data/flashcards"
import { FSRS, Card } from "ts-fsrs"

const fsrs = new FSRS({})

// Load flashcards for a specific grade and subject
export const loadFlashcards = async (grade: string, subject: string) => {
  const storageKey = `${grade}-${subject}`

  // Check if flashcards already exist
  const existingFlashcards = await AsyncStorage.getItem(storageKey)
  if (existingFlashcards) {
    return JSON.parse(existingFlashcards)
  }

  // Generate new flashcards
  const newFlashcards = flashcardsData[grade]?.[subject]?.map((q) => ({
    ...q,
    due: new Date().toISOString(),
    repetitions: 0,
    easeFactor: 2.5,
    interval: 0
  }))

  if (newFlashcards) {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newFlashcards))
  }

  return newFlashcards || []
}

// Review a flashcard
export const reviewFlashcard = async (grade: string, subject: string, cardId: string, rating: number) => {
  const storageKey = `${grade}-${subject}`
  const storedFlashcards = await AsyncStorage.getItem(storageKey)

  if (!storedFlashcards) return

  const flashcards = JSON.parse(storedFlashcards)
  const cardIndex = flashcards.findIndex((c) => c.id === cardId)

  if (cardIndex !== -1) {
    flashcards[cardIndex] = fsrs.review(flashcards[cardIndex], new Date(), rating)
    await AsyncStorage.setItem(storageKey, JSON.stringify(flashcards))
  }
}
