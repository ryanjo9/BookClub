<template>
  <div>
    <form v-on:submit.prevent="addComment">       
      <textarea v-model="text" placeholder="Add a comment" v-autogrow></textarea>
      <br />
      <p>Characters used: {{ textLength }} </p>
      <div v-show="textLength">
        <button type="button" @click="close" class="pure-button">Clear</button>
        <button type="submit" class="pure-button">Post</button>
      </div>
    </form>
  </div>
</template>

<script>
import { TextareaAutogrowDirective } from 'vue-textarea-autogrow-directive'

export default {
  name: 'CommentUploader',
  directives: {
    'autogrow': TextareaAutogrowDirective 
  },
  props: {
    user: Object
  },
  computed: {
    textLength() {
      return this.text.length
    }
  },
  data() {
    return {
      error: '',
      text: '',
    }
  },
  methods: {
    close() {
      this.text = ''
    },
    async addComment() {
      try {
        if (!this.user) {
          return 
        }

        const commentData = {
          postId: this.$route.params.postId,
          text: this.text
        }

        this.error = await this.$store.dispatch('addCommentToPost', commentData)

        if (!this.error) {
          this.text = ''
          this.$emit('uploadFinished')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px
}

.pure-button-secondary {
  float: right;
}
</style>