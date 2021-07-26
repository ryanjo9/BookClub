<template>
  <div class="book" v-if="book">
    <div class="bookInfo">
      <h1>Book Page</h1>
      <p>{{ book.title }}</p>
      <img :src="book.imgSrc" />
      <router-link :to="{ name: 'club', params: {clubId: book.club} }">
        <p>Club id: {{ book.club }} </p>
      </router-link>
    </div>
    <div class="meetings">
      <div class="create" @click="toggleUpload">
          <a>New Meeting<i class="fa fa-users" /></a>
      </div>
      <escape-event @escape="escape" />
      <meeting-uploader :show="show" @escape="escape" />
      <meeting-gallery :meetings="meetings" :user="user" />
    </div>
  </div>
</template>

<script>
import MeetingGallery from '@/components/MeetingGallery.vue'
import EscapeEvent from '../components/EscapeEvent.vue';
import MeetingUploader from '../components/MeetingUploader.vue';

export default {
  name: 'book',
  components: {
    MeetingGallery,
    EscapeEvent,
    MeetingUploader
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    book() {
      return this.$store.state.book
    },
    meetings() {
      return this.$store.state.meetings
    }
  },
  async created() {
    await this.$store.dispatch('getUser');
    await this.$store.dispatch('getBookById', this.$route.params.bookId);
    await this.$store.dispatch('getBookMeetings', this.$route.params.bookId)
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    toggleUpload() {
      this.show = true
    },
    escape() {
      this.show = false
    },
    async uploadFinished() {
      this.show = false

      await this.$store.dispatch('getBookMeetings', this.$route.params.bookId)
    }
  }
}
</script>

<style scoped>
a {
  cursor: pointer;
}

.book {
  display: flex;
  min-height: 0;
  align-items: flex-start;
}

.book img {
  max-width: 150px;
  max-height: 200px;
  image-orientation: from-image;
}

.create {
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid transparent;
}

.create:hover {
  border: 1px solid #adadad;
  cursor: pointer;
}

.bookInfo {
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  margin-right: 15px;
}
</style>
