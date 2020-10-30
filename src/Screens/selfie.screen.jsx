import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'

import Camera from '../Components/camera.component'

const SelfieScreen = ({ handlers }) => {
  useEffect(() => {
    const backAction = () => {
      handlers.confirmExit()
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPressSelfie', backAction)
    return () => backHandler.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Camera
      type="front"
      navigateBack={handlers.navigateBack}
      onPictureTaken={handlers.onPictureTaken}
    />
  )
}

export default SelfieScreen
