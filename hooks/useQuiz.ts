import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
}

interface Flashcard {
  question: string;
  answer: string;
}

const API_URL = "https://opentdb.com/api.php";

export const useQuiz = (categoryId: number, difficulty: string) => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizQuestions();
  }, [categoryId, difficulty]);

  const fetchQuizQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`);
      const data = await response.json();

      if (!data.results) throw new Error("No questions found");

      // Process questions for quiz
      const formattedQuestions: QuizQuestion[] = data.results.map((q: any) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
        category: q.category,
        difficulty: q.difficulty
      }));

      // Process flashcards (only Q & A)
      const formattedFlashcards: Flashcard[] = formattedQuestions.map(q => ({
        question: q.question,
        answer: q.correct_answer
      }));

      // Store in AsyncStorage
      await AsyncStorage.setItem("@quizQuestions", JSON.stringify(formattedQuestions)).then(() => {
        console.log('quiz questions stored')
      });
      await AsyncStorage.setItem("@flashcards", JSON.stringify(formattedFlashcards)).then(() => {
        console.log('flashcards stored')
      });

      setQuizQuestions(formattedQuestions);
      setFlashcards(formattedFlashcards);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Retrieve stored quiz questions
  const loadStoredQuiz = async () => {
    try {
      const storedQuiz = await AsyncStorage.getItem("@quizQuestions");
      const storedFlashcards = await AsyncStorage.getItem("@flashcards");

      if (storedQuiz) setQuizQuestions(JSON.parse(storedQuiz));
      if (storedFlashcards) setFlashcards(JSON.parse(storedFlashcards));
    } catch (err) {
      setError("Failed to load stored data");
    }
  };

  return { quizQuestions, flashcards, loading, error, fetchQuizQuestions, loadStoredQuiz };
};
