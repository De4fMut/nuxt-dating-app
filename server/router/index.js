const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const roomController = require('../controllers/room-controller')
const communityController = require('../controllers/community-controller')
const wishController = require('../controllers/wish-controller')
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require ('../middlewares/auth-middleware')

const fileController = require('../controllers/file-controller')


// USER
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/user", userController.getUser);
router.get("/users", authMiddleware, userController.getUsers);


// ROOM
router.post('/createroom', roomController.createRoom)
router.post('/room', roomController.getRoom)
router.post('/rooms', roomController.getRooms)


// Community
router.post('/createcom', communityController.createCommunity)
router.post('/com', communityController.getCom)
router.post('/coms', communityController.getComs)

// Wish
router.post('/createwish', wishController.createWish)
router.post('/wish', wishController.getWish)
router.post('/wishes', wishController.getWishes)
router.post('/dowish', wishController.doWish)


//File
router.post('/files', authMiddleware, fileController.createDir)
router.post('/files/upload', authMiddleware, fileController.uploadFile)
router.post('/files/avatar', authMiddleware, fileController.uploadAvatar)
router.get('/files', authMiddleware, fileController.getFiles)
router.get('/download', authMiddleware, fileController.downloadFile)
router.get('/search', authMiddleware, fileController.searchFile)
router.delete('/files', authMiddleware, fileController.deleteFile)
router.delete('/avatar', authMiddleware, fileController.deleteAvatar)



module.exports = router;
