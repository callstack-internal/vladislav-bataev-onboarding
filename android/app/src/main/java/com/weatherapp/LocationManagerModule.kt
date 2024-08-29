package com.weatherapp

import android.Manifest
import android.content.pm.PackageManager
import android.location.Location
import android.os.Looper
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.location.*

class LocationManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityCompat.OnRequestPermissionsResultCallback {

    private var fusedLocationClient: FusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(reactContext)
    private var locationCallback: LocationCallback? = null
    private var locationPromise: Promise? = null

    private val LOCATION_PERMISSION_REQUEST_CODE = 1

    override fun getName(): String = "LocationManager"

    @ReactMethod
    fun startListeningForLocation() {
        if (!hasLocationPermission()) {
            requestLocationPermission()
            return
        }

        try {
            val locationRequest = createLocationRequest()
            locationCallback = createLocationCallback()

            fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback!!, Looper.getMainLooper())
        } catch (e: SecurityException) {
            sendErrorToJS("SecurityException: ${e.message}")
        }
    }

    @ReactMethod
    fun stopListeningForLocation() {
        locationCallback?.let {
            fusedLocationClient.removeLocationUpdates(it)
            locationCallback = null
        }
    }

    @ReactMethod
    fun getCurrentLocation(promise: Promise) {
        if (!hasLocationPermission()) {
            promise.reject("location_error", "Location permission not granted")
            requestLocationPermission()
            return
        }

        locationPromise = promise

        try {
            fusedLocationClient.lastLocation.addOnSuccessListener { location ->
                if (location != null) {
                    resolveLocationPromise(location)
                } else {
                    requestSingleLocationUpdate()
                }
            }.addOnFailureListener { e ->
                promise.reject("location_error", "Failed to get location: ${e.message}")
            }
        } catch (e: SecurityException) {
            promise.reject("location_error", "SecurityException: ${e.message}")
        }
    }

    private fun requestSingleLocationUpdate() {
        if (!hasLocationPermission()) {
            sendErrorToJS("Location permission not granted")
            return
        }

        try {
            val locationRequest = createLocationRequest()
            fusedLocationClient.requestLocationUpdates(locationRequest, object : LocationCallback() {
                override fun onLocationResult(locationResult: LocationResult) {
                    fusedLocationClient.removeLocationUpdates(this)

                    val lastLocation = locationResult.lastLocation
                    if (lastLocation != null) {
                        resolveLocationPromise(lastLocation)
                    } else {
                        sendErrorToJS("Failed to obtain location")
                    }
                }
            }, Looper.getMainLooper())
        } catch (e: SecurityException) {
            sendErrorToJS("SecurityException: ${e.message}")
        }
    }

    private fun createLocationRequest(): LocationRequest {
        return LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 1000)
            .setMinUpdateIntervalMillis(1000)
            .build()
    }

    private fun createLocationCallback(): LocationCallback {
        return object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                for (location in locationResult.locations) {
                    sendLocationEvent(location)
                }
            }
        }
    }

    private fun resolveLocationPromise(location: Location) {
        locationPromise?.resolve(Arguments.createMap().apply {
            putDouble("latitude", location.latitude)
            putDouble("longitude", location.longitude)
        })
        locationPromise = null
    }

    private fun sendLocationEvent(location: Location) {
        val params = Arguments.createMap().apply {
            putDouble("latitude", location.latitude)
            putDouble("longitude", location.longitude)
        }
        sendEvent("locationUpdated", params)
    }

    private fun sendErrorToJS(errorMessage: String) {
        val params = Arguments.createMap().apply {
            putString("error", errorMessage)
        }
        sendEvent("locationError", params)
    }

    private fun sendEvent(eventName: String, params: WritableMap) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    private fun hasLocationPermission(): Boolean {
        return ActivityCompat.checkSelfPermission(
            reactApplicationContext,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED || ActivityCompat.checkSelfPermission(
            reactApplicationContext,
            Manifest.permission.ACCESS_COARSE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
    }

    private fun requestLocationPermission() {
        currentActivity?.let {
            ActivityCompat.requestPermissions(
                it,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION),
                LOCATION_PERMISSION_REQUEST_CODE
            )
        }
    }

    @ReactMethod
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startListeningForLocation()
            } else {
                sendErrorToJS("Location permission denied by user")
            }
        }
    }
}
