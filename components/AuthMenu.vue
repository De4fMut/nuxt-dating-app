
<!-- Переписать с помощью vuetify -->

<template>
  <div class="auth__menu">
    <div v-if="!this.i" class="btns">
      <button
        @click="
          () => {
            this.profileData.gender = 'male';
          }
        "
        class="btn"
      >
        Man
      </button>
      <button
        @click="
          () => {
            this.profileData.gender = 'female';
          }
        "
        class="btn"
      >
        Woman
      </button>
    </div>
    <div v-if="this.i == 1">
      <form action="">
        <input
          type="radio"
          name="targetGender"
          id="gch1"
          v-model="profileData.targetGender"
          :value="`male`"
        />
        <label for="gch1">Male</label>
        <input
          type="radio"
          name="targetGender"
          id="gch2"
          v-model="profileData.targetGender"
          :value="`female`"
        />
        <label for="gch2">Female</label>
        <input
          type="radio"
          name="targetGender"
          id="gch3"
          v-model="profileData.targetGender"
          :value="`male && female`"
        />
        <label for="gch3">Both</label>
      </form>
    </div>
    <div v-if="this.i == 2">
      <form>
        <input
          type="radio"
          name="purpose"
          id="pch1"
          v-model="profileData.purpose"
          :value="`flirting`"
        />
        <label for="pch1">Flirting</label>
        <input
          type="radio"
          name="purpose"
          id="pch2"
          v-model="profileData.purpose"
          :value="`dating`"
        />
        <label for="pch2">Dating</label>
        <input
          type="radio"
          name="purpose"
          id="pch3"
          v-model="profileData.purpose"
          :value="`relationship`"
        />
        <label for="pch3">Relationship</label>
        <input
          type="radio"
          name="purpose"
          id="pch4"
          v-model="profileData.purpose"
          :value="`help`"
        />
        <label for="pch4">Help</label>
      </form>
    </div>
    <div v-if="this.i == 3">
      <form action="">
        <input
          type="radio"
          name="targetHeight"
          id="hch1"
          v-model="profileData.targetHeight"
          :value="`170`"
        />
        <label for="hch1">170</label>
        <input
          type="radio"
          name="targetHeight"
          id="hch2"
          v-model="profileData.targetHeight"
          :value="`170-190`"
        />
        <label for="hch2">170-190</label>
        <input
          type="radio"
          name="targetHeight"
          id="hch3"
          v-model="profileData.targetHeight"
          :value="`190>`"
        />
        <label for="hch3">190></label>
        <input
          type="radio"
          name="targetHeight"
          id="hch4"
          v-model="profileData.targetHeight"
          :value="`any`"
        />
        <label for="hch4">Any</label>
      </form>
    </div>
    <div v-if="this.i == 4">
      <form action="">
        <input
          type="radio"
          name="targetWeight"
          id="wch1"
          v-model="profileData.targetWeight"
          :value="`60`"
        />
        <label for="wch1">60</label>
        <input
          type="radio"
          name="targetWeight"
          id="wch2"
          v-model="profileData.targetWeight"
          :value="`60-80`"
        />
        <label for="wch2">60-80</label>
        <input
          type="radio"
          name="targetWeight"
          id="wch3"
          v-model="profileData.targetWeight"
          :value="`80-100`"
        />
        <label for="wch3">80-100</label>
        <input
          type="radio"
          name="targetWeight"
          id="wch4"
          v-model="profileData.targetWeight"
          :value="`100`"
        />
        <label for="wch4">100</label>
        <input
          type="radio"
          name="targetWeight"
          id="wch5"
          v-model="profileData.targetWeight"
          :value="`any`"
        />
        <label for="wch5">Any</label>
      </form>
    </div>
    <div v-if="this.i == 5">
      <form action="">
        <input v-model="profileData.name" placeholder="your name" />
      </form>
    </div>
    <div v-if="this.i == 6">
      <select style="color: chocolate" v-model="profileData.age.day">
        <option disabled value="">Day</option>
        <option value="32">32</option>
        <option value="324">324</option>
        <option value="5">5</option>
      </select>
      <select style="color: chocolate" v-model="profileData.age.mounth">
        <option disabled value="">Mounth</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <select style="color: chocolate" v-model="profileData.age.year">
        <option disabled value="">Year</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
      </select>
    </div>
    <div v-if="this.i == 7">
      <form action="">
        <input v-model="profileData.email" placeholder="your email" />
      </form>
      <!-- <ModalWIndowAuthSocMedia></ModalWIndowAuthSocMedia> -->
    </div>
  </div>
</template>

<style>
.auth__menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 300px;
  width: 300px;
}
.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
}
.btn {
  width: 100px;
  height: 40px;
  margin-right: 10px;
  border-radius: 20px;
  border: 2px solid teal;
}
</style>

<script>
export default {
  data() {
    return {
      profileData: {
        gender: null,
        targetGender: null,
        purpose: null,
        targetHeight: null,
        targetWeight: null,
        name: null,
        age: {
          day: null,
          mounth: null,
          year: null,
        },
        // email: null,
      },
      subHeader: [
        "Your gender",
        "Who are you looking for",
        "Your reason",
        "Person height",
        "Person weight",
        "Your name",
        "Your age",
        "We've found many men",
      ],
      i: 5,
    };
  },
  computed: {
    changeSub() {
      this.i++;
    },
    setGenderMale() {
      this.profileData.gender = "male";
    },
    setGenderFemale() {
      this.profileData.gender = "female";
    },
  },
  methods: {
    log() {
      console.log(this.profileData);
    },
    async postProfileData() {
      const res = await this.$axios.$post("/auth", this.profileData);
      this.res = res;
      console.log(res);
    },
  },
  mounted() {},
};
</script>
