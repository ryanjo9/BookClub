<template>
<div class="home">
  <div class="search">
    <div class="clearButton" v-if='searched'>
      <form @submit.prevent.stop="clearSearch">
        <button>{{searched}} x</button>
      </form>
    </div>
    <div v-else>
      <form @submit.prevent.stop="search">
        <input type="text" v-model="searchTerm" placeholder="Search" required>
      </form>
    </div>
  </div>
  <club-gallery :clubs="clubs" :user="user" @joinClub="joinClub"/>
</div>
</template>

<script>
// @ is an alias to /src
// import ImageGallery from '@/components/ImageGallery.vue'
import ClubGallery from '@/components/ClubGallery.vue'

export default {
  name: 'home',
  components: {
    ClubGallery
  },
  data() {
    return {
      searched: '',
      searchTerm: ''
    }
  },
  computed: {
    clubs() {
      if (this.searched) {
        return this.$store.state.filteredClubs
      }
      return this.$store.state.clubs;
    },
    user() {
      return this.$store.state.user
    }
  },
  async created() {
    await this.$store.dispatch('getUser');
    await this.$store.dispatch("getAllClubs");
  },
  methods: {
    async search() {
      console.log("searchTerm: ", this.searchTerm)
      await this.$store.dispatch('searchClubs', this.searchTerm.toLowerCase())
      this.searched = this.searchTerm
      this.searchTerm = ''
    },
    async clearSearch() {
      console.log('button hit')
      await this.$store.dispatch('clearSearchClubs')
      this.searched = ''
    },
    async joinClub(clubId) {
      console.log('join club received: ', clubId)
      await this.$store.dispatch('joinClub', clubId)
      await this.$store.dispatch('getAllClubs')
    }
  }
}

</script>

<style scoped>
  .home {
    margin: auto;
  }

  .search {
    margin: 0 0 1.0em;
    display: grid;
    width: 100%;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid transparent;
    min-width: 300px;
  }

  .search:hover {
    border: 1px solid #adadad;
  }

  input, input:focus {
    outline: none;
    border: none;
    width: 100%;
  }

  form {
    width: 100%;
  }

  .clearButton button {
    outline: none;
    border: 1px solid transparent;
    margin-top: 3px;
    font-size: 16px;
    border-radius: 4px;
  }
</style>