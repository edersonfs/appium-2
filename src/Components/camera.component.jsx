import React, { useEffect, useState, useRef } from 'react'
import {
  Dimensions,
  Platform,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import ImageResizer from 'react-native-image-resizer'
import { useIsFocused } from 'react-navigation-hooks'
import { Icon } from '@ui-kitten/components'
import { LocalSpinnerOverlay } from './spinnerOverlay.component'

import { requestAndoroiCameraPermission } from '../Utils/permissionAndroid.util'
import { requestIOSCameraPermission } from '../Utils/permissionIOS.util'

import { language } from '../Languages'
import { color, constant } from '../Styles/common.style'

import CameraIcon from '../Assets/Images/camera.svg'
import CameraDisabledIcon from '../Assets/Images/camera-disabled.svg'
import textStyle from '../Styles/text.style'

const { width, height } = Dimensions.get('window')
const Camera = ({ type, navigateBack, onPictureTaken, onStartCapture }) => {
  const { baseWhite, titleWhite, uppercase } = textStyle
  const { label } = language
  const [canTakePicture, setCanTakePicture] = useState(false)
  const [faces, setFaces] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [processMessage, setProcessMessage] = useState('')
  const camRef = useRef(null)
  const isFocused = useIsFocused()

  useEffect(() => {
    async function checkPermission() {
      const granted = true
      // const granted =
      //   Platform.OS === 'android'
      //     ? await requestAndoroiCameraPermission()
      //     : await requestIOSCameraPermission()

      setCanTakePicture(granted)
    }
    checkPermission()
  }, [])

  const takePicture = async camera => {
    const options = {
      quality: 0.5,
      base64: true,
      fixOrientation: true,
      forceUpOrientation: true,
      pauseAfterCapture: true
      // doNotSave: true
    }
    const rnCapturedImg = await camera.takePictureAsync(options)
    try {
      const { uri, width, height } = rnCapturedImg
      const sizelimit = 800
      const proportion = sizelimit < width ? sizelimit / width : 1
      const quality = 20.0
      const compressFormat = 'JPEG'

      const newWidth = Math.floor(width * proportion)
      const newHeight = Math.floor(height * proportion)

      ImageResizer.createResizedImage(uri, newWidth, newHeight, compressFormat, quality)
        .then(response => {
          let fileName = response.uri
          if (RNFS.exists(fileName)) {
            if (Platform.OS === 'ios') {
              fileName = fileName.replace('file:', '')
            }
            RNFetchBlob.fs.readFile(fileName, 'base64').then(data => {
              onPictureTaken(data)
            })
          } else {
            onPictureTaken(rnCapturedImg.base64)
          }
        })
        .catch(err => {
          console.log(err)
          onPictureTaken(rnCapturedImg.base64)
        })
    } catch (error) {
      onPictureTaken(rnCapturedImg.base64)
    }
  }

  const renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
    <View
      key={faceID}
      transform={[
        { perspective: 600 },
        { rotateZ: `${rollAngle.toFixed(0)}deg` },
        { rotateY: `${yawAngle.toFixed(0)}deg` }
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y
        }
      ]}
    >
      <View style={styles.faceCornerTopLeft} />
      <View style={styles.faceCornerTopRight} />
      <View style={styles.faceCornerBottomLeft} />
      <View style={styles.faceCornerBottomRight} />
    </View>
  )

  const renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {faces.map(renderFace)}
    </View>
  )

  const PermissionDenied = () => (
    <View style={styles.permissionDenied}>
      <Text style={styles.permissionDeniedText}>{label.cameraPermission}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* {disabled ? <LocalSpinnerOverlay /> : null} */}
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <TouchableWithoutFeedback onPress={navigateBack}>
            <Icon name="arrow-back-outline" width={30} height={30} fill={color.WHITE} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.cameraWrapper}>
        {canTakePicture && isFocused ? (
          <RNCamera
            ref={camRef}
            style={styles.camera}
            captureAudio={false}
            type={RNCamera.Constants.Type[type]}
            onFacesDetected={detecedFace => setFaces(detecedFace.faces)}
          >
            {renderFaces()}
          </RNCamera>
        ) : (
          PermissionDenied()
        )}
      </View>
      <View style={styles.cameraButtonsWrapper}>
        <TouchableWithoutFeedback accessible={true} accessibilityLabel="press-button-camera"
          onPress={() => {
            setProcessMessage('Processando...')
            setDisabled(true)
            takePicture(camRef.current)
          }}
          disabled={!canTakePicture || disabled}
        >
          {!canTakePicture || disabled ? (
            // <Text style={[titleWhite, uppercase]}>
            //   {processMessage}
            // </Text>
            <CameraDisabledIcon height={50} width={50} />
          ) : (
            <CameraIcon height={50} width={50} />
          )}
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 0.2,
    backgroundColor: color.GRAY_DARKNESS,
    padding: constant.PADDING * 1.5,
    justifyContent: 'center'
  },
  iconWrapper: {
    marginTop: -(height * 0.09)
    // backgroundColor: 'red'
  },
  cameraWrapper: {
    flex: 1
  },
  permissionDenied: {
    flex: 1,
    backgroundColor: color.BLACK,
    justifyContent: 'center',
    alignItems: 'center'
  },
  permissionDeniedText: {
    color: color.WHITE
  },
  camera: {
    height: '100%',
    width
  },
  cameraButtonsWrapper: {
    flex: 0.2,
    backgroundColor: color.GRAY_DARKNESS,
    justifyContent: 'center',
    alignItems: 'center'
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    height: height * 0.85
  },
  face: {
    height: 100,
    width: 100,
    position: 'relative',
    flexDirection: 'column'
  },
  faceCornerTopLeft: {
    display: 'flex',
    position: 'absolute',
    width: 50,
    height: 50,
    top: 0,
    borderTopWidth: 2,
    borderTopColor: color.PRIMARY,
    left: 0,
    borderLeftWidth: 2,
    borderLeftColor: color.PRIMARY
  },
  faceCornerTopRight: {
    display: 'flex',
    position: 'absolute',
    width: 50,
    height: 50,
    top: 0,
    borderTopWidth: 2,
    borderTopColor: color.PRIMARY,
    right: 0,
    borderRightWidth: 2,
    borderRightColor: color.PRIMARY
  },
  faceCornerBottomLeft: {
    display: 'flex',
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 0,
    borderBottomWidth: 2,
    borderBottomColor: color.PRIMARY,
    left: 0,
    borderLeftWidth: 2,
    borderLeftColor: color.PRIMARY
  },
  faceCornerBottomRight: {
    display: 'flex',
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 0,
    borderBottomWidth: 2,
    borderBottomColor: color.PRIMARY,
    right: 0,
    borderRightWidth: 2,
    borderRightColor: color.PRIMARY
  }
})

export default Camera
