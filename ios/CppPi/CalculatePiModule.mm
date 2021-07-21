
// CalendarManagerBridge.m
#import "CalculatePiModule.h"
@implementation RCTCalculatePIModule

RCT_EXPORT_MODULE(CalculatePi);

RCT_EXPORT_METHOD(calculate:(nonnull NSNumber*)iterations
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  auto result = cppmodule::calculate(iterations.unsignedLongLongValue);
  resolve(@(result));
}
@end
