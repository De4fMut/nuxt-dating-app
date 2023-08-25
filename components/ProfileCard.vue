<template>
  <v-card dark rounded="xl" height="540px" width="330px">
    <v-window
      v-model="onboarding"
      class="rounded-xl"
      hide-delimiters
      height="100%"
      :show-arrows="false"
    >
      <v-window-item v-for="(item, i) in items" :key="i">
        <!-- <v-img :src="require(`@/static/users/deamut/0.jpg`)" width="100%" height="540px"></v-img> -->
      </v-window-item>
    </v-window>
    <v-row
      style="position: absolute; bottom: 0px; z-index: 1; width: 100%"
      no-gutters
      class="flex-column fill-height"
      justify="space-between"
    >
      <v-col>
        <v-row justify="center">
          <v-col>
            <v-card-actions v-if="items.length > 1" class="pa-1 d-flex justify-center" style="background-color: transparent">




              <v-item-group
                v-model="onboarding"
                class="d-flex justify-center"
                mandatory
                
              >
                <v-container
                style="max-width: 85%;"
                >
                  <v-row
                  justify="center"
                  class=" flex-nowrap"
                  
                  >
                    <v-col 
                    v-for="(btn, index) in items" :key="index"
                    :cols="Math.floor(12/items.length)"
                    class="pa-1"
                    >
                      <v-item
                        v-slot="{ active, toggle }"
                        
                      >
                        <v-card
                          
                          :color="active ? 'white' : 'rgba(255, 255, 255, 0.56)'"
                          class="d-flex align-center flex-grow-1 flex-shrink-1"
                          height="6"
                          width="200"
                          @click="toggle"
                        >
                          <v-scroll-y-transition>
                            <div
                              v-if="active"
                              class="text-h2 flex-grow-1 text-center"
                            >
                            </div>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>

              
            </v-card-actions>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="!admin" cols="auto" class="rounded-b-xl">
        <v-row justify="space-around">
          <v-col cols="auto">Name</v-col>
          <v-col cols="auto">
            <v-row>
              <v-col>
                <v-item-group>
                  Wish
                </v-item-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col><v-btn background-color="transparent" icon><v-icon>mdi-gift</v-icon></v-btn></v-col>
              <v-col><v-btn background-color="transparent" icon><v-icon>mdi-information</v-icon></v-btn></v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-card-actions
          class="rounded-b-xl"
          style="background-color: rgba(0, 0, 0, 0.56)"
        >
        <v-row v-if="admin === true" align="center" justify="center" dense>
            <v-col cols="auto">
              <v-row>
             <v-card-title>{{ user.name }}</v-card-title>
            </v-row>
            <v-row>
             <v-card-text>{{ profileData.gender }}</v-card-text>
            </v-row>
            </v-col>
            <v-btn block>Изменить профиль</v-btn>
          </v-row>
          <v-row v-if="!admin" align="center" justify="center" dense>
            <v-col cols="auto" v-for="(btn, index) in btns" :key="index">
              <v-btn :class="btn.size" outlined icon :color="btn.color">
                <v-icon :color="btn.color">
                  {{ btn.icon }}
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-col>
    </v-row>
    <!-- </v-item-group> -->
  </v-card>
</template>

<style scoped>

/* .v-btn-toggle--group > .v-btn.v-btn {
    background-color: white !important;
} */
</style>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      btns: {
        arrow: {
          icon: "mdi-arrow-left",
          color: "#BD00FF",
          size: "v-size--large",
        },
        cross: {
          icon: "mdi-window-close",
          color: "#F50000",
          size: "v-size--x-large",
        },
        star: {
          icon: "mdi-star",
          color: "#FFC700",
          size: "v-size--large",
        },
        heart: {
          icon: "mdi-heart",
          color: "#85B6FF",
          size: "v-size--x-large",
        },
        lightning: {
          icon: "mdi-flash",
          color: "#0FA958",
          size: "v-size--large",
        },
      },
      items: [
        // {
        //   src: require("@/static/users/unknown/userPhoto.png"),
        // },
        // {
          // src: require(`@/static/users/${this.user.login}/1.jpg`),
        // },
        // {},
        {}
        // {
        //   src: "https://picsum.photos/500/300?image",
        // },
        // {
        //   src: "https://picsum.photos/500/300?image",
        // },
      ],

      onboarding: 0,
    };
  },
  computed:{
    ...mapGetters({
      currentUser: 'currentUser',
      profileData: "profileData/getProfileData",
    })
  },
  props:{
    admin:{
      type: Boolean,
      required: true
    },
    user:{
      type: Object,
      required: true
    }
  }
};
</script>
