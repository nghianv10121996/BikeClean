import AsyncStorage from '@react-native-async-storage/async-storage';


const save = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.error("can't set local storage")
  }
}

const get = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error("can't get local storage")
  }
}

export {
  save,
  get
}