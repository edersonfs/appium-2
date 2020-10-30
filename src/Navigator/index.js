import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Welcome from '../Controllers/welcome.controller'
import Selfie from '../Controllers/selfie.controller'

import * as Routes from './routes'

const UserFirstAccessStack = createStackNavigator({
  // DEBUG - Start
  // [`${Routes.Signature}`]: {
  //   screen: Signature,
  //   navigationOptions: {
  //     gesturesEnabled: false
  //   }
  // },
  // Debug - End
  [`${Routes.Welcome}`]: {
    screen: Welcome,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  [`${Routes.SelfieCapture}`]: {
    screen: Selfie,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
})

const AppNavigator = createSwitchNavigator(
  {
    [`${Routes.UserFirstAccessStack}`]: {
      screen: UserFirstAccessStack
    }
  },
  {
    initialRouteName: Routes.UserFirstAccessStack
    // DEBUG - Start
    // initialRouteName: Routes.AuthenticatedAreaStack
    // DEBUG - End
  }
)

export default createAppContainer(AppNavigator)
