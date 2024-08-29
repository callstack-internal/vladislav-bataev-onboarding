//
//  LocationManager.m
//  weatherApp
//
//  Created by Vladislav Bataev on 27/08/2024.
//

#import "LocationManager.h"
#import <React/RCTLog.h>
#import <React/RCTEventEmitter.h>

@implementation LocationManager {
    CLLocationManager *locationManager;
    RCTPromiseResolveBlock _resolve;
    RCTPromiseRejectBlock _reject;
    bool hasListeners;
}

RCT_EXPORT_MODULE();

- (instancetype)init {
    self = [super init];
    if (self) {
        locationManager = [[CLLocationManager alloc] init];
        locationManager.delegate = self;
        locationManager.desiredAccuracy = kCLLocationAccuracyBest;
    }
    return self;
}

// Method to request permission and start listening for location updates
RCT_EXPORT_METHOD(startListeningForLocation)
{
    if ([CLLocationManager locationServicesEnabled]) {
        CLAuthorizationStatus status = [CLLocationManager authorizationStatus];
        if (status == kCLAuthorizationStatusNotDetermined) {
            [locationManager requestWhenInUseAuthorization];
        } else if (status == kCLAuthorizationStatusAuthorizedWhenInUse || status == kCLAuthorizationStatusAuthorizedAlways) {
            [locationManager startUpdatingLocation];
        } else {
            [self sendErrorEvent:@"Location permissions are not granted."];
        }
    } else {
        [self sendErrorEvent:@"Location services are disabled."];
    }
}

// Method to get the current location using a Promise without stopping live updates
RCT_EXPORT_METHOD(getCurrentLocation:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    if ([CLLocationManager locationServicesEnabled]) {
        CLAuthorizationStatus status = [CLLocationManager authorizationStatus];
        if (status == kCLAuthorizationStatusNotDetermined) {
            [locationManager requestWhenInUseAuthorization];
            _resolve = resolve;
            _reject = reject;
        } else if (status == kCLAuthorizationStatusAuthorizedWhenInUse || status == kCLAuthorizationStatusAuthorizedAlways) {
            CLLocation *location = [locationManager location];
            if (location) {
                resolve(@{
                    @"latitude": @(location.coordinate.latitude),
                    @"longitude": @(location.coordinate.longitude)
                });
            } else {
                // If no location is available, trigger a one-time location update
                _resolve = resolve;
                _reject = reject;
                [locationManager requestLocation]; // This method gets a single location update
            }
        } else {
            reject(@"location_error", @"Location permissions are not granted.", nil);
        }
    } else {
        reject(@"location_error", @"Location services are disabled.", nil);
    }
}

// Method to stop listening for location updates
RCT_EXPORT_METHOD(stopListeningForLocation)
{
    [locationManager stopUpdatingLocation];
}

#pragma mark - CLLocationManagerDelegate

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations
{
    CLLocation *location = [locations lastObject];
    if (location) {
        if (_resolve) {
            _resolve(@{
                @"latitude": @(location.coordinate.latitude),
                @"longitude": @(location.coordinate.longitude)
            });
            _resolve = nil;
            _reject = nil;
            // Do not stop updating location here to keep live updates running
        }
        if (hasListeners) {
            [self sendEventWithName:@"locationUpdated" body:@{
                @"latitude": @(location.coordinate.latitude),
                @"longitude": @(location.coordinate.longitude)
            }];
        }
    }
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
    if (_reject) {
        NSString *errorMessage;
        switch ([error code]) {
            case kCLErrorDenied:
                errorMessage = @"Location access denied by user.";
                break;
            case kCLErrorLocationUnknown:
                errorMessage = @"Location data unavailable.";
                break;
            default:
                errorMessage = [NSString stringWithFormat:@"Failed to get location: %@", error.localizedDescription];
                break;
        }
        _reject(@"location_error", errorMessage, error);
        _resolve = nil;
        _reject = nil;
    }

    [self sendErrorEvent:error.localizedDescription];
}

#pragma mark - RCTEventEmitter

- (NSArray<NSString *> *)supportedEvents {
    return @[@"locationUpdated", @"locationError"];
}

- (void)startObserving {
    hasListeners = YES;
}

- (void)stopObserving {
    hasListeners = NO;
}

// Helper method to send error events
- (void)sendErrorEvent:(NSString *)errorMessage {
    if (hasListeners) {
        [self sendEventWithName:@"locationError" body:@{@"error": errorMessage}];
    } else {
        RCTLogError(@"%@", errorMessage);
    }
}

@end
