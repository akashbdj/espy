import { StackNavigator } from 'react-navigation'

import Login from 'espy/scenes/auth/login'
import MapWrapper from 'espy/components/map-wrapper'

const RootNavigator = StackNavigator({
    Login: {
        screen: Login
    },
    Map: {
        screen: MapWrapper
    }
})

export default RootNavigator
