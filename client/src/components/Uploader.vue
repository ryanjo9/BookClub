<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Create Club</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <p>Club Name</p>
            <input v-model="name" placeholder="Club Name">
            <p>Book Info</p>
            <input v-model="title" placeholder="Book Title">
            <input v-model="imgsrc" placeholder="Link to book image">
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
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      error: '',
      name: '',
      title: '',
      imgsrc: ''
      }
  },
  methods: {
    close() {
      this.$emit('escape');
    },
    async upload() {
      try {
        const club = await this.$store.dispatch("createClub", { name: this.name });
        
        const bookData = {
          clubId: club.id,
          title: this.title,
          imgsrc: this.imgsrc
        }

        this.error = await this.$store.dispatch('startBook', bookData)
        if (!this.error) {
          this.name = ''
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
