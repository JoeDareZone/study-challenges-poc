import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import '../global.css'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView className='flex-1 bg-gray-100'>
				<Stack>
					<Stack.Screen
						name='(tabs)'
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='grades'
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='subjects'
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='flashcards'
						options={{ headerShown: false }}
					/>
				</Stack>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}
