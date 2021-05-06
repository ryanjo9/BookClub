<template>
<div class="comments">
  <!-- <h2>Comments</h2> -->
  <div class="comment" v-for="comment in comments" v-bind:key="comment._id">
    <p>{{comment.text}}</p>
    <p class="commentDate">
      <span v-if="comment.author.name">{{comment.author.name}}, </span>
      {{formatDate(comment.created)}}
    </p>
  </div>


  <div class="comment" v-if="user">
    <form v-on:submit.prevent="addComment">
      <textarea v-model="text" v-autogrow placeholder="Add a comment"></textarea>
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
</template>

<script>
import moment from 'moment';
import { TextareaAutogrowDirective } from 'vue-textarea-autogrow-directive'

export default {
  name: 'Comments',
  directives: {
    'autogrow': TextareaAutogrowDirective
  },
  props: {
    comments: Array
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
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
.commentDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.comment {
  margin: 0 0 0.7em;
  padding: 4px;
  display: inline-block;
  width: 100%;
  background-color: #ffffff;
  max-width: 400px; 
  min-width: 150px;
  border-radius: 4px;
  border: 1px solid transparent;
}

.comments {
  display: grid;
}

.comment textarea {
  outline: none;
  border:transparent;
  width: 100%;
  resize: none;
}

</style>
