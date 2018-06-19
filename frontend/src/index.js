import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { SecureStore } from 'expo'

import { ApolloProvider, graphql } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

import MapWrapper from 'espy/components/map/map-wrapper'
import RootNavigator from 'espy/routes'

const httpLink = new HttpLink({ uri: 'http://4bc01b9d.ngrok.io/graphql' })
const authLink = setContext(async (_, { headers }) => {
    const accessToken = await SecureStore.getItemAsync('accessToken')
    const refreshToken = await SecureStore.getItemAsync('refreshToken')

    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
            'x-refresh-token': refreshToken || ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default (props) => {
    return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
                <RootNavigator />
            </View>
        </ApolloProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
