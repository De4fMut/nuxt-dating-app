<template>
    <v-container>
        <v-toolbar>
            <v-toolbar-title>Новости</v-toolbar-title> 
        </v-toolbar>
        <v-item-group>
            <v-container>
                <v-row justify="center">
                    <v-col xs="12" sm="10" md="7">
                        <Post 
                        v-for="(message, i) in posts" :key="i"
                        :message="message"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
    </v-container>
  </template>

<script>
import Post from '@/components/Post.vue'

export default{
    components:{
        Post
    },
    data() {
    return {
      posts: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          name: "John Leider",
          title: "Welcome to Vuetify!",
          excerpt: "Thank you for joining our community...",
        },
        {
          color: "red",
          icon: "mdi-account-multiple",
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          name: "John Leider",
          new: 1,
          total: 3,
          title: "Twitter",
        },
        {
          color: "teal",
          icon: "mdi-tag",
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          name: "John Leider",
          new: 2,
          total: 4,
          title: "Shop your way",
          exceprt: "New deals available, Join Today",
        },
      ],
    };
  },
}
</script>