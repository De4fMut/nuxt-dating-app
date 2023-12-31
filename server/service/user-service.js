const UserModel = require("../models/user-model");
const ProfileModel = require("../models/profile-model");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const FileService = require('../service/file-service');
const FileModel = require("../models/file-model");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ProfileDto = require('../dtos/profile-dto')
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(
    login,
    email,
    password,
    gender,
    targetGender,
    purpose,
    targetHeight,
    targetWeight,
    name,
    birthDay
  ) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const usLogin = await UserModel.findOne({ login });
    if (usLogin) {
      throw ApiError.BadRequest(
        `Пользователь с никнэймом ${login} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      login,
      email,
      name,
      password: hashPassword,
      // activationLink,
    });

    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate${activationLink}`
    // );

    await FileService.createDir(new FileModel({user: user.id, name: ''}))
    const userDto = new UserDto({user, name});
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    // const profile = await ProfileModel.findOne({ user: userDto.id });
   
    // if (profile) {
    //   profile = {
    //     user: userDto.id,
    //     gender,
    //     targetGender,
    //     purpose,
    //     targetHeight,
    //     targetWeight,
    //     name,
    //     birthDay,
    //   };
    //   return profile.save();
    // }
    
    const profile = await ProfileModel.create({
      user: userDto.id,
      gender,
      targetGender,
      purpose,
      targetHeight,
      targetWeight,
      // name,
      birthDay,
    });
    const profileDto = new ProfileDto(profile);

    // В СЕРВИСАХ МОЖНО ПЕРЕПИСАТЬ НА Object.keys

    return {
      ...tokens,
      user: userDto,
      profileData: profileDto,
    };
  }

  // async activate(activationLink) {
  //   const user = await UserModel.findOne({ activationLink });
  //   if (!user) {
  //     throw ApiError.BadRequest("Неккоректная ссылка активации");
  //   }
  //   user.isActivated = true;
  //   await user.save();
  // }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с таким ${email} не был найден`);
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const profile = await ProfileModel.findOne({user: user.id})
 
    const userDto = new UserDto({user, name: user.name});
    console.log(userDto)
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

   
   const profileDto = new ProfileDto(profile);

    return {
      ...tokens,
      user: userDto,
      profileData: profileDto
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const profile = await ProfileModel.findOne({user: user.id})
 
    const userDto = new UserDto({user, name: user.name});
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getUser(accessToken) {
    const userData = tokenService.validateAccessToken(accessToken)
    const user = await UserModel.findOne({_id: userData.id});
    const profile = await ProfileModel.findOne({user: user.id})
 
    const userDto = new UserDto({user, name: user.name});
    return userDto;
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
