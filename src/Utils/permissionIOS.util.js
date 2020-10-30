import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions'

export const requestIOSCameraPermission = async () => {
	try {
		const res = await check(PERMISSIONS.IOS.CAMERA)

		if (res === RESULTS.GRANTED) {
			return true;
		} else if (res === RESULTS.DENIED) {
			const res2 = await request(PERMISSIONS.IOS.CAMERA)
			return res2 === RESULTS.GRANTED
		}
	} catch (error) {
		console.warn(error)
		return false;
	}
 }  

export default null
