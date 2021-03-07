import AsyncStorage from '@react-native-async-storage/async-storage';

export const CreateFriend = async (friend) => {
  try {
    await AsyncStorage.setItem(
      friend.name,
      JSON.stringify(friend)
    );
    console.log("Stored " + friend);
  } catch (error) {
    console.log(error);
  }
}

export const ReadFriend = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      let returnJSON = JSON.parse(value)
      // console.log(returnJSON);
      return returnJSON;
    }
  } catch (error) {
    console.log(error);
  }
}

export const GetAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    const returnData = new Array;

    result.forEach(function(entry, i) {
      if (entry[0] != "EXPO_CONSTANTS_INSTALLATION_ID") {
        returnData.push(JSON.parse(entry[1]));
      }
    });
    // console.log(returnData);
    return returnData;
  } catch (error) {
    console.error(error)
  }
}

export const ClearData = async() => {
  AsyncStorage.clear();
}
