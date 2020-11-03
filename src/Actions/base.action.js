import * as Routes from '../Navigator/routes'

export const selfie = async (store, navigate, value) => {
  try {
    // console.log(value)
    navigate(Routes.End)
  } catch (err) {
    console.log(err)
  }
}

export default null