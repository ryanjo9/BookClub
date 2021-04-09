<template>
<div>
  <div class="club" v-for="club in clubs" v-bind:key="club.id">

    <router-link :to="{ name: 'club', params: {clubId: club.id} }">
      <p class="clubName">{{club.name}}</p>
      <div v-if="club.activeBook">
      <img :src="club.activeBook.imgsrc" />
      </div>
    </router-link>

    <p class="clubDate">
      <span v-if="club.mod.username">Mod: {{club.mod.username}}, </span>
      {{formatDate(club.created)}}
    </p>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ClubGallery',
  props: {
    clubs: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
.clubName {
  margin: 0px;
  font-size: 1.2em;
}

.clubDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.club {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.club img {
  max-width: 200px;
  max-height: 400px;
  image-orientation: from-image;
}
</style>
