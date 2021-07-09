<template>
  <div>
    <div class="meeting" v-for="meeting in meetings" v-bind:key="meeting._id">
      <p>Reading section: {{meeting.reading}}</p>
      <p>Start: {{ formatDate(meeting.startDate) }}</p>
      <p>End: {{ formatDate(meeting.endDate) }}</p>
      <p>{{ meeting.posts.length || 0 }} posts</p>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'MeetingGallery',
    props: {
      meetings: Array,
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
  .meeting {
    margin: 0 0 0em;
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
