export interface QuizQuestion {
	question: string
	correct_answer: string
	incorrect_answers: string[]
	category: string
	difficulty: string
}

export interface Challenge {
	id: string
	subject: string
	grade: string
	createdAt: string
	totalQuizzes: number
	quizzes: QuizQuestion[]
	completed: boolean
}

export interface StreakData {
	streak: number
	lastCompleted: string | null
}
