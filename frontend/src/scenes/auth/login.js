import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default class Login extends Component {
    componentDidMount () {}

    onPress = (e) => {
        const { navigation: { navigate } } = this.props
        navigate('Map')
    }

    render () {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.onPress}>
                    <Text>Touch Here</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    }
})
