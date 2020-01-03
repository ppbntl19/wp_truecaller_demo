<template>
  <div>
    <div v-if="!tags.length" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <h4>Popular Tags</h4>
    <label  v-bind:key="tag.ID" v-for="tag in tags">
      <router-link
        :to="{ path:'/posts', query: {name:tag.name,tag:tag.slug, id: tag.id, title: tag.title }}"
      >
        <b-badge variant="secondary">{{tag.name}} {{tag.post_count}}</b-badge>
      </router-link>
    </label>
  </div>
</template>

<script>
//axios for api call
import axios from "axios";
export default {
  name: "Tags",
  data() {
    return {
      postsUrl:
        "https://public-api.wordpress.com/rest/v1.1/sites/107403796/tags",
      tags: [],
      per_page: 10
    };
  },
  mounted() {
    this.getTags();
  },
  methods: {
    getTags() {
      //Get tags
      axios
        .get(this.postsUrl, {
          params: { order: "DESC", order_by: "count", number: this.per_page }
        })
        .then(res => {
          //Set tags
          this.tags = res.data.tags;
        });
    }
  },
  created: function() {}
};
</script>

