/**
 *
 */
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { CalculatePi } from './CalculatePi'

const App: React.FC = () => {
  const [concurrency, setConcurrency] = useState(0)
  const [result, setResult] = useState<number | null>(null)

  useEffect(
    () =>
      void CalculatePi.concurrency().then(
        // Avoid flashing the concurrency loading message too quickly.
        (result) => void setTimeout(() => setConcurrency(result), 1000),
      ),
    [],
  )

  useEffect(() => {
    if (concurrency > 0) {
      CalculatePi.calculate(1e10, concurrency).then(setResult)
    }
  }, [concurrency])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {concurrency > 0 ? (
          <Text>
            {result ?? `Calculating pi using ${concurrency} threads...`}
          </Text>
        ) : (
          <Text>Checking concurrency...</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

export default App
