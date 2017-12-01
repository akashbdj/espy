import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { ApolloProvider, graphql } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

import Map from 'espy/components/map'

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://ae652a9b.ngrok.io/graphql',
        opts: {
            credentials: 'same-origin',
            mode: 'no-cors'
        }
    }),
    cache: new InMemoryCache()
})

export default (props) => {
    return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
                <Map />
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
