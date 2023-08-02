module.exports = class UserDto {
    email;
    name;
    room;
    id;
    login;
    isActivated;
    typingStatus

    constructor(model) {
        this.email = model.email;
        this.name = model.login;
        this.room = 'test'
        this.id = model._id;
        this.login = model.login;
        this.typingStatus = false;
        this.isActivated = model.isActivated
    }
}