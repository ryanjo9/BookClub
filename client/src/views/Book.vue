<template>
  <div class="book" v-if="book">
    <div class="meetings">
      <div class="create" @click="toggleUpload">
          <a>New Meeting <i class="fa fa-users" /></a>
      </div>
      <escape-event @escape="escape" />
      <meeting-uploader :show="show" @escape="escape" />
      <meeting-gallery :meetings="meetings" :user="user" />
    </div>
    
    <div>
      <book-info :bookId="book._id" :user="user" />
      <club-info :clubId="book.club" :user="user"/>
    </div>
  </div>
</template>

<script>
import MeetingGallery from '@/components/MeetingGallery.vue'
import EscapeEvent from '../components/EscapeEvent.vue';
import MeetingUploader from '../components/MeetingUploader.vue';
import ClubInfo from '@/components/ClubInfo.vue'
import BookInfo from '../components/BookInfo.vue'

export default {
  name: 'book',
  components: {
    MeetingGallery,
    EscapeEvent,
    MeetingUploader,
    ClubInfo,
    BookInfo
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    book() {
      return this.$store.state.book
    },
    meetings() {
      return this.$store.state.meetings
    }
  },
  async created() {
    await this.$store.dispatch('getUser');
    await this.$store.dispatch('getBookById', this.$route.params.bookId);
    await this.$store.dispatch('getBookMeetings', this.$route.params.bookId)
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    toggleUpload() {
      this.show = true
    },
    escape() {
      this.show = false
    },
    async uploadFinished() {
      this.show = false

      await this.$store.dispatch('getBookMeetings', this.$route.params.bookId)
    }
  }
}
</script>

<style scoped>
a {
  cursor: pointer;
}

.book {
  display: flex;
  min-height: 0;
  align-items: flex-start;
}

.meetings {
  margin-left:  40px;
  margin-right: 40px;
  overflow-y: scroll;
  width: 312px;
}

.create {
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid transparent;
}

.create:hover {
  border: 1px solid #adadad;
  cursor: pointer;
}

.bookInfo {
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  margin-right: 15px;
}
</style>
