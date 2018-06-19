import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import { MapView } from 'expo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { MAP_STYLE_SILVER } from 'espy/configs/map-type'

class Map extends Component {
    renderLoader = () => {
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator size='large' color='#00baff' />
            </View>
        )
    }

    renderNearPeopleMarker = () => {
        const { peopleNearLocation } = this.props
        return peopleNearLocation.map((person, index) => (
            <MapView.Marker
                key={index}
                coordinate={{
                    latitude: person.latitude,
                    longitude: person.longitude
                }}
                title={person.id}
                description={'Hahaha Markers everywhere!'}
            />
        ))
    }

    renderUserLocationMarker = () => {
        const { userLocation } = this.props
        return (
            <MapView.Marker coordinate={userLocation}>
                <View style={styles.radius}>
                    <View style={styles.marker} />
                </View>
            </MapView.Marker>
        )
    }

    render () {
        const { mapRegion, nearLocationError, nearLocationLoading } = this.props

        if (nearLocationLoading) {
            return this.renderLoader()
        }

        return (
            <MapView.Animated
                ref={(map) => (this.mapComp = map)}
                style={{ flex: 1, zIndex: -1 }}
                provider={MapView.PROVIDER_GOOGLE}
                customMapStyle={MAP_STYLE_SILVER}
                region={mapRegion}
                onRegionChangeComplete={() => {
                    /* TODO: Check if even needed */
                }}
                showsUserLocation
                followsUserLocation
                showsMyLocationButton
                showsScale
                showsCompass
                showsPointsOfInterest
                showsTraffic
                zoomEnabled
                loadingEnabled
            >
                {this.renderNearPeopleMarker()}
                {this.renderUserLocationMarker()}
            </MapView.Animated>
        )
    }
}

const styles = StyleSheet.create({
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'rgba(128,128,128, 0.2)',
        borderWidth: 1,
        borderColor: 'rgb(128,128,128)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: '#007FAA'
    }
})

/*
    GraphQL query specific code starts here
    Fetches all the people near selectedLocation
 */
const getPeopleNearLocationConfig = {
    options: ({ selectedLocation: { latitude, longitude } }) => ({
        variables: { longitude, latitude }
    }),
    props: ({ ownProps, data: { error, loading, getPeopleNearLocation = [] } }) => {
        let peopleNearLocation = getPeopleNearLocation.map(
            ({ location: { latitude, longitude }, id }) => ({ latitude, longitude, id })
        )

        return {
            nearLocationError: error,
            nearLocationLoading: loading,
            peopleNearLocation
        }
    }
}

const getPeopleNearLocation = gql`
    query getPeopleNearLocation($longitude: Float!, $latitude: Float!) {
        getPeopleNearLocation(longitude: $longitude, latitude: $latitude) {
            id
            location {
                latitude
                longitude
            }
        }
    }
`

export default graphql(getPeopleNearLocation, getPeopleNearLocationConfig)(Map)
