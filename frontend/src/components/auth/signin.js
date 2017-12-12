import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard
} from 'react-native'

export default class Login extends Component {
    componentDidMount () {}

    onSubmit = (e) => {
        const { navigation: { navigate } } = this.props
        navigate('Map')
    }

    onSignUpClick = (e) => {
        const { navigation: { navigate } } = this.props
        navigate('SignUp')
    }

    onChangeText = (e) => {
        console.log('onChangeText : ', e)
    }

    render () {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
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
                    <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                        <Text style={styles.login}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={{ color: 'rgb(126, 137, 155)' }}>Don't have an account? </Text>
                        <TouchableOpacity onPress={this.onSignUpClick}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
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
        marginBottom: 15
    },
    button: {
        alignItems: 'center',
        padding: 10,
        marginBottom: 5
    },
    registerContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    register: {}
})
