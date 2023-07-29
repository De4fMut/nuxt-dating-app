module.exports = class UserDto {
    email;
    id;
    login;
    isActivated;
    typingStatus

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.login = model.login;
        this.typingStatus = false;
        this.isActivated = model.isActivated
    }
}