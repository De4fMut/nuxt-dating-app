const UserModel = require("../server/models/user-model");
const RoomModel = require("../server/models/room-model");

class UsersDB {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users = [...this.users, user];
  }

  async getUser(userId) {
    const user = await UserModel.findOne({ _id: userId });
    return user;
  }

  async getRoom(roomId) {
    const room = await RoomModel.findOne({ _id: roomId });
    return room;
  }

  getUsersByRoom(room) {
    return this.users.filter((user) => user.room === room);
  }

  removeUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  setTypingStatus(id, typingStatus) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index].typingStatus = typingStatus;
    // console.log(id)
    // console.log(typingStatus)
    // console.log(this.users)
  }
}

module.exports = () => {
  return new UsersDB();
};
