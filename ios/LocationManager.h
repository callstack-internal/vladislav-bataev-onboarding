//
//  LocationManager.h
//  weatherApp
//
//  Created by Vladislav Bataev on 27/08/2024.
//

#ifndef LocationManager_h
#define LocationManager_h

#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>
#import <CoreLocation/CoreLocation.h>

@interface LocationManager : RCTEventEmitter <RCTBridgeModule, CLLocationManagerDelegate>
@end

#endif /* LocationManager_h */
