export const state = () => ({
  rooms:[],
  room: null,
  currentUser:{},
  user: {},
  messages: [],
  users: [],
});

export const getters = {
  typingUsers: ({ users, user }) => users.filter(({ typingStatus, id }) => typingStatus && user.id !== id),
  typingStatus: ({ user }) => user.typingStatus,
  user(state){
    return state.user
  },
  users(state){
    return state.users
  },
  room(state){
    return state.room
  },
  rooms(state){
    return state.rooms
  },
  currentUser(state){
    return state.currentUser
  }
  // messages(state){
  //   return state.messages
  // }
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setRoom(state, room){
    state.room = room
  },
  setRooms(state, rooms) {
    state.rooms = rooms;
  },
  setCurrentUser(state, user){
    state.currentUser = user
  },
  SOCKET_newMessage(state, msg) {
    state.messages = [...state.messages, msg];
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  },
  // updateUsers(state, users) {
  //   state.users = users;
  // },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  setTypingStatus(state, status) {
    state.user.typingStatus = status;
  },
};

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload);
  },
  createMessage({ dispatch, state }, msg) {
    const { user } = state;
    const { room } = state;
    const payload = {
      msg,
      userId: user.id,
      roomId: user.room,
      name: user.name
      // ДОБАВЬ ИМЯ ПОЛЬЗОВАТЕЛЯ ЕГО НЕТ В БД
    };

    dispatch("socketEmit", {
      action: "createMessage",
      payload,
    });
  },
  // SOCKET_updateUsers({state, dispatch, commit}, users) {
  //   commit('updateUsers', users);
  //   // dispatch('socketEmit', {
  //   //   action: 'updateUsers',
  //   //   payload: null
  //   // })
  //   // state.users = users;
  // },
  joinRoom({ dispatch, state }) {
    const { user } = state;

    dispatch("socketEmit", {
      action: "joinRoom",
      payload: user,
    });
  },
  leftRoom({ commit, dispatch }) {
    dispatch("socketEmit", {
      action: "leftChat",
      payload: null,
    });

    commit("clearData");
  },
  setTypingStatus({ dispatch, commit, state }, typingStatus) {
    commit("setTypingStatus", typingStatus);
    const { user } = state;
    dispatch("socketEmit", {
      action: "setTypingStatus",
      payload: user,
    });
  },
  async createUser({ commit, dispatch }, user) {
    const { id } = await dispatch("socketEmit", {
      action: "createUser",
      payload: user,
    });

    commit("setUser", { id, ...user });
  },
  SOCKET_reconnect({ state, dispatch }) {
    const { user } = state;
    if (Object.values(user).length) {
      const { id, ...userInfo } = user;
      dispatch('createUser', userInfo);
      dispatch('joinRoom');
    }
  },
};
