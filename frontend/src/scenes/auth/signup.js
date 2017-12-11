import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'

export default class Login extends Component {
    componentDidMount () {}

    onPress = (e) => {
        const { navigation: { navigate } } = this.props
        navigate('Map')
    }

    onChangeText = (e) => {
        console.log('onChangeText : ', e)
    }

    render () {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <TextInput
                        autoFocus
                        clearButtonMode={'unless-editing'}
                        autoCorrect={false}
                        style={styles.inputBox}
                        onChangeText={this.onChangeText}
                        placeholder={'Name'}
                        placeholderTextColor={'rgb(126, 137, 155)'}
                    />
                    <TextInput
                        autoCapitalize={'none'}
                        clearButtonMode={'unless-editing'}
                        autoCorrect={false}
                        style={styles.inputBox}
                        onChangeText={this.onChangeText}
                        placeholder={'Username'}
                        placeholderTextColor={'rgb(126, 137, 155)'}
                    />
                    <TextInput
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        clearButtonMode={'unless-editing'}
                        autoCorrect={false}
                        style={styles.inputBox}
                        onChangeText={this.onChangeText}
                        placeholder={'Email'}
                        placeholderTextColor={'rgb(126, 137, 155)'}
                    />
                    <TextInput
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        clearButtonMode={'unless-editing'}
                        secureTextEntry
                        style={styles.inputBox}
                        onChangeText={this.onChangeText}
                        placeholder={'Password'}
                        placeholderTextColor={'rgb(126, 137, 155)'}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPress}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    inputBox: {
        height: 40,
        width: '60%',
        paddingHorizontal: 10,
        borderBottomColor: 'rgb(230, 237, 244)',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10
    }
})
