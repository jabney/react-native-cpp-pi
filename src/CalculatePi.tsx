import { NativeModules } from 'react-native'

const CalculatePi = NativeModules.CalculatePi as {
  calculate(iterations: number): Promise<number>
}

export { CalculatePi }
