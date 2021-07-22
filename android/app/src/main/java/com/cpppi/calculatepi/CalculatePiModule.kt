package com.cpppi.calculatepi

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalculatePiModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object {
        external fun calculate(iterations: Long, concurrency: Long): Double
        external fun concurrency(): Int

        init {
            System.loadLibrary("calculatepi")
        }
    }

    override fun getName(): String {
        return "CalculatePi"
    }

    @ReactMethod
    fun concurrency(promise: Promise) {
        promise.resolve(concurrency())
    }

    @ReactMethod
    fun calculate(iterations: Double, concurrency: Double, promise: Promise) {
        val result = calculate(iterations.toLong(), concurrency.toLong())
        promise.resolve(result)
    }
}