<template>
  <div class="home">
    <a @click="$router.go(-1)">back</a>
    <div v-if="book">
      <div>
        <img :src="book.imgsrc" />
      </div>
      <div class="postBody">
        <p class="username">
          <span>{{ post.author.username }}</span>
          {{ formatDate(post.created) }}
        </p>
        <p class="text">{{ post.text }}</p>
      </div>

      <div class="comments">
        <comments :comments="comments" />
      </div>
    </div>
    <div v-else>
      <h1>Looking that up for you</h1>
    </div>
</div>
</template>

<script>
import Comments from '@/components/Comments.vue'
import moment from 'moment'

export default {
    name: 'post',
    components: {
      Comments
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      clubs() {
        return this.$store.state.clubs
      },
      comments() {
        return this.$store.state.comments
      },
      post() {
        return this.$store.state.post
      },
      book() {
        return this.$store.state.book
      }
    },
    async created() {
      await this.$store.dispatch("getUser");
      await this.$store.dispatch('getPostById', this.$route.params.postId)
      await this.$store.dispatch("getBookById", this.$store.state.post.book.id);
      await this.$store.dispatch("getPostComments", this.$route.params.postId)
    },
    data() {
      return {
        text: '',
        error: '',
      }
    },
    methods: {
      escape() {
        this.show = false;
      },
      formatDate(date) {
        if (moment(date).diff(Date.now(), 'days') < 15)
          return moment(date).fromNow();
        else
          return moment(date).format('d MMMM YYYY');
      },
    }
}
</script>

<style scoped>
  .comments {
    margin-left: 15px;
  }

  a {
    cursor: pointer;
  }

  .postBody {
    width: 100%;
    padding: 4px;
    display: inline-block;
    width: 100%;
    background-color: #ffffff;
    max-width: 400px; 
    border-radius: 4px;
    border: 1px solid transparent;
    margin: 1em 0 1em 0;

  }

  .username {
    margin: 0;
    font-size: 0.8em;
  }

  .text {
    margin:0.5em 0 0 0;
  }

  img {
    max-width: 150px;
    max-height: 200px;
    image-orientation: from-image;
  }

</style>
