const wishService = require("../service/wish-service");
const ApiError = require('../exceptions/api-error')

class WishController{
    async createWish(req, res, next){
        try {
            const {user, text} = req.body;
            const wishData = await wishService.createWish(user, text);
            
            return res.json(wishData);
        }catch(e) {
            next(e)
        }
    }

    async getWish(req, res, next){
        try {
            const {user, wishid} = req.body;
            const roomData = await wishService.getWish(user, wishid);
            
            return res.json(roomData);
        }catch(e) {
            next(e)
        }
    }

    async getWishes(req, res, next){
        try {
            const {user} = req.body;
            const wishes = await wishService.getWishes(user);
            
            return res.json(wishes);
        }catch(e) {
            next(e)
        }
    }

    async doWish(req, res, next){
        try{
            const {wishid, wizard} = req.body;
            const wishData = await wishService.doWish(wishid, wizard);
            
            return res.json(`${wishData}`);
        }catch(e){
            next(e)
        }
    }
}

module.exports = new WishController()