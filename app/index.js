import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Constants, MapView } from 'expo';
import { MAP_STYLE_SILVER } from './configs/map-config'

export default class Espy extends React.Component {
  state = {
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

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={MAP_STYLE_SILVER}
          style={styles.map}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}>
          <MapView.Marker coordinate={{ latitude: 18.9256, longitude: 72.8242 }}>
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
