//
// Created by Marius Reimer on 2019-08-10.
//

#include <iostream>
#include <jni.h>
#include <android/log.h>
#include "pi.h"

using namespace std;

extern "C" JNIEXPORT jint JNICALL
Java_com_cpppi_calculatepi_CalculatePiModule_00024Companion_concurrency(JNIEnv *env, jobject type)
{
    return cppmodule::concurrency();
}

extern "C" JNIEXPORT jdouble JNICALL
Java_com_cpppi_calculatepi_CalculatePiModule_00024Companion_calculate(JNIEnv *env, jobject type, jlong iterations, jlong concurrency)
{
    return cppmodule::calculate(static_cast<uint64_t>(iterations), static_cast<uint64_t>(concurrency));
}
