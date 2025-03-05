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
		loaded && SplashScreen.hideAsync()
	}, [loaded])

	!loaded && null

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView className='flex-1 bg-gray-100'>
				<Stack>
					<Stack.Screen
						name='index'
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
					<Stack.Screen
						name='quiz'
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='results'
						options={{ headerShown: false }}
					/>
				</Stack>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}
