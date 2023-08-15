const CommunityService = require("../service/community-service");

const ApiError = require('../exceptions/api-error')


class CommunityController {
    async createCommunity(req, res, next){
        try {
            
            const {id, name, theme} = req.body.user;
        
            const comData = await CommunityService.createCommunity(id, name, theme)
            
            return res.json(comData);
        }catch(e) {
            next(e)
        }
    }
    
    
    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch(e) {
            next(e)
        }
    }


    async getCom(req, res, next){
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            const com = await userService.getCom(accessToken);
            return res.json(com)
        }catch(e) {
            next(e)
        }
    }

    async getComs(req, res, next){
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            const coms = await CommunityService.getAllComs(accessToken);
            return res.json(coms)
        }catch(e) {
            next(e)
        }
    }
}

module.exports = new CommunityController()