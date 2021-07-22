
// CalendarManagerBridge.m
#import "CalculatePiModule.h"
@implementation RCTCalculatePIModule

RCT_EXPORT_MODULE(CalculatePi);

RCT_EXPORT_METHOD(concurrency:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  auto result = cppmodule::concurrency();
  resolve(@(result));
}

RCT_EXPORT_METHOD(calculate:(nonnull NSNumber*)iterations
                  num_threads:(nonnull NSNumber*)concurrency
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  auto result = cppmodule::calculate(iterations.unsignedLongLongValue, concurrency.unsignedLongLongValue);
  resolve(@(result));
}

@end
