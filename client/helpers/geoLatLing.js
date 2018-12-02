import { AsyncStorage, Alert } from 'react-native'

// Helper function to convert geoJson > lat ling object
// and vise versa

export const toLatLing = geojson => {
  return {latitude: geojson.coordinates[1], longitude: geojson.coordinates[0]}
}

export const toGeoJson = latling => {
  return {
    'type': 'Point',
    'coordinates': [latling['longitude'], latling['latitude']]
  }
}
