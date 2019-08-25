import { AsyncStorage } from 'react-native'

const get = async item => {
  try {
    const response = await AsyncStorage.getItem(item)
    return JSON.parse(response)
  } catch (error) {
    console.log('Error getting data: ', error)
  }
}

const set = async (adress, item) => {
  try {
    await AsyncStorage.setItem(adress, JSON.stringify(item))
    return
  } catch (error) {
    console.log('Error saving data: ', error)
  }
}

export default {
  get,
  set
}
