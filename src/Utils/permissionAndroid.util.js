import { PermissionsAndroid } from 'react-native'

export async function requestAndoroiCameraPermission() {
  try {
		const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS['CAMERA'])
		return granted === PermissionsAndroid.RESULTS.GRANTED
  } catch (error) {
    	console.warn(error)
		return false;
  }
}

export default null
