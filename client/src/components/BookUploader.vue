<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Create Book</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <p>Book Info</p>
            <input v-model="title" placeholder="Book Title">
            <input v-model="imgSrc" placeholder="Link to book image">
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'BookUploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      error: '',
      title: '',
      imgSrc: ''
      }
  },
  methods: {
    close() {
      this.$emit('escape');
    },
    async upload() {
      try {        
        const bookData = {
          clubId: this.$route.params.clubId,
          title: this.title,
          imgSrc: this.imgSrc
        }

        this.error = await this.$store.dispatch('addBookToClub', bookData)
        if (!this.error) {
          this.title = ''
          this.imgSrc = ''
          this.$emit('uploadFinished');
        }
      } catch (error) {
        console.log(error);
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
