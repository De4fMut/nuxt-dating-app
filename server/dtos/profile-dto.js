module.exports = class ProfileDto {

  gender;
  targetGender;
  purpose;
  targetHeight;
  targetWeight;
  name;
  birthDay;

  constructor(model) {
    // this.userId = model.userId;
    this.gender = model.gender;
    this.targetGender = model.targetGender;
    this.purpose = model.purpose;
    this.targetHeight = model.targetHeight;
    this.targetWeight = model.targetWeight;
    this.name = model.name;
    this.birthDay = model.birthDay;
  }
};
