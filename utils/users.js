class UsersDB {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users = [...this.users, user];
  }

  getUser(id) {
    return this.users.find((user) => user.id === id);
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
