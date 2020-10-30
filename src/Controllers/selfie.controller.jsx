import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import useGlobal from '../Store'
import { language } from '../Languages'
import SelfieScreen from '../Screens/selfie.screen'
import * as Routes from  '../Navigator/routes'

const Selfie = () => {
  const [state, actions] = useGlobal()
  // const { dialog } = state.content
  const { navigate, goBack } = useNavigation()
  // const { button } = language

  const confirmExit = () => {
    // actions.setDialog(
    //   { ...dialog.authentication, labelCancel: button.cancel, labelConfirm: button.confirm },
    //   null,
    //   () => {
    //     actions.updateUser('document', '')
    //     navigate(Routes.Home)
    //   }
    // )
    goBack()
    return true
  }

  const navigateBack = () => goBack()

  const onPictureTaken = photo => {
    // const selfieImage = `data:image/jpeg;base64,${photo}`
    const selfieImage = photo
    actions.selfie(navigate, selfieImage)
  }

  const handlers = { confirmExit, navigateBack, onPictureTaken }
  return <SelfieScreen handlers={handlers} />
}

Selfie.navigationOptions = {
  header: null
}

export default Selfie
