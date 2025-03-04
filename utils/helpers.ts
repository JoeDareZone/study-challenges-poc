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
