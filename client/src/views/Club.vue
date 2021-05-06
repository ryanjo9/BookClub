<template>
  <div class="home">
    <club-gallery :clubs="clubs" :user="user" @joinClub="joinClub"/>

    <posts :posts="posts" :user="user" :club="clubs[0]" @joinClub="joinClub"/>
</div>
</template>

<script>
import ClubGallery from '@/components/ClubGallery.vue'
import Posts from '@/components/Posts.vue'

export default {
    name: 'club',
    components: {
      ClubGallery,
      Posts
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      clubs() {
        return this.$store.state.clubs
      },
      posts() {
        return this.$store.state.posts
      },
      comments() {
        return this.$store.state.comments
      }
    },
    async created() {
      await this.$store.dispatch("getUser");
      await this.$store.dispatch("getClub", this.$route.params.clubId);
      await this.$store.dispatch("getBookPosts", this.$store.state.book.id)
    },
    data() {
      return {
        text: '',
        error: '',
      }
    },
    methods: {
      escape() {
        this.show = false;
      },
      async joinClub(clubId) {
        console.log('club join club received: ', clubId)
        await this.$store.dispatch('joinClub', clubId)
        await this.$store.dispatch('getClub', this.$route.params.clubId)
      }
    }
}
</script>
