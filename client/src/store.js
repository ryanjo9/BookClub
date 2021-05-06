import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    clubs: [],
    filteredClubs: [],
    book: null,
    posts: [],
    post: null,
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
    setPost(state, post) {
      state.post = post
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
      state.comments.push(comment);
    },
    setFilteredClubs(state, clubs) {
      state.filteredClubs = clubs
    },
    clearFilteredClubs(state) {
      state.filteredClubs = []
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
      try {
        const { data: club } = await axios.post('/api/clubs', data);
        return club;
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getClub(context, data) {
      try {
        if (data) {
          let response = await axios.get("/api/clubs/" + data);
          context.commit('setClubs', [response.data]);
          context.commit('setBook', response.data.activeBook)
        }
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllClubs(context) {
      try {
        const response = await axios.get('/api/clubs/all');
        context.commit('setClubs', response.data)
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUserClubs(context) {
      try {
        let response = await axios.get("/api/clubs");
        context.commit('setClubs', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async joinClub(context, data) {
      try {
        await axios.put(`/api/clubs/${data}/member`)
      } catch (error) {
        return ''
      }
    },
    async startBook(context, data) {
      try {
        const { clubId } = data
        const bookData = {
          title: data.title,
          imgsrc: data.imgsrc
        }

        await axios.post(`/api/books/${clubId}`, bookData);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async updateBook(context, data) {
      console.log(data)
      console.log(context)
    },
    async completeBook(context, data) {
      console.log(data)
      console.log(context)
    },
    async getBookById(context, data) {
      try {
        let response = await axios.get(`/api/books/${data}`);
        context.commit('setBook', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async addPostToBook(context, data) {
      try {
        const response = await axios.post(`/api/posts/${data.bookId}`, { text: data.text });
        
        context.commit('setPosts', [response.data])
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getBookPosts(context, data) {
      try {
        let response = await axios.get(`/api/posts/book/${data}`);
        context.commit('setPosts', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getUserPosts(context) {
      try {
        let response = await axios.get("/api/posts");
        context.commit('setPosts', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getPostById(context, data) {
      try {
        let response = await axios.get(`/api/posts/${data}`);
        context.commit('setPost', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getPostComments(context, data) {
      try {
        let response = await axios.get(`/api/comments/post/${data}`);
        context.commit('setComments', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async addComment(context, data) {
      try {
        const response = await axios.post(`/api/comments/${data.postId}`, { text: data.text });
        context.commit('addComment', response.data)
        return "";
      } catch (error) {

        return error
      }
    },
    async getUserComments(context, data) {
      console.log(data)
      console.log(context)
    },
    async searchClubs(context, data) {
      const { clubs } = context.state

      const filteredClubs = clubs.filter((club) => {
        return club.activeBook.title.toLowerCase().includes(data) ||
               club.mod.username.toLowerCase().includes(data)     ||
               club.name.toLowerCase().includes(data)
      })

      context.commit('setFilteredClubs', filteredClubs)
    },
    async clearSearchClubs(context) {
      console.log('clearing searchCLubs')
      context.commit('clearFilteredClubs')
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
    }
  }
})