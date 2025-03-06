import { StreakData } from '@/types/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export const useStreak = () => {
	const [streak, setStreak] = useState<number>(0)
	const [lastCompleted, setLastCompleted] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	const STREAK_KEY = '@globalStreak'

	const loadStreak = async () => {
		setLoading(true)
		try {
			const data = await AsyncStorage.getItem(STREAK_KEY)
			if (data) {
				const parsed: StreakData = JSON.parse(data)
				setStreak(parsed.streak)
				setLastCompleted(parsed.lastCompleted)
			}
		} catch (error) {
			console.error('Error loading streak data:', error)
		} finally {
			setLoading(false)
		}
	}

	const updateStreak = async () => {
		const today = dayjs().format('YYYY-MM-DD')

		if (lastCompleted === today) return

		let newStreak = 1

		if (lastCompleted) {
			const diff = dayjs(today).diff(dayjs(lastCompleted), 'day')
			if (diff === 1) {
				newStreak = streak + 1
			}
		}

		const newStreakData: StreakData = {
			streak: newStreak,
			lastCompleted: today,
		}

		try {
			await AsyncStorage.setItem(
				STREAK_KEY,
				JSON.stringify(newStreakData)
			)
			setStreak(newStreak)
			setLastCompleted(today)
		} catch (error) {
			console.error('Error updating streak data:', error)
		}
	}

	useEffect(() => {
		loadStreak()
	}, [])

	return { streak, updateStreak, loading }
}
