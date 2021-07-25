<template>
  <div>
    <div class="post" v-for="post in posts" v-bind:key="post._id">
      <router-link :to="{ name: 'post', params: {postId: post._id} }">
        <p>{{post.text}}</p>
        <p>{{ post.author.username }}</p>
        <p>Created: {{ formatDate(post.created) }}</p>
        <p>{{ post.comments.length || 0 }} comments</p>
      </router-link>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'PostGallery',
    props: {
      posts: Array,
      user: Object
    },
    methods: {
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
  .post {
    margin-bottom: 10px;
    width: 100%;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid transparent;
  }

  .post:hover {
    border: 1px solid #adadad;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #000

  }
</style>
