package com.cpppi.calculatepi

import android.util.Log
import com.cpppi.calculatepi.CalculatePiModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

class CalculatePiModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object {
        external fun calculate(iterations: Long): Double

        init {
            System.loadLibrary("calculatepi")
        }
    }

    override fun getName(): String {
        return "CalculatePi"
    }

    @ReactMethod
    fun calculate(iterations: Double, promise: Promise) {
        val result = calculate(iterations.toLong())
        promise.resolve(result)
    }
}