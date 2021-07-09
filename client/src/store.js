import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    club: null,
    clubs: [],
    book: null,
    books: [],
    meeting: null,
    meetings: [],
    filteredClubs: [],
    posts: [],
    post: null,
    comments: [],
    /////////////
    photos: []
  },
  mutations: {
    ///// USER /////
    setUser(state, user) {
      state.user = user;
    },
    ///// CLUB /////
    setClub(state, club) {
      state.club = club
    },
    setClubs(state, clubs) {
      state.clubs = clubs
    },
    ///// BOOK /////
    setBooks(state, books) {
      state.books = books
    },
    setBook(state, book) {
      state.book = book
    },
    ///// MEETING /////
    setMeetings(state, meetings) {
      state.meetings = meetings
    },
    setMeeting(state, meeting) {
      state.meeting = meeting
    },
    ///// POST /////
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
    ///// USER /////
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
    ///// CLUB /////
    async createClub(context, data) {
      try {
        const { data: club } = await axios.post('/api/clubs', data);
        return club;
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getClub(context, clubId) {
      try {
        if (clubId) {
          let response = await axios.get(`/api/clubs/${clubId}`);
          context.commit('setClub', response.data);
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
        await axios.post(`/api/clubs/${data}/join`)
      } catch (error) {
        return ''
      }
    },
    ///// BOOK ////
    async getClubBooks(context, clubId) {
      try {
        const response = await axios.get(`/api/books/club/${clubId}`)

        context.commit('setBooks', response.data)
      } catch (error) {
        return []
      }
    },
    async addBookToClub(context, data) {
      try {
        const { clubId } = data
        const bookData = {
          title: data.title,
          imgSrc: data.imgSrc
        }

        await axios.post(`/api/books/${clubId}`, bookData)
      } catch (error) {
        return error
      }
    },
    async getBookMeetings(context, bookId) {
      try {
        const response = await axios.get(`/api/meetings/book/${bookId}`)

        context.commit('setMeetings', response.data)
      } catch (error) {
        return error
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
    async getBookById(context, bookId) {
      try {
        let response = await axios.get(`/api/books/${bookId}`);
        context.commit('setBook', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    ///// MEETING /////
    async addMeetingToBook(context, data) {
      try {
        const { bookId } = data
        const meetingData = {
          reading: data.reading,
          startDate: data.startDate,
          endDate: data.endDate
        }

        await axios.post(`/api/meetings/${bookId}`, meetingData)
      } catch (error) {
        return error
      }
    },
    async getMeetingById(context, meetingId) {
      try {
        let response = await axios.get(`/api/meetings/${meetingId}`);
        context.commit('setMeeting', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getMeetingPosts(context, meetingId) {
      try {
        const response = await axios.get(`/api/posts/meeting/${meetingId}`)

        context.commit('setPosts', response.data)
      } catch (error) {
        return error
      }
    },
    ///// POST /////
    async addPostToMeeting(context, data) {
      try {
        const { meetingId } = data
        const postData = {
          text: data.text
        }
        
        await axios.post(`/api/posts/${meetingId}`, postData)
      } catch (error) {
        return error
      }
    },
    ///// OLD /////
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