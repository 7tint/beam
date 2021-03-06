import * as fs from 'fs';

export const CreateFriend = async (friend) => {
  fs.readFile('../json/friends.json', 'utf8', function readFileCallback(err, data) {
    if (err){
      console.log(err);
    } else {
      const allFriends = JSON.parse(data);

      const newFriend = {
        name: friend.name,
        basicInfo: friend.basicInfo,
        likes: friend.likes,
        inputString: friend.inputString
      };

      allFriends.push(newFriend);
      const jsonData = JSON.stringify(allFriends);

      fs.writeFile('../json/friends.json', jsonData, 'utf8', callback);
    }
  });
}

export const ReadFriends = async (friend) => {
  fs.readFile('../json/friends.json', 'utf8', function readFileCallback(err, data) {
    if (err){
      console.log(err);
    } else {
      const allFriends = JSON.parse(data);
      return allFriends;
    }
  });
}
