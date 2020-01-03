<template>
  <div>
    <div v-if="!posts.length" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <h4>Related Posts</h4>
    <div v-bind:key="post.id" v-for="post in posts">
      <div>
        <router-link
          class="text-decoration-none"
          :to="{ path: `/post/${post.id}`, query: {id: post.id, slug: post.slug }}"
        >
          <b-card-text v-html="post.title"></b-card-text>
        </router-link>
      </div>
      <br />
    </div>
    <br />
  </div>
</template>

<script>
//axios For api call
import axios from "axios";

//Export
export default {
  name: "RelatedPosts",
  data() {
    return {
      postsUrl:
        "https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts",
      posts: [],
      per_page: 3,
      msg: ""
    };
  },
  mounted() {
    this.getPosts();
  },
  watch: {
    $route: function() {
      this.getPosts();
    }
  },
  methods: {
    getPosts() {
      //Make call
      axios
        .get(this.postsUrl, {
          //Set paramaeters
          params: {
            order: "DESC",
            number: this.per_page,
            term: this.$route.query.slug
          }
        })
        .then(res => {
          try {
            //Set empty
            this.posts = [];
            //Create required object
            res.data.posts.forEach(post => {
              this.posts.push({
                id: post.ID,
                title: post.title,
                slug: post.slug
              });
            });
          } catch {
            this.msg = "Technical error .Please try again.";
          }
        })
        .catch(error => {
          this.msg = error;
        });
    }
  }
};
</script>

