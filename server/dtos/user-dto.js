module.exports = class UserDto {
  email;
  name;
  room;
  id;
  login;
  isActivated;
  typingStatus;
  ava;
  photos;

  constructor(model) {
    this.email = model.user.email;
    this.name = model.user.name;
    this.room = "test";
    this.id = model.user._id;
    this.login = model.user.login;
    this.typingStatus = false;
    this.isActivated = model.user.isActivated;
    this.ava = `@/static/users/${model.user.login}/0.jpg`;
    this.photos = `@/static/users/${model.user.login}`;
  }
};
