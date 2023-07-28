<template>
  <v-container class="pa-1">
    <!-- <v-col cols="9"> -->
    <v-item-group v-model="selected" multiple>
      <v-row justify="start">
        <v-col
          v-for="(user, i) in users"
          class="d-flex justify-center"
          lg="4"
          md="6"
          xs="12"
          :key="i"
        >
          <v-item v-slot="{ active, toggle }">
            <v-img
              :src="`https://cdn.vuetifyjs.com/images/${user.src}`"
              width="150"
              height="150"
              class="text-right pa-2"
              @click="toggle"
            >
              <v-btn icon dark>
                <v-icon>
                  {{ active ? "mdi-heart" : "mdi-heart-outline" }}
                </v-icon>
              </v-btn>
            </v-img>
          </v-item>
        </v-col>
        <v-col lg="4" md="6" xs="12">
            <v-item>
          <v-sheet
          min-width="150px"
            width="100%"
            height="150"
            class="d-flex justify-center align-center pa-2"
            @click="addPhoto"
            background-color="accent"
          >
            
              
                <v-btn icon dark x-large>
                  <v-icon x-large> mdi-plus </v-icon>
                </v-btn>
              
            
          </v-sheet>
        </v-item>
        </v-col>
      </v-row>
    </v-item-group>
    <!-- </v-col> -->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          src: "backgrounds/bg.jpg",
        },
        {
          src: "backgrounds/md.jpg",
        },
        {
          src: "backgrounds/bg-2.jpg",
        },
        {
          src: "backgrounds/md2.jpg",
        },
      ],
      selected: [],
    };
  },
  methods: {
    addPhoto(){

    }
  },
};
</script>
