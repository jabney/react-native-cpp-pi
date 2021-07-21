/**
 *
 */
import { NativeModules } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
const { CalculatePi } = NativeModules

const App = () => {
  const [result, setResult] = useState<number | null>(null)

  useEffect(() => {
    setTimeout(() => {
      CalculatePi.calculate(1e10).then((result: number) => setResult(result))
    }, 0)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{result ?? 'calculating pi...'}</Text>
      </View>
    </SafeAreaView>
  )
}

export default App
