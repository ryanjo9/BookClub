<template>
<div>
  <div  v-for="club in clubs" v-bind:key="club.id">
    <router-link :to="{ name: 'club', params: {clubId: club.id} }">
      <div class="club">
        <div v-if="club.activeBook">
          <img :src="club.activeBook.imgsrc" />
        </div>
        <div class="clubInfo">
          <p class="clubName">{{club.name}}</p>
          <p class="clubDate">
            <span v-if="club.mod.username">Mod: {{club.mod.username}}, </span>
          </p>
          <p class="clubDate">
            Created: {{formatDate(club.created)}}
          </p>
          <p class="clubMembers">
            Members: {{ club.members.length}}
          </p>
          <p class="clubDate" v-if="club.activeBook">
            Book: {{club.activeBook.title}}
          </p>
          <div class="joinClub" v-if="!isMember(club.members)" v-on:click.stop>
            <form @submit.prevent.stop="joinClub(club.id)">
              <button><i class="fas fa-plus-circle"/> Join</button>
            </form>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ClubGallery',
  props: {
    clubs: Array,
    user: Object,
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    isMember(members) {
      if (!this.user) {
        return false
      }

      const memberUser = members.filter(m => {
        return m.username === this.user.username
      })

      return Boolean(memberUser.length)
    },
    joinClub(clubId) {
      this.$emit('joinClub', clubId)
    }
  }
}
</script>

<style scoped>
.clubInfo {
  margin-left: 8px;
}

a {
  text-decoration: none;
  color: #000

}

.clubName {
  margin: 0px;
  font-size: 1.2em;
}

.clubMembers {
  font-size: 0.9em;
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
  margin: 0 0 1.0em;
  display: flex;
  width: 100%;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid transparent;
}

.club:hover {
  border: 1px solid #adadad;
}

.club img {
  max-width: 150px;
  max-height: 200px;
  image-orientation: from-image;
}

.joinClub button {
  outline: none;
  border: 1px solid transparent;
  margin-top: 3px;
  font-size: 16px;
  border-radius: 4px;
}

.joinClub button:hover {
  border: 1px solid #adadad;
}
</style>
