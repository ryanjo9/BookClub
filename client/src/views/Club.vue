<template>
  <div class="club">
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
</template>

<script>
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
      }
    }
}
</script>

<style scoped>

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
}

.create:hover {
  border: 1px solid #adadad;
}
</style>
