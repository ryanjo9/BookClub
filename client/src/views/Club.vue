<template>
  <div class="club">
    <div class="members">
      <p>Members</p>
      <div v-for="member in club.members" v-bind:key="member._id">
        <p> {{ member.username }} </p>
      </div>
    </div>

    <div class="books">
      <div class="header">
        <div class="create">
          <p>
            <a @click="toggleUpload">Start a New Book <i class="fas fa-book"></i></a>
          </p>
        </div>
        <escape-event @escape="escape"></escape-event>
        <book-uploader :show="show" @escape="escape" @uploadFinished="uploadFinished" />
      </div>
      <book-gallery :books="books" :user="user" @joinClub="joinClub"/>
    </div>

    <div class="clubInfo">
      <p>Club Stats</p>
      <p>Created: {{ formatDate(club.created) }}</p>
      <p># of Books: {{ club.books.length }}</p>
      <p># of Members: {{ club.members.length }}</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import BookGallery from '@/components/BookGallery.vue'
import BookUploader from '@/components/BookUploader.vue'
import EscapeEvent from '@/components/EscapeEvent.vue';

export default {
    name: 'club',
    components: {
      BookGallery,
      BookUploader,
      EscapeEvent,
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      club() {
        return this.$store.state.club
      },
      books() {
        return this.$store.state.books
      }
    },
    async created() {
      await this.$store.dispatch("getUser");
      await this.$store.dispatch("getClub", this.$route.params.clubId);
      await this.$store.dispatch("getClubBooks", this.$route.params.clubId)
    },
    data() {
      return {
        text: '',
        error: '',
        show: false,
      }
    },
    methods: {
      async joinClub(clubId) {
        console.log('club join club received: ', clubId)
        await this.$store.dispatch('joinClub', clubId)
        await this.$store.dispatch('getClub', this.$route.params.clubId)
      },
      async uploadFinished() {
        this.show = false

        await this.$store.dispatch('getClubBooks', this.$route.params.clubId)
      },
      toggleUpload() {
        this.show = true
      },
      escape() {
        this.show = false
      },
      formatDate(date) {
        if (moment(date).diff(Date.now(), 'days') < 15)
          return moment(date).fromNow();
        else
          return moment(date).format('d MMMM YYYY');
      },
    }
}
</script>

<style scoped>
.club {
  display: flex;
  min-height: 0;
  align-items: flex-start;
}

.books {
  margin-left:  40px;
  margin-right: 40px;
  overflow-y: scroll;
}

a {
  cursor: pointer;
}

.header {
  display: grid;
}

.header a {
  color: #222;
  font-size: 1.5em;
}

.header svg {
  margin-top: 12px;
}

.create {
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
}

.create:hover {
  border: 1px solid #adadad;
}

.members {
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  padding-left: 15px;
  padding-right:15px;
}

.clubInfo {
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  padding-left: 15px;
  padding-right:15px;
}
</style>
