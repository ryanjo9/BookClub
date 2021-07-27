<template>
  <div class="meeting" v-if="meeting">
    <div class="posts">
      <div class="create" @click="toggleUpload">
          <a>New Post<i class="fa fa-users" /></a>
          <post-uploader :user="user" @uploadFinished="uploadFinished" />
      </div>

      <post-gallery :posts="posts" :user="user" /> 
    </div>

    <div>
      <div class="meetingInfo">
        <h1>Meeting Page</h1>
        <p>{{ meeting.reading }}</p>
        <p>Start: {{ formatDate(meeting.startDate) }}</p>
        <p>End: {{ formatDate(meeting.endDate) }}</p>
      </div>

      <book-info :bookId="meeting.book" :user="user" />
    </div>
  </div>
</template>

<script>
import PostGallery from '@/components/PostGallery.vue'
import moment from 'moment';
import PostUploader from '../components/PostUploader.vue';
import BookInfo from '../components/BookInfo.vue'


export default {
  name: 'meeting',
  components: {
    PostGallery,
    PostUploader,
    BookInfo
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
    },
    computeShow() {
      return this.show
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
    async uploadFinished() {
      this.show = false

      await this.$store.dispatch('getMeetingPosts', this.$route.params.meetingId)
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
  margin-right: 15px;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
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
  width: 312px;
}

.posts {
  margin-left:  40px;
  margin-right: 40px;
  overflow-y: scroll;
  width: 312px;
}
</style>
