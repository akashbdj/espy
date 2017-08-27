import React from 'react'
import { StackNavigator } from 'react-navigation'

import LocationSearch from '../components/location-search'
import Map from '../components/map'

export const HomeStack = StackNavigator({
    Search: { screen: LocationSearch },
    Map: { screen: Map }
})
