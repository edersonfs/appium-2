import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import useGlobal from '../Store'
// import { language } from '../../Languages'
import EndScreen from '../Screens/end.screen'
import * as Routes from '../Navigator/routes'

const End = () => {
  const [state, actions] = useGlobal()
  // const { dialog } = state.content
  const navigation = useNavigation()
  const { navigate, popToTop } = navigation
  // const { button } = language

  const login = () => navigate(Routes.Welcome)  

  const handlers = { login }

  return <EndScreen handlers={handlers} />
}

End.navigationOptions = {
  header: null
}

export default End
