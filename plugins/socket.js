import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
// import store from '../store';
import io from 'socket.io-client';

const socketInstance = io('http://localhost:3000', {
  rejectUnauthorized: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: 15,
});

export default ({ store }) => {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: socketInstance,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  }));
};

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://metinseylan.com:1992',
//   vuex: {
//       store,
//       actionPrefix: 'SOCKET_',
//       mutationPrefix: 'SOCKET_'
//   },
//   options: { path: "/my-app/" } //Optional options
// }))
