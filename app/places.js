import React from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 18.9256, lng: 72.8242 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 18.9256, lng: 72.8242 } } };

const GooglePlacesInput = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed='auto'
            fetchDetails={true}
            renderDescription={(row) => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log("data ------ ", data);
                console.log("details -----------", details);
            }}
            getDefaultValue={() => {
                return ''; // text input default value
            }}
            query={{
                key: '',
                language: 'en'
            }}
            styles={{
                zIndex: 100,
                textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                },
                textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16
                },
                predefinedPlacesDescription: {
                    color: '#1faadb'
                },
            }}

            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food'
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            predefinedPlaces={[homePlace, workPlace]}

            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            renderRightButton={() => <Text>Custom text after the inputg</Text>}
        />
    );
}

export default GooglePlacesInput