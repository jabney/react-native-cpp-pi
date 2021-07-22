import { NativeModules } from 'react-native'

const CalculatePi = NativeModules.CalculatePi as {
  concurrency(): Promise<number>
  calculate(iterations: number): Promise<number>
}

export { CalculatePi }
