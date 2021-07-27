<template>
  <div class="clubInfo" v-if="club">
    <router-link :to="{ name: 'club', params: {clubId: clubId} }">
      <p>Club Stats</p>
      <p>Created: {{ formatDate(club.created) }}</p>
      <p># of Books: {{ club.books.length }}</p>
      <p># of Members: {{ club.members.length }}</p>
    </router-link>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'clubInfo',
  props: {
    clubId: String,
    user: Object
  },
  async created() {
    if (!this.club) {
      await this.$store.dispatch('getClub', this.clubId)
    }
  },
  computed: {
    club() {
      return this.$store.state.club
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
  .clubInfo {
    background: #ffffff;
    border-radius: 4px;
    text-align: center;
    border: 1px solid transparent;
    width: 312px;
  }

  .clubInfo:hover {
    border: 1px solid #adadad;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #000
  }
</style>
