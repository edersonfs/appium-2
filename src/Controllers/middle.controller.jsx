import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import useGlobal from '../Store'
// import { language } from '../../Languages'
import MiddleScreen from '../Screens/middle.screen'
import * as Routes from '../Navigator/routes'

const Middle = () => {
  const [state, actions] = useGlobal()
  // const { dialog } = state.content
  const navigation = useNavigation()
  const { navigate, popToTop } = navigation
  // const { button } = language

  const login = () => navigate(Routes.SelfieCapture)  

  const handlers = { login }

  return <MiddleScreen handlers={handlers} />
}

Middle.navigationOptions = {
  header: null
}

export default Middle
