import { Location } from "expo"

export const toggleFollow = () => {
  return {type: "TOGGLE_USER_FOLLOW"}
}

export const getUserLocation = () => {
  return async dispatch => {
    let resp = await Expo.Location.getCurrentPositionAsync({enableHighAccuracy: true})
    console.log(resp)
    dispatch({type: "SET_USER_LOCATION", payload: {
      latitude: resp.coords.latitude,
      longitude: resp.coords.longitude,
    }})
  }
}

export const setUserLocation = (resp) => {
  console.log(resp)
  return {type: "SET_USER_LOCATION", payload: {
      latitude: resp.coords.latitude,
      longitude: resp.coords.longitude,
    }
  }
}
