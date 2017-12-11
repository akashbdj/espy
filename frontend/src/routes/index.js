import { StackNavigator } from 'react-navigation'

import SignUp from 'espy/scenes/auth/signup'
import Login from 'espy/scenes/auth/login'
import MapWrapper from 'espy/components/map-wrapper'

const RootNavigator = StackNavigator({
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },
    Map: {
        screen: MapWrapper
    }
})

export default RootNavigator
