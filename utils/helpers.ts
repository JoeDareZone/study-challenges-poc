export const shuffleArray = (array: string[]) => {
	return array.sort(() => Math.random() - 0.5)
}

export const getDifficulty = (grade: string): 'easy' | 'medium' | 'hard' => {
	const difficultyMapping: { [key: string]: 'easy' | 'medium' | 'hard' } = {
		'Grade 7': 'easy',
		'Grade 8': 'medium',
		'Grade 9': 'hard',
	}
	return difficultyMapping[grade] || 'easy'
}

export const getToday = () => {
	const today = new Date()
	return today.toISOString().split('T')[0]
}

export const getCategoryIdFromSubject = (subject: string) => {
	const categoryMapping: { [key: string]: number } = {
		Geography: 22,
		Science: 17,
		History: 23,
		Computers: 18,
	}
	return categoryMapping[subject]
}

export const getPercentage = (score: number, total: number) => {
	return ((score / total) * 100).toFixed(2)
}
