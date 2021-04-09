<template>
<div>
  <div v-if="user">
    <div class="header">
      <div>
        <h1>Hi, {{user.name}}</h1>
      </div>
      <div>
        <p>
          <a @click="toggleUpload">Create Club <i class="far fa-image"></i></a>
          <a href="#" @click="logout">Log Out <i class="fas fa-sign-out-alt"></i></a>
        </p>
      </div>
    </div>
    <escape-event @escape="escape"></escape-event>
    <uploader :show="show" @escape="escape" @uploadFinished="uploadFinished" />
    <!-- <image-gallery :photos="photos" /> -->
    <club-gallery :clubs="clubs" />
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
import Uploader from '@/components/Uploader.vue'
// import ImageGallery from '@/components/ImageGallery.vue'
import ClubGallery from '../components/ClubGallery.vue'

export default {
  name: 'mypage',
  components: {
    EscapeEvent,
    Uploader,
    // ImageGallery,
    // ClubGaller
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
  display: flex;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}
</style>
