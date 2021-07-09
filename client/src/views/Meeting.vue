<template>
  <div class="meeting">
    <div class="meetingInfo">
      <h1>Meeting Page</h1>
      <p>{{ meeting.reading }}</p>
      <p>Start: {{ formatDate(meeting.startDate) }}</p>
      <p>End: {{ formatDate(meeting.endDate) }}</p>

      <router-link :to="{ name: 'book', params: {bookId: meeting.book} }">
        <p>Book id: {{ meeting.book }} </p>
      </router-link>
    </div>
    <div class="posts">
      <div class="create" @click="toggleUpload">
          <a>New Post<i class="fa fa-users" /></a>
      </div>
      <escape-event @escape="escape" />
      <!-- <meeting-uploader :show="show" @escape="escape" />
      <meeting-gallery :meetings="meetings" :user="user" /> -->
    </div>
  </div>
</template>

<script>
// import MeetingGallery from '@/components/MeetingGallery.vue'
import EscapeEvent from '../components/EscapeEvent.vue';
import moment from 'moment';
// import MeetingUploader from '../components/MeetingUploader.vue';

export default {
  name: 'meeting',
  components: {
    // MeetingGallery,
    EscapeEvent,
    // MeetingUploader
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    meeting() {
      return this.$store.state.meeting
    },
    posts() {
      return this.$store.state.posts
    }
  },
  async created() {
    await this.$store.dispatch('getUser');
    await this.$store.dispatch('getMeetingById', this.$route.params.meetingId);
    await this.$store.dispatch('getMeetingPosts', this.$route.params.meetingId)
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
    },
    formatDate(date) {
      // if (moment(date).diff(Date.now(), 'days') < 15)
      //   return moment(date).fromNow();
      // else
      return moment(date).format('MMMM d, YY');
    },
  }
}
</script>

<style scoped>
a {
  cursor: pointer;
}

.meeting {
  display: flex;
  min-height: 0;
  align-items: flex-start;
}

.meeting img {
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

.meetingInfo {
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  margin-right: 15px;
}
</style>
