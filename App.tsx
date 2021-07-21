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
    CalculatePi.calculate(1e10).then((result: number) => setResult(result))
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{result ?? 'calculating...'}</Text>
      </View>
    </SafeAreaView>
  )
}

export default App
