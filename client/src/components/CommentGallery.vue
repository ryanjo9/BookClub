<template>
  <div>
    <div class="comment" v-for="comment in comments" v-bind:key="comment._id">
      <p>{{comment.text}}</p>
      <p>{{comment.author.username}}</p>
      <p>Created: {{ formatDate(comment.created) }}</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CommentGallery',
  props: {
    comments: Array,
    user: Object
  },
  methods: {
    formatDate(date) {
      return moment(date).format('MMMM d, YY');
    }
  }
}
</script>

<style scoped>
  .comment {
    margin-bottom: 10px;
    width: 100%;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid transparent;
  }

  .comment:hover {
    border: 1px solid #adadad;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #000

  }
</style>
