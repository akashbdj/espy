import React from 'react'
import { View, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const AUTOCOMPLETE_STYLES = {
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
    powered: { display: 'none' }
}

export default (props) => {
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                styles={AUTOCOMPLETE_STYLES}
                minLength={2}
                returnKeyType={'search'}
                enablePoweredByContainer={false}
                fetchDetails={true}
                renderDescription={(row) => row.description}
                onPress={props.onLocationSelect}
                query={{ key: '', language: 'en' }}
                nearbyPlacesAPI='GooglePlacesSearch'
                GooglePlacesSearchQuery={{ rankby: 'distance', types: 'food' }}
                debounce={200}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 2000,
        top: 20,
        left: 10,
        right: 10
    }
})
