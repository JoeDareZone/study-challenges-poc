import { Challenge } from '@/types/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export const useAllChallenges = () => {
	const [challenges, setChallenges] = useState<Challenge[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		getAllStoredChallenges()
	}, [])

	const getAllStoredChallenges = async () => {
		setLoading(true)
		try {
			const allKeys = await AsyncStorage.getAllKeys()
			const challengeKeys = allKeys.filter(key =>
				key.startsWith('@challenge-')
			)
			const storedChallenges = await AsyncStorage.multiGet(challengeKeys)

			const challenges = storedChallenges.map(([key, value]) => ({
				key,
				challenge: value ? (JSON.parse(value) as Challenge) : null,
			}))

			setChallenges(
				challenges
					.map(c => c.challenge)
					.filter((c): c is Challenge => c !== null)
			)
			return challenges
		} catch (error) {
			console.error('Error retrieving all challenges:', error)
			return []
		} finally {
			setLoading(false)
		}
	}

	return {
		challenges,
		loading,
		error,
		getAllStoredChallenges,
	}
}
