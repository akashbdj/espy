import React, { Component } from 'react'
import { SecureStore } from 'expo'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard
} from 'react-native'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Promise } from 'core-js'

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: null
    }

    onSubmit = async () => {
        const { loginMutation, navigation: { navigate } } = this.props

        const response = await loginMutation(this.state)
        const { accessToken, refreshToken, success, error } = response.data.login

        if (!success) {
            this.setState({ error })
            return
        }

        Promise.all([
            SecureStore.setItemAsync('accessToken', accessToken),
            SecureStore.setItemAsync('refreshToken', refreshToken)
        ])
            .then((response) => {
                console.log('TOKENS saved in SecureStore')
                navigate('Map')
            })
            .catch((e) => console.log('Couldnt save TOKENS in SecureStore', e))
    }

    onSignUpClick = (e) => {
        const { navigation: { navigate } } = this.props
        navigate('SignUp')
    }

    onCredentialChange = (type, text) => {
        this.setState({ [type]: text })
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
                    <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                        <Text style={styles.login}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={{ color: 'rgb(126, 137, 155)' }}>
                            {"Don't have an account? "}
                        </Text>
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

const loginMutationConfig = {
    props: ({ ownProps, mutate }) => ({
        loginMutation: ({ email, password }) => mutate({ variables: { email, password } })
    })
}

const loginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            success
            error
            accessToken
            refreshToken
            user {
                id
                name
                email
            }
        }
    }
`

export default graphql(loginMutation, loginMutationConfig)(Login)
