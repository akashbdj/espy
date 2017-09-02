import React from 'react'
import { StackNavigator } from 'react-navigation'

import LocationSearch from 'espy/components/location-search'
import Map from 'espy/components/map'

export const HomeStack = StackNavigator({
    Search: { screen: LocationSearch },
    Map: { screen: Map }
})
