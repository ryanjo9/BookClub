<template>
  <div class="home">
    <a @click="$router.go(-1)">back</a>
    <div v-if="post">
      <img :src="book.imgsrc" />

      <p>{{ post.text }}</p>

      <div class="comments">
        <comments :comments="comments" />
      </div>

      <div v-if="user">
        <h3>Add a Comment</h3>
        <form v-on:submit.prevent="addComment">
          <textarea v-model="text"></textarea>
          <br />
          <button type="submit" class="pure-button">Post</button>
        </form>
      </div>
      <div v-else>
        <p>If you would like to add a comment, please register for an account or login.</p>
        <router-link to="/register" class="pure-button">Register</router-link> or
        <router-link to="/login" class="pure-button">Login</router-link>
      </div>
    </div>
    <div v-else>
      <h1>Looking that up for you</h1>
    </div>
</div>
</template>

<script>
import Comments from '@/components/Comments.vue'

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
      async addComment() {
        let comment = {
          postId: this.$route.params.postId,
          text: this.text,
        }
        this.error = await this.$store.dispatch("addComment", comment);
        if (!this.error) {
          this.text = '';
          await this.$store.dispatch("getPostComments", this.$route.params.postId)
        }
      }
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
</style>
