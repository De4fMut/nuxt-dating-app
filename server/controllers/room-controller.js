const roomService = require("../service/room-service");
const ApiError = require('../exceptions/api-error')

class RoomController{
    async createRoom(req, res, next){
        try {
            const {user1Id, user2Id} = req.body;
            const roomData = await roomService.createRoom(user1Id, user2Id);
            
            return res.json(roomData);
        }catch(e) {
            next(e)
        }
    }

    async getRoom(req, res, next){
        try {
            const {user1Id, user2Id} = req.body;
            const roomData = await roomService.getRoom(user1Id, user2Id);
            
            return res.json(roomData);
        }catch(e) {
            next(e)
        }
    }

    async getRooms(req, res, next){
        try {
            const {user1Id} = req.body;
            const rooms = await roomService.getRooms(user1Id);
            
            return res.json(rooms);
        }catch(e) {
            next(e)
        }
    }

    async deleteRoom(req, res, next){
        try{
            const {roomId} = req.body;
            const roomData = await roomService.deleteRoom(roomId);
            
            return res.json(`Комната ${roomData} удалена`);
        }catch(e){
            next(e)
        }
    }
}

module.exports = new RoomController()