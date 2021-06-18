<template>
  <div>
    <div class="books" v-for="book in books" v-bind:key="book._id">
      <router-link :to="{ name: 'book', params: {bookId: book._id} }">
        <div class="book">
          <img :src="book.imgSrc" />
          <p>{{ book.title }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BookGallery',
  props: {
    books: Array,
    user: Object
  },
  methods: {

  }
}
</script>

<style scoped>
  .books img {
    max-width: 150px;
    max-height: 200px;
    image-orientation: from-image;
  }

  .book {
    margin: 0 0 1.0em;
    display: flex;
    width: 100%;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid transparent;
  }

  .book:hover {
    border: 1px solid #adadad;
  }
</style>
