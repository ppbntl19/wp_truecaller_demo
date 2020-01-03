<template>
  <div>
    <div v-if="!categories.length" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <h2>Categories</h2>
    <b-list-group v-bind:key="category.ID" v-for="category in categories">
      <router-link replace
        :to="{ path:'/posts', query: {name:category.name, category:category.slug, id: category.id, title: category.title }}"
      >
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        {{category.name}}
        <b-badge variant="primary" pill>{{category.post_count}}</b-badge>
      </b-list-group-item>
      </router-link>

    </b-list-group>
  </div>
</template>

<script>
//axios for api call
import axios from "axios";
//Export
export default {
  name: "Categories",
  data() {
    return {
      postsUrl:
        "https://public-api.wordpress.com/rest/v1.1/sites/107403796/categories",
      categories: [],
      per_page: 10
    };
  },
  mounted() {
    //Get Categories
    this.getCategories();
  },
  methods: {
    getCategories() {
      axios
        .get(this.postsUrl, {
          params: { number: this.per_page }
        })
        .then(res => {
          //Set data to view
          this.categories = res.data.categories;
        });
    }
  },
  created: function() {}
};
</script>

