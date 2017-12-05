import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Permissions, Location, MapView } from 'expo'
import { MAP_STYLE_SILVER } from 'espy/configs/map-config'
import LocationSearch from 'espy/components/location-search'
import MapComponent from 'espy/components/map'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

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
        userLocation: {},
        mapRegion: {},
        selectedLocation: {}
    }

    async componentWillMount () {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status === 'granted') {
            this.watchId = await Location.watchPositionAsync(
                GEOLOCATION_OPTIONS,
                this._findUserLocation
            )
        }
    }

    constructMapRegion = (latitude, longitude) => {
        return new MapView.AnimatedRegion({
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }

    _findUserLocation = (location) => {
        let { latitude, longitude } = location.coords
        let { userLocation } = this.state

        // TODO: Incase of reload --> calls multiple time!
        // If users' location doesn't change, simply return
        if (userLocation.latitude === latitude && userLocation.longitude === longitude) return

        this.props
            .storePersonLocation({ id: 'User', longitude, latitude })
            .then((response) => {
                let { latitude, longitude } = response.data.addPersonLocation
                let userLocation = { latitude, longitude }
                let mapRegion = this.constructMapRegion(latitude, longitude)
                this.setState({ userLocation, mapRegion, selectedLocation: userLocation })
            })
            .catch((e) => console.log('ERRORR in [ADDPERSONLOCATION]: ', e))
    }

    handleMapRegionChange = (mapRegion) => {
        this.setState({ mapRegion })
    }

    onLocationChange = (selectedLocation) => {
        let { latitude, longitude } = selectedLocation
        let mapRegion = this.constructMapRegion(latitude, longitude)
        this.setState({ selectedLocation, mapRegion })
    }

    render () {
        let { userLocation, mapRegion, selectedLocation } = this.state
        if (!userLocation.latitude) return null

        return (
            <MapComponent
                selectedLocation={selectedLocation}
                userLocation={userLocation}
                mapRegion={mapRegion}
                onRegionChangeComplete={this.handleMapRegionChange}
                onLocationChange={this.onLocationChange}
            />
        )
    }
}

const storePersonLocationConfig = {
    props: ({ ownProps, mutate }) => ({
        storePersonLocation: ({ id, latitude, longitude }) =>
            mutate({ variables: { id, latitude, longitude } })
    })
}

const storePersonLocation = gql`
    mutation addPersonLocation($id: ID!, $latitude: Float!, $longitude: Float!) {
        addPersonLocation(id: $id, latitude: $latitude, longitude: $longitude) {
            id
            latitude
            longitude
        }
    }
`

export default compose(graphql(storePersonLocation, storePersonLocationConfig))(MapWrapper)
