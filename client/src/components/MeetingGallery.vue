<template>
  <div>
    <div class="meeting" v-for="meeting in meetings" v-bind:key="meeting._id">
      <p>{{meeting.reading}}</p>
      <p>{{meeting.startDate}}</p>
      <p>{{meeting.endDate}}</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'MeetingGallery',
    props: {
      meetings: Array,
      user: Object
    }
  }
</script>

<style scoped>
.meeting {
  margin: 0 0 1.0em;
  width: 100%;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid transparent;
}

.meeting:hover {
  border: 1px solid #adadad;
  cursor: pointer;
}
</style>
