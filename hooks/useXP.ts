import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export const useXP = () => {
	const [xp, setXP] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(true)

	const loadXP = async () => {
		try {
			const xpString = await AsyncStorage.getItem('@xp')
			if (xpString) {
				setXP(Number(xpString))
			}
		} catch (error) {
			console.error('Error loading XP:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadXP()
	}, [])

	const addXP = async (points: number) => {
		try {
			const newXP = xp + points
			setXP(newXP)
			await AsyncStorage.setItem('@xp', newXP.toString())
		} catch (error) {
			console.error('Error adding XP:', error)
		}
	}

	return { xp, addXP, loading }
}
