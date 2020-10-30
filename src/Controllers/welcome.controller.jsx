import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import useGlobal from '../Store'
// import { language } from '../../Languages'
import WelcomeScreen from '../Screens/welcome.screen'
import * as Routes from '../Navigator/routes'

const Welcome = () => {
  const [state, actions] = useGlobal()
  // const { dialog } = state.content
  const navigation = useNavigation()
  const { navigate, popToTop } = navigation
  // const { button } = language

  const login = () => navigate(Routes.SelfieCapture)  

  const handlers = { login }

  return <WelcomeScreen handlers={handlers} />
}

Welcome.navigationOptions = {
  header: null
}

export default Welcome
