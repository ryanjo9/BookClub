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
    async getPostById(context, postId) {
      try {
        let response = await axios.get(`/api/posts/${postId}`);
        context.commit('setPost', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    ///// COMMENTS /////
    async getPostComments(context, postId) {
      try {
        const response = await axios.get(`/api/comments/post/${postId}`)
        context.commit('setComments', response.data)
      } catch (error) {
        return error
      }
    },
    async addCommentToPost(context, data) {
      try {
        const { postId } = data
        const commentData = {
          text: data.text
        }
        
        await axios.post(`/api/comments/${postId}`, commentData)
      } catch (error) {
        return error
      }
    },
    ///// SEARCH /////
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
    }
  }
})