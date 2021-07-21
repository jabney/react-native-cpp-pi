package com.cppmodule.calculatepi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalculatePiModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "CalculatePi"
    }

    @ReactMethod
    fun calculate(iterations: Int, promise: Promise) {
        promise.resolve(3.14)
    }
}
