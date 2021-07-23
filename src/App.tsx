/**
 *
 */
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Button } from './Button'
import { CalculatePi } from './CalculatePi'

const App: React.FC = () => {
  const [concurrency, setConcurrency] = useState<number | null>(null)
  const [result, setResult] = useState<number | null>(null)

  useEffect(() => {
    if (concurrency == null) {
      void CalculatePi.concurrency().then(
        // Avoid flashing the concurrency loading message too quickly.
        (numThreads) => void setTimeout(() => setConcurrency(numThreads), 1000),
      )
    } else {
      CalculatePi.calculate(1e10, concurrency).then(setResult)
    }
  }, [concurrency])

  /**
   * The state is resettable if both values are not null.
   */
  const resettable = concurrency != null && result != null

  const reset = useCallback(() => {
    if (resettable) {
      setResult(null)
      setConcurrency(null)
    }
  }, [resettable])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 12 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {concurrency != null ? (
            <Text>{result ?? `Calculating pi using ${concurrency} threads...`}</Text>
          ) : (
            <Text>Checking concurrency...</Text>
          )}
        </View>
        <Button text="Reset" onPress={reset} disabled={!resettable} style={{ opacity: resettable ? 1 : 0.5 }} />
      </View>
    </SafeAreaView>
  )
}

export default App
