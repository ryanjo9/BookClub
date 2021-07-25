<template>
  <div class="post">
    <div class="comments">
      <div class="create" @click="toggleUpload">
          <a>New Comment<i class="fa fa-users" /></a>
          <comment-uploader :user="user" @uploadFinished="uploadFinished" />
      </div>

      <comment-gallery :comments="comments" :user="user" /> 
    </div>
    <div class="postInfo">
      <h1>Post Page</h1>
      <p>{{ post.text }}</p>
      <p>Author {{ post.author.username }}</p>
      <p>Created: {{ formatDate(post.created) }}</p>

      <router-link :to="{ name: 'meeting', params: {meetingId: post.meeting} }">
        <p>Meeting id: {{ post.meeting }} </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import CommentGallery from '@/components/CommentGallery.vue'
import moment from 'moment';
import CommentUploader from '../components/CommentUploader.vue';

export default {
  name: 'post',
  components: {
    CommentUploader,
    CommentGallery
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    post() {
      return this.$store.state.post
    },
    comments() {
      return this.$store.state.comments
    },
    computeShow() {
      return this.show
    }
  },
  async created() {
    await this.$store.dispatch('getUser');
    await this.$store.dispatch('getPostById', this.$route.params.postId);
    await this.$store.dispatch('getPostComments', this.$route.params.postId)
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

      await this.$store.dispatch('getPostComments', this.$route.params.postId)
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

.post {
  display: flex;
  min-height: 0;
  align-items: flex-start;
}

.post img {
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

.postInfo {
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: 15px;
}

</style>
