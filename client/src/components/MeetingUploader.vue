<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">New Meeting</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <p>Meeting Info</p>
            <input v-model="reading" placeholder="Reading Section">
            <input type="date" v-model="startDate" />
            <input type="date" :min="startDate" v-model="endDate" />
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
      reading: '',
      startDate: '',
      endDate: '',
    }
  },
  methods: {
    close() {
      this.$emit('escape');
    },
    async upload() {
      try {        
        const meetingData = {
          bookId: this.$route.params.bookId,
          reading: this.reading,
          startDate: this.startDate,
          endDate: this.endDate
        }

        this.error = await this.$store.dispatch('addMeetingToBook', meetingData)
        if (!this.error) {
          this.reading = ''
          this.startDate = ''
          this.endDate = ''
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
