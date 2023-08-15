const RoomModel = require("../models/room-model");
const ApiError = require("../exceptions/api-error");

class RoomService {
  async createRoom(user1Id, user2Id) {
    const roomValid = await RoomModel.findOne({
      $or: [
        { $and: [{ user1: user1Id }, { user2: user2Id }] },
        { $and: [{ user1: user2Id }, { user2: user1Id }] },
      ],
    });

    if (roomValid) {
      return roomValid._id;
    } if (roomValid === []) {
      const user = await UserModel.findOne({_id: user2Id})
      const room = await RoomModel.create({ user1: user1Id, user2: user2Id, name: user.name, ava: user.avatar });
      return room._id;
    }
  }

  async getRoom(user1Id, user2Id) {
    const room = await RoomModel.findOne({
      $or: [
        { $and: [{ user1: user1Id }, { user2: user2Id }] },
        { $and: [{ user1: user2Id }, { user2: user1Id }] },
      ],
    });
    if (!room) {
      throw ApiError.BadRequest(`Комната не существует ${room._id}`);
    }

    return room._id;
  }

  async getRooms(user1Id) {
    const rooms = await RoomModel.find({
      $or: [{ user1: user1Id }, { user2: user1Id }],
    });
    if (!rooms) {
      throw ApiError.BadRequest(`Комнат нет`);
    }

    return rooms;
  }

  async deleteRoom(roomId) {
    const roomValid = await RoomModel.findOne({ roomId });
    if (!roomValid) {
      throw ApiError.BadRequest(`Комната не существует ${room._id}`);
    }
    const room = await RoomModel.findOneAndDelete({ roomId });
  }
}

module.exports = new RoomService();
