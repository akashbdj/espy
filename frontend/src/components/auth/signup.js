import React, { Component } from 'react'
import { SecureStore } from 'expo'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Promise } from 'core-js'

class Register extends Component {
    constructor (props) {
        super(props)
        this.state = { name: '', username: '', email: '', password: '' }
    }

    onPress = async () => {
        const { name, email, username, password } = this.state
        const { registerMutation, navigation: { navigate } } = this.props

        const response = await registerMutation({ name, email, password })
        const { accessToken, refreshToken } = response.data.register

        Promise.all([
            SecureStore.setItemAsync('accessToken', accessToken),
            SecureStore.setItemAsync('refreshToken', refreshToken)
        ])
            .then((response) => console.log('TOKENS saved in SecureStore'))
            .catch((e) => console.log('Couldnt save TOKENS in SecureStore', e))
    }

    onCredentialChange = (type, text) => {
        this.setState({ [type]: text })
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
                        onChangeText={(text) => this.onCredentialChange('name', text)}
                        placeholder={'Name'}
                        placeholderTextColor={'rgb(126, 137, 155)'}
                    />
                    <TextInput
                        autoCapitalize={'none'}
                        clearButtonMode={'unless-editing'}
                        autoCorrect={false}
                        style={styles.inputBox}
                        onChangeText={(text) => this.onCredentialChange('username', text)}
                        placeholder={'Username'}
                        placeholderTextColor={'rgb(126, 137, 155)'}
                    />
                    <TextInput
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        clearButtonMode={'unless-editing'}
                        autoCorrect={false}
                        style={styles.inputBox}
                        onChangeText={(text) => this.onCredentialChange('email', text)}
                        placeholder={'Email'}
                        placeholderTextColor={'rgb(126, 137, 155)'}
                    />
                    <TextInput
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        clearButtonMode={'unless-editing'}
                        secureTextEntry
                        style={styles.inputBox}
                        onChangeText={(text) => this.onCredentialChange('password', text)}
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

const registerMutationConfig = {
    props: ({ ownProps, mutate }) => ({
        registerMutation: ({ name, email, password }) =>
            mutate({ variables: { name, email, password } })
    })
}

const registerMutation = gql`
    mutation register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            id
            accessToken
            refreshToken
        }
    }
`

export default graphql(registerMutation, registerMutationConfig)(Register)
