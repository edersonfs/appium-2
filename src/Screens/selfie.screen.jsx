import React, { useEffect } from 'react'
import { BackHandler, View } from 'react-native'

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
    // <View accessible={true} accessibilityLabel="camera-message">
      <Camera
        type="front"
        navigateBack={handlers.navigateBack}
        onPictureTaken={handlers.onPictureTaken}
      />
    // </View>
  )
}

export default SelfieScreen
