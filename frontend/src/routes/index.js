import { StackNavigator } from 'react-navigation'

import SignUp from 'espy/components/auth/signup'
import SignIn from 'espy/components/auth/signin'
import MapWrapper from 'espy/components/map/map-wrapper'

const RootNavigator = StackNavigator({
    Login: {
        screen: SignIn
    },
    SignUp: {
        screen: SignUp
    },
    Map: {
        screen: MapWrapper
    }
})

export default RootNavigator
