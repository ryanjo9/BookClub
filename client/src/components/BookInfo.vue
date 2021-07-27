<template>
  <div class="bookInfo" v-if="book">
    <router-link :to="{ name: 'book', params: {bookId: bookId} }">
      <p>{{ book.title }}</p>
      <img :src="book.imgSrc" />
    </router-link>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'bookInfo',
  props: {
    bookId: String,
    user: Object
  },
  async created() {
    if (!this.book) {
      await this.$store.dispatch('getBookById', this.bookId)

      if (!this.club || this.club._id !== this.book.club) {
        await this.$store.dispatch('getClub', this.book.club)
      }
    }
  },
  computed: {
    book() {
      return this.$store.state.book
    },
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
  .bookInfo {
    background: #ffffff;
    border-radius: 4px;
    text-align: center;
    padding-left: 15px;
    padding-right:15px;
    border: 1px solid transparent;
    width: 312px;
  }

  .bookInfo:hover {
    border: 1px solid #adadad;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #000
  }

  img {
    max-width: 150px;
    max-height: 200px;
    image-orientation: from-image;
  }
</style>