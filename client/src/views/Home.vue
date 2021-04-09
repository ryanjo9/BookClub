<template>
<div class="home">
  <club-gallery :clubs="clubs" />
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
  computed: {
    clubs() {
      return this.$store.state.clubs;
    }
  },
  async created() {
    await this.$store.dispatch("getAllClubs");
  },
}
</script>
