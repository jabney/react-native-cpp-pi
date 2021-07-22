# React Native C++ PI

A react native module that makes use of shared, multithreaded C++ for both iOS and Android

## iOS

Added shared C++ files to project (`pi.cpp`, `pi.h`). This added the `pi.cpp` file to the `Build Phases -> Compile Sources` setting in Xcode.

Created the `CalculatePiModule.h` and `CalculatePiModule.m` file as normal react native module files, but renamed the `.m` file to `.mm` which allows mixed usage of Objective C and C++. The RCT method defined here just calls the method defined in the `.cpp` file.

In one iteration of this module I added the C++ header path to the _Library Search Paths_ setting in _Build Settings_, but this didn't seem necessary after adding both the `.h` and `.cpp` file to the project.

Because of the C++ syntax used in the `pi.cpp` file, I changed the _C++ Language Dialect_ setting to `-std=c++17` in the _Build Settings_ in Xcode. Not doing so may result in compile failures.

## Android

There was a little more involved here. Fortunately some help was given by Android Studio along the way. The main things to note here are two files which need to be added, and some additions to the `CalculatePiModule.kt` file:

- `cpp-adapter.cpp` creates a bridge for calling the C++ method in the shared C++ module from the `CalculatePiModule.kt` file. The name of this file is not important; it's compiled and linked from `CMakeLists.txt`.
- `CMakeLists.txt` defines some settings for compiling the C++ such as the paths to the files.
- The library defined in `CMakeLists.txt` needs to be dynamically loaded with a directive in `CalculatePiModule.kt`, and an external method declaration needs to be made, which links the RCT method to the bridge function in `cpp-adapter.cpp`.

That last part is the tricky part. It turned out that Android Studio was helpful here.

```kotlin
// CalculatePiModule.kt

class CalculatePiModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object {
        // This function is defined with a special name in `cpp-adapter.cpp`.
        external fun calculate(iterations: Long): Double

        // Load the library specified in CMakeLists.txt with the name given there.
        init {
            System.loadLibrary("calculatepi")
        }
    }
```

The name of the bridge function in `cpp-adapter.cpp` is `Java_com_cpppi_calculatepi_CalculatePiModule_00024Companion_calculate`, which is the package name, module name, and method name with some additional info. Knowing what this should be appears impossible, particularly the `00024` part of the companion reference. By hovering over the error given for `external fun calculate(...)` in the KT module, it gave me the name of the bridge function it was looking for and I was able to add that as the function name in `cpp-adapter.cpp`.

Note that working with the `CMakeLists.txt` and `cpp-adapter.cpp` files was made more convenient by switching the _Project_ pane to _Project_ view instead of _Android_ view.

## Resources

- https://reime005.medium.com/react-native-and-c-87a2311dc3d
- https://github.com/reime005/react-native-cpp-code
- https://github.com/reime005/RNCPPExample
- https://www.cplusplus.com/forum/beginner/273042/
- https://stackoverflow.com/questions/51288230/how-do-i-enable-c17-in-xcode-for-mac-osx
- https://thebhwgroup.com/blog/react-native-jni
- https://developer.android.com/studio/projects/add-native-code
