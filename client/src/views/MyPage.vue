<template>
<div>
  <div v-if="user">
    <div class="header">
      <div class="greeting">
        <p>Hi, {{user.name}}</p>
      </div>
      <div class="upload">
        <p>
          <a @click="toggleUpload">Start a New Club <i class="fas fa-book"></i></a>
        </p>
      </div>
    </div>
    <escape-event @escape="escape"></escape-event>
    <club-uploader :show="show" @escape="escape" @uploadFinished="uploadFinished" />
    <club-gallery :clubs="clubs" :user="user"/>
  </div>
  <div v-else>
    <p>If you would like to create or join a club, please register for an account or login.</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
import EscapeEvent from '@/components/EscapeEvent.vue'
import ClubUploader from '@/components/ClubUploader.vue'
import ClubGallery from '../components/ClubGallery.vue'

export default {
  name: 'mypage',
  components: {
    EscapeEvent,
    ClubUploader,
    ClubGallery
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    clubs() {
      return this.$store.state.clubs;
    }
  },
  data() {
    return {
      show: false,
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getUserClubs");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      try {
        this.error = await this.$store.dispatch("getUserClubs");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
a {
  cursor: pointer;
}

.header {
  display: grid;
}

.header a {
  color: #222;
  font-size: 1.5em;
}

.header svg {
  margin-top: 12px;
}

.greeting {
  font-size: 1.75em;
}

.upload {
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
}

.upload:hover {
  border: 1px solid #adadad;
}
</style>
