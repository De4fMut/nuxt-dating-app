const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const userController = require("./controllers/user-controller");
const usersDB = require("../utils/users-copy")();
const Message = require("../models/Message")();
const MessageModel = require("./models/message-model");
const ApiError = require("./exceptions/api-error");

io.on("connection", (socket) => {
  socket.on("createUser", (user) => {
    // if(user.lenght == null){
    try {
      usersDB.addUser({
        ...user,
        // id: socket.id,
      });
      console.log(user);
      return { id: user.id };
    } catch (e) {
      console.log(e);
      throw ApiError.UnauthorizedError();
    }
  });

  socket.on("joinRoom", ({ name, room }) => {

    socket.join(room);
    io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
    socket.emit("newMessage", new Message("admin", `Hello, ${name}`));
    socket.broadcast
      .to(room)
      .emit(
        "newMessage",
        new Message("admin", `User ${name} connected to chat`)
      );
  });

  socket.on("createRoom", ({ user1Id, user2Id }) => {
    const roomValid =  RoomModel.find({
      $and: [
      { 'user1': `${user1Id}` },
      { 'user2': `${user2Id}` }
    ]})
    if (roomValid) {
      throw ApiError.BadRequest(`Комната уже существует ${roomValid.id}`);
    }
    const room = RoomModel.create({user1: user1Id, user2: user2Id})
    socket.join(room.id);
    io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
    socket.emit("newMessage", new Message("admin", `Hello, ${name}`));
    socket.broadcast
      .to(room)
      .emit(
        "newMessage",
        new Message("admin", `User ${name} connected to chat`)
      );
  });

  socket.on("createMessage", ({ name, userId, roomId, msg }) => {
    const user = usersDB.getUser(userId);
    const room = usersDB.getRoom(roomId);

    // В ПРИНЦИПЕ ВСЁ ШИКАРНО, НЕ НАХОДИТ РУМ С ТАКИМ АЙДИ И ОШИБКА

    // const message = MessageModel.create({name: user.name, user: userId, msg, room: roomId})
    // message.save((err) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log('Message saved');
    //   }
    // });
    console.log({ name, user: userId, msg, room: roomId });
    if (user) {
      io.to(room).emit("newMessage", "message");
    }
  });

  socket.on("setTypingStatus", ({ room, typingStatus, id }) => {
    console.log({ room, typingStatus, id });
    usersDB.setTypingStatus(id, typingStatus);
    io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
  });

  const exitEvents = ["leftChat", "disconnect"];

  exitEvents.forEach((event) => {
    socket.on(event, () => {
      const id = socket.id;
      const user = usersDB.getUser(id);
      if (!user) return;
      const { room, name } = user;
      usersDB.removeUser(id);
      socket.leave(room);
      io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
      io.to(room).emit(
        "newMessage",
        new Message("admin", `Пользователь ${name} покинул чат`)
      );
    });
  });
});

module.exports = {
  app,
  server,
};
