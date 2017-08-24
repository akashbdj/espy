import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Permissions, Location, Constants, MapView } from 'expo';
import { MAP_STYLE_SILVER } from './configs/map-config'

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class Espy extends React.Component {
  
  state = {
    location: { coords: { latitude: 18.9256, longitude: 72.8242 } },
    mapRegion: {
      latitude: 18.9256,
      longitude: 72.8242,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }

  _handleMapRegionChange = (mapRegion) => {
    this.setState({ mapRegion })
  }

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  locationChanged = (location) => {
    let mapRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    }
    this.setState({ location, mapRegion })
  }

  render () {
    let { latitude, longitude } = this.state.location.coords

    return (
      <View style={styles.container}>
        <MapView
          showsMyLocationButton={true}
          showsPointsOfInterest={true}
          showsScale={true}
          toolbarEnabled={true}
          legalLabelInsets={{ top: 0, bottom: 0, right: 0, left: 0 }}
          showsUserLocation={true}
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={MAP_STYLE_SILVER}
          style={styles.map}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}>
          <MapView.Marker coordinate={{ latitude, longitude }}>
              <View style={styles.radius}>
                <View style={styles.marker} />
              </View>
            </MapView.Marker>
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    backgroundColor: 'rgba(128,128,128, 0.2)',
    borderWidth: 1,
    borderColor: 'rgb(128,128,128)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker : {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007FAA',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});




// componentDidMount() {
//   this._getLocationAsync()
// }

// _getLocationAsync = async () => {
//   let { status } = await Permissions.askAsync(Permissions.LOCATION)
//   if (status !== 'granted') {
//     this.setState({ location: null }) // TODO: handle this
//   }

//   let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })

//   // Improve this code.
//   let mapRegion = {
//     ...this.state.mapRegion,
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//   }
//   this.setState({ location, mapRegion })
// }