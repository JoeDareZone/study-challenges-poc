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
	progress: number
	totalQuizzes: number
	quizzes: QuizQuestion[]
}
