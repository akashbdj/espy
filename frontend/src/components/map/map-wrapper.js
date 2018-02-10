import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import { Permissions, Location, MapView } from 'expo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import MapComponent from 'espy/components/map'
import LocationSearch from 'espy/components/map/location-search'

const { height, width } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeInterval: 20000,
    distanceInterval: 500
}

class MapWrapper extends Component {
    state = {
        isPermissionGranted: false,
        userLocation: null,
        mapRegion: {},
        selectedLocation: null
    }

    async componentWillMount () {
        this._findUserLocation()
    }

    /**
     *  this._watchId() => Stop following user location
     */
    componentWillUnmount () {
        this._watchId()
    }

    _findUserLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status === 'granted') {
            this._watchId = await Location.watchPositionAsync(
                GEOLOCATION_OPTIONS,
                this._followUserLocation
            )
        }
    }

    /**
     *  TODO: Incase of reload --> calls multiple time! Check!
     *  For 1st time, selectedLocation will be same as userLocation
     *  because we've to show all the people near users current location also.
     */
    _followUserLocation = (location) => {
        let { latitude, longitude } = location.coords
        let { userLocation, selectedLocation } = this.state

        // If users' location doesn't change, simply return
        if (
            userLocation &&
            userLocation.latitude === latitude &&
            userLocation.longitude === longitude
        ) {
            return
        }

        this.props
            .updateUserLocation({ email: '12@12.com', longitude, latitude })
            .then((response) => {
                let { latitude, longitude } = response.data.updateUserLocation.location
                let userLocation = { latitude, longitude }
                let mapRegion = this.constructMapRegion(latitude, longitude)
                this.setState({
                    userLocation,
                    mapRegion,
                    isPermissionGranted: true,
                    selectedLocation: selectedLocation || userLocation
                })
            })
            .catch((e) => console.log('ERRORR in [[updateUserLocation]]: ', e))
    }

    constructMapRegion = (latitude, longitude) => {
        return new MapView.AnimatedRegion({
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }

    onLocationChange = (data, details) => {
        let { description } = data
        let { geometry: { location: { lat, lng } } } = details

        let selectedLocation = { latitude: lat, longitude: lng }
        let mapRegion = this.constructMapRegion(lat, lng)
        this.setState({ selectedLocation, mapRegion })
    }

    render () {
        let { userLocation, mapRegion, selectedLocation } = this.state
        if (!userLocation) return null

        return (
            <View style={{ flex: 1 }}>
                <MapComponent
                    selectedLocation={selectedLocation}
                    userLocation={userLocation}
                    mapRegion={mapRegion}
                />
                <LocationSearch onLocationSelect={this.onLocationChange} />
            </View>
        )
    }
}

const updateUserLocationConfig = {
    props: ({ ownProps, mutate }) => ({
        updateUserLocation: ({ email, latitude, longitude }) =>
            mutate({ variables: { email, latitude, longitude } })
    })
}

const updateUserLocation = gql`
    mutation updateUserLocation($email: String!, $latitude: Float!, $longitude: Float!) {
        updateUserLocation(email: $email, latitude: $latitude, longitude: $longitude) {
            id
            email
            location {
                latitude
                longitude
            }
        }
    }
`

export default graphql(updateUserLocation, updateUserLocationConfig)(MapWrapper)
