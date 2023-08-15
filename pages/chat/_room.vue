<template>
    <v-container class="chat-wrapper">
      <div
        ref="chat"
        class="chat"
      >
        <Message
          v-for="(message, index) in messages"
          :key="`message-${index}`"
          :message="message"
          :owner="message.id === user.id"
        />
      </div>
      <div
        v-if="typingUsers.length"
        class="chat__typing"
      >
        <p
          v-for="(typingUser, index) in typingUsers"
          :key="`typingUser-${index}`"
          class="chat__typing-user"
        >
          {{ typingUser.name }} is typing...
        </p>
      </div>
      <div class="chat__form">
        <ChatForm />
      </div>
    </v-container>
  </template>
  
  <script>
  import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
  import Message from "@/components/Message";
  import ChatForm from "@/components/ChatForm";
  
  export default {
    name: "ChatPage",
    // layout: "chat",
    components: {
      Message,
      ChatForm,
    },
    async asyncData({ params }) {
    const room = params.room // When calling /abc the slug will be "abc"
    return { room };
  },
    computed: {
      ...mapState(["user", "messages"]),
      ...mapGetters(["typingUsers", 'users']),
    },
    middleware: "auth",
    
    methods: {
      ...mapActions(["joinRoom", "leftRoom", ]),
      ...mapMutations(['setRooms', 'setRoom']),
      exit() {
        // this.leftRoom();
        this.$router.push("/main");
      },
      async getRooms(){
        console.log(this.$auth.user.id)
        const response = await this.$axios
          .post("/api/rooms", { user1Id: this.$auth.user.id})
          .then((response) => {
            // Обработка успешного ответа
            this.setRooms(response.data)
            console.log(response);
          })
          .catch((error) => {
            // Обработка ошибки
            console.error(error);
          });
        
      }
    },
    watch: {
      messages() {
        setTimeout(() => {
          if (this.$refs.chat) {
            this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
          }
        }, 0);
      },
    },
    head() {
      return {
        title: `Room ${this.user.room}`,
      };
    },
    mounted() {
      this.getRooms()
    },
    
  };
  </script>
  
  <style scoped>
  .chat-wrapper {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .chat__form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 80px;
  }
  
  .chat {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;
    color: #000;
  }
  
  .chat__typing {
    position: absolute;
    display: flex;
    bottom: 50px;
  }
  
  .chat__typing-user:not(first-child) {
    margin-left: 15px;
  }
  </style>
  