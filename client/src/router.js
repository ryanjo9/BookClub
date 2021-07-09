import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import MyPage from './views/MyPage.vue'
import Login from './views/Login.vue'
import Photo from './views/Photo.vue'
import Club from './views/Club.vue'
import Post from './views/Post.vue'
import Book from './views/Book.vue'
import Meeting from './views/Meeting.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'mypage',
      component: MyPage,
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/photo',
      name: 'photo',
      component: Photo
    },
    {
      path: '/club/:clubId',
      name: 'club',
      component: Club
    },
    {
      path: '/post/:postId',
      name: 'post',
      component: Post
    },
    {
      path: '/book/:bookId',
      name: 'book',
      component: Book
    },
    {
      path: '/meeting/:meetingId',
      name: 'meeting',
      component: Meeting
    }
  ]
})