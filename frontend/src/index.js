import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Map from 'espy/components/map'

export default (props) => {
    return (
        <View style={styles.container}>
            <Map />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
