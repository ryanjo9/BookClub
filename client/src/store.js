import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    clubs: [],
    book: null,
    posts: [],
    comments: [],
    /////////////
    photos: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setClubs(state, clubs) {
      state.clubs = clubs
    },
    setBook(state, book) {
      state.book = book
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    addPost(state, post) {
      state.post.push(post)
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    addComment(state, comment) {
      state.commments.push(comment);
    },

    /////////////
    setPhotos(state, photos) {
      state.photos = photos;
    }    
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async createClub(context, data) {
      console.log(data)
      console.log(context)
    },
    async getClub(context, data) {
      console.log(data)
      console.log(context)
    },
    async getAllClubs(context, data) {
      console.log(data)
      console.log(context)
    },
    async getUerClubs(context, data) {
      console.log(data)
      console.log(context)
    },
    async joinClub(context, data) {
      console.log(data)
      console.log(context)
    },
    async startBook(context, data) {
      console.log(data)
      console.log(context)
    },
    async updateBook(context, data) {
      console.log(data)
      console.log(context)
    },
    async completeBook(context, data) {
      console.log(data)
      console.log(context)
    },
    async getBook(context, data) {
      console.log(data)
      console.log(context)
    },
    async addPostToBook(context, data) {
      console.log(data)
      console.log(context)
    },
    async getBookPosts(context, data) {
      console.log(data)
      console.log(context)
    },
    async getUserPosts(context, data) {
      console.log(data)
      console.log(context)
    },
    async getPostById(context, data) {
      console.log(data)
      console.log(context)
    },
    async getPostComments(context, data) {
      console.log(data)
      console.log(context)
    },
    async addComment(context, data) {
      console.log(data)
      console.log(context)
    },
    async getUserComments(context, data) {
      console.log(data)
      console.log(context)
    },


    ////////
    async upload(context, data) {
      try {
        await axios.post('/api/photos', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getMyPhotos(context) {
      try {
        let response = await axios.get("/api/photos");
        context.commit('setPhotos', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllPhotos(context) {
      try {
        let response = await axios.get("/api/photos/all");
        context.commit('setPhotos', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getPhoto(context, data) {
      try {
        if (data) {
          let response = await axios.get("/api/photos/one/" + data);
          context.commit('setPhotos', response.data);
        }
        return "";
      } catch (error) {
        return "";
      }
    },
    async getComments(context, data) {
      try {
        if (data) {
          let response = await axios.get("/api/comments/" + data);
          context.commit('setComments', response.data);
        }
        return "";
      } catch (error) {
        return "";
      }
    }
  }
})