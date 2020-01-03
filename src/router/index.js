import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import Post from '@/components/Post'
import Home from '@/components/Home'

Vue.use(Router)

//Define routers
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          // posts will be rendered inside home's <router-view>
          path: '/',
          component: Posts
        },
        {
          // Postes will be rendered inside Home's <router-view>
          // when /user/:id/profile is matched
          path: 'posts',
          component: Posts
        },
        {
          // post will be rendered inside Home's <router-view>
          // when /user/:id/posts is matched
          path: '/post/:id',
          component: Post
        }
      ]
    },
    { 
      path: '*',
      redirect: '/' 
    }
  ]
})
