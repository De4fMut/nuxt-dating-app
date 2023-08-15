const CommunityModel = require("../models/community-model");
const ProfileModel = require("../models/profile-model");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ProfileDto = require("../dtos/profile-dto");
const ApiError = require("../exceptions/api-error");

class CommunityService {
  async createCommunity(id, name, theme) {
    const candidate = await CommunityModel.findOne({ name });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${name} уже существует`
      );
    }

    const com = await CommunityModel.create({
      id,
      name,
      theme
    });

    // const userDto = new UserDto({ user, name });
    // const tokens = tokenService.generateTokens({ ...userDto });
    // await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      com
    };
  }

  async logout(refreshToken) {
    // const token = await tokenService.removeToken(refreshToken);
    // return token;
  }

  async getCom(accessToken) {
    // const userData = tokenService.validateAccessToken(accessToken);
    // const user = await UserModel.findOne({ _id: userData.id });
    // const profile = await ProfileModel.findOne({ user: user.id });

    // const userDto = new UserDto({ user, name: user.name });
    // return userDto;
  }

  async getAllComs() {
    const coms = await CommunityModel.find();
    return coms;
  }
}

module.exports = new CommunityService();
