const WishModel = require("../models/wish-model");
const UserModel = require("../models/user-model");
const ApiError = require("../exceptions/api-error");

class WishService {
  async createWish(userid, text) {
   
      const user = await UserModel.findOne({_id: userid})
      const wish = await WishModel.create({ user, wish: text});
      return wish;
  }

  async getWish(user, wishid) {
    const wish = await WishModel.findOne($and[{user}, {_id: wishid}])
    if (!wish) {
      throw ApiError.BadRequest(`Такого желания нет ${wish}`);
    }

    return wish;
  }

  async getWishes(user) {
    const wishes = await WishModel.find({user})
    if (!wish) {
      throw ApiError.BadRequest(`Желаний у пользователя ${user} нет `);
    }

    return wishes;
  }

  async doWish(wishid, wizard) {
    const wish = await WishModel.findOne({ _id: wishid });
    if (!wish) {
      throw ApiError.BadRequest(`Желание не существует ${wish}`);
    }
    wish.isActive = true;
    wish.wizard = wizard
    await wish.save()
    return "Желание выполнено"
  }
}

module.exports = new WishService();
