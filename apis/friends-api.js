import AsyncStorage from '@react-native-async-storage/async-storage';

export const CreateFriend = async (friend) => {
  try {
    await AsyncStorage.setItem(
      friend.lastName,
      JSON.stringify(friend)
    );
    console.log("Stored " + friend);
  } catch (error) {
    console.log(error);
  }
}

export const ReadFriend = async (friend) => {
  try {
    const value = await AsyncStorage.getItem(friend.lastName);
    if (value !== null) {
      console.log(value);
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
      if (i > 0) {
        returnData.push(JSON.parse(entry[i]));
      }
    });

    console.log(returnData);
    return returnData;
  } catch (error) {
    console.error(error)
  }
}

export const ClearData = async() => {
  AsyncStorage.clear();
}
