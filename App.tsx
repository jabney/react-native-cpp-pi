/**
 *
 */
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { CalculatePi } from './CalculatePi'

const App: React.FC = () => {
  const [result, setResult] = useState<number | null>(null)

  useEffect(() => {
    setTimeout(() => {
      CalculatePi.calculate(1e10).then(setResult)
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
