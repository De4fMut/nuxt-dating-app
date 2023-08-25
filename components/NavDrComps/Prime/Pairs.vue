<template>
    <v-card
        color="transparent"
        flat
       
        class="d-flex justify-center"
       
      >
        <v-container max-width="500" class="pa-1">
          
          <v-item-group v-model="selected" multiple>
            <v-row justify="start">
              <v-col
                v-for="(user, i) in users"
                class="d-flex justify-center"
                cols="4"
                :key="i"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-img
                  :src="require(`@/static/users/${user.login}/0.jpg`)"

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
                    <v-btn nuxt :to="'/users/'+ user.login" icon absolute style="bottom: 0; left: 0;">
                      <v-icon >
                        mdi-account
                      </v-icon>
                    </v-btn>
                  </v-img>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
        </v-container>
      </v-card>    
    
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
export default{
    data() {
        return {
            selected: [],

        }
    },
    computed: {
    ...mapGetters(["user", "users", "rooms", "room"]),
  },
}
</script>