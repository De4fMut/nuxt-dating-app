const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const userService = require("./service/user-service");
const usersDB = require("../utils/users")();
const Message = require("../models/Message")();
const ApiError = require("./exceptions/api-error");

io.on("connection", (socket) => {
  socket.on("createUser", async (user) => {
    // if(user.lenght == null){
    try {
      usersDB.addUser({
        ...user,
        // id: socket.id,
      });

      return { id: user.id };
    } catch (e) {
      console.log(e);
      throw ApiError.UnauthorizedError();
    }
  });

  socket.on("joinRoom", async ({ name, room }) => {
    const users = await userService.getAllUsers()
    console.log(users)
    socket.join(room);
    io.to(room).emit("updateUsers", users);
    socket.emit("newMessage", new Message("admin", `Hello, ${name}`));
    socket.broadcast
      .to(room)
      .emit(
        "newMessage",
        new Message("admin", `User ${name} connected to chat`)
      );
  });

  socket.on("createMessage", async ({ id, msg }) => {
    const user = usersDB.getUser(id);
    if (user) {
      io.to(user.room).emit("newMessage", new Message(user.name, msg, id));
    }
  });

  socket.on("setTypingStatus", async ({ room, typingStatus, id }) => {
    usersDB.setTypingStatus(id, typingStatus);
    const users = await userService.getAllUsers()
    io.to(room).emit("updateUsers", users);
  });

  const exitEvents = ["leftChat", "disconnect"];

  exitEvents.forEach((event) => {
    socket.on(event, async () => {
      const id = socket.id;
      const user = usersDB.getUser(id);
      if (!user) return;
      const { room, name } = user;
      usersDB.removeUser(id);
      socket.leave(room);
      const users = await userService.getAllUsers()
      io.to(room).emit("updateUsers", users);
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
