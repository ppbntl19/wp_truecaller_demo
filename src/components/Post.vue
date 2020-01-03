<template>
  <div>
    <div v-if="!post" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading... "></b-spinner>
    </div>
    <div v-if="msg" class="d-flex justify-content-center mb-3">
      <div class="alert alert-info" role="alert">{{msg}}</div>
    </div>
    <div v-if="post">
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

        <h3>
          Posted By
          <b-link :href="post.author && post.author.profile_URL">{{post.author && post.author.name}}</b-link>
        </h3>
        <b-card :img-src="post.featured_image" img-alt="Card image" img-top></b-card>
        <b-card-text v-html="post.content"></b-card-text>
      </b-card>
    </div>
    <br />
  </div>
</template>

<script>
//Api request
import axios from "axios";
//Moment for date  formating
import moment from "moment";
//Export
export default {
  name: "Post",
  data() {
    return {
      postUrl:
        "https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/",
      post: "",
      msg: ""
    };
  },
  props: ["id", "title"],
  mounted() {
    //Get post
    this.getPost();
  },
  watch: {
    $route: function() {
      this.getPost();
    }
  },
  methods: {
    getPost() {
      axios
        .get(this.postUrl + this.$route.params.id, {
          params: {}
        })
        .then(res => {
          try {
            //Set msg
            if (res.data.error) {
              this.msg = "Post not found.";
              return;
            }
            //set data
            this.post = res.data;
            //Get time
            this.post.date_from_now = moment(this.post.date)
              .startOf("hour")
              .fromNow();
            //Date
            this.post.date_created = moment(this.post.date).format(
              "MMMM Do YYYY, h:mm:ss a"
            );
          } catch (err) {
            //Set msg
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

