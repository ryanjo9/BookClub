<template>
<div>
  <div class="posts">
    <div v-if="isMember" class="post">
      <form v-on:submit.prevent="addPost">       
        <textarea v-model="text" placeholder="Add a post" v-autogrow></textarea>
        <br />
        <button type="submit" class="pure-button">Post</button>
      </form>
    </div>

    <div v-else class="post" id="joinClubBox" @click="joinClub">
      <p>Join this club to participate in the discussion</p>
    </div>

    <div class="post" v-for="post in posts" v-bind:key="post.id" >
      <router-link :to="{ name: 'post', params: { postId: post.id } }">
        <p class="postUsername" v-if="post.author.username">
          <span>{{ post.author.username }}</span>
          {{ formatDate(post.created) }}
        </p>

        <p class="postText">
          {{ post.text }}
        </p>

        <div class="comments">
          <p>{{ post.comments.length }} comments</p>
        </div>

      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import { TextareaAutogrowDirective } from 'vue-textarea-autogrow-directive'

export default {
  name: 'Posts',
  directives: {
    'autogrow': TextareaAutogrowDirective 
  },
  props: {
    posts: Array,
    user: Object,
    club: Object,
  },
  data() {
    return {
      text: ''
    }
  },
  computed: {
    isMember() {
      if (!this.user) {
        return false
      }

      const memberUser = this.club.members.filter(m => {
        return m.username === this.user.username
      })

      return Boolean(memberUser.length)
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async addPost() {
      let post = {
        bookId: this.$store.state.book.id,
        text: this.text,
      }
      this.error = await this.$store.dispatch("addPostToBook", post);
      if (!this.error) {
        this.text = '';
        await this.$store.dispatch("getBookPosts", this.$store.state.book.id);
      }
    },
    joinClub() {
      this.$emit('joinClub', this.club.id)
    }
  }
}
</script>

<style scoped>
p {
  margin: 4px;
}

.postUsername {
  font-size: 0.8em;
  margin-bottom: 8px;
}


.post {
  margin: 0 0 1em;
  padding: 4px;
  display: inline-block;
  width: 100%;
  background-color: #ffffff;
  max-width: 400px; 
  border-radius: 4px;
  border: 1px solid transparent;
}

.post:hover {
  /* outline: #333 solid 1px; */
  border: 1px solid #adadad;
}

.posts {
  display: grid;
}

.post a {
  text-decoration: none;
  color: black;
}

.comments {
  font-size: 0.8em;
}

.post textarea {
  outline: none;
  border:transparent;
  width: 100%;
  resize: none;
}

#joinClubBox {
  cursor: pointer;
}

</style>
