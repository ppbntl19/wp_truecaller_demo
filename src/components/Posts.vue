<template>
  <div>
    <div v-if="!posts.length" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-if="msg" class="d-flex justify-content-center mb-3">
      <div class="alert alert-info" role="alert">{{msg}}</div>
    </div>
    <div v-bind:key="post.id" v-for="post in posts">
      <div>
        <b-card
          border-variant="light"
          align="left"
          :title="post.title"
          :sub-title="post.date_from_now"
          sub-title-text-variant="muted"
        >
          <small class="divider">{{post.date_created}}</small>
          <br />
          <a href="#">
            <span class="glyphicon glyphicon-thumbs-up">{{post.like_count}} likes</span>
          </a>

          <h5 class="text-muted">
            <small>Posted By</small>
            <b-link :href="post.profile_URL">{{post.author_name}}</b-link>
          </h5>
          <router-link
            class="text-decoration-none"
            :to="{ path: `post/${post.id}`, query: {id: post.id,slug: post.slug }}"
          >
            <b-card-text v-html="post.excerpt"></b-card-text>
            <b-card img-height="350px" :img-src="post.post_thumbnail" img-alt="Card image" img-top></b-card>
          </router-link>
        </b-card>
      </div>
      <br />
    </div>
    <br />
    <div class="mt-3">
      <b-pagination :total-rows="rows" v-model="currentPage" :per-page="per_page" size="lg"></b-pagination>
    </div>
  </div>
</template>

<script>
//axios For api call
import axios from "axios";
//Moment for date  formating
import moment from "moment";

//Export
export default {
  name: "Posts",
  data() {
    return {
      postsUrl:
        "https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts",
      posts: [],
      tag: "",
      category: "",
      per_page: 25,
      rows: "",
      currentPage: 1,
      msg: ""
    };
  },
  mounted() {
    this.getPosts();
  },
  watch: {
    currentPage: {
      handler: function() {
        //Get post based on page
        this.getPosts();
      }
    },
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
            page: this.currentPage,
            number: this.per_page,
            tag: this.$route.query.tag,
            category: this.$route.query.category
          }
        })
        .then(res => {
          try {
            //Set empty
            this.posts = [];
            //Set msg
            if (res.data.posts && res.data.posts.length === 0) {
              this.msg = "Posts not found.";
              return;
            }
            //Create required object
            res.data.posts.forEach(post => {
              this.posts.push({
                id: post.ID,
                author_name: post.author && post.author.name,
                profile_URL: post.author && post.author.profile_URL,
                date_from_now: moment(post.date)
                  .startOf("hour")
                  .fromNow(),
                date_created: moment(post.date).format(
                  "MMMM Do YYYY, h:mm:ss a"
                ),
                title: post.title,
                url: post.URL,
                slug: post.slug,
                excerpt: post.excerpt,
                like_count: post.like_count,
                post_thumbnail: post.post_thumbnail && post.post_thumbnail.URL
              });
            });
            //Total number of records
            this.rows = res.data.found;
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

