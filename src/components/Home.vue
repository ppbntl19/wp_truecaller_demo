<template>
  <b-container>
    <b-row>
      <b-col cols="8">
        <router-view></router-view>
      </b-col>
      <b-col cols="4">
        <b-row v-if="$route.params.id">
          <hr />
          <hr />
          <b-col cols="12">
            <RelatedPosts />
          </b-col>
        </b-row>
        <hr />
        <hr />
        <b-row>
          <b-col cols="12">
            <Tags />
          </b-col>
        </b-row>
        <hr />
        <hr />
        <b-row>
          <b-col cols="12">
            <Categories />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
//Component
import Categories from "@/components/Categories";
import Tags from "@/components/Tags";
import RelatedPosts from "@/components/RelatedPosts";

//Export
export default {
  name: "Home",
  components: { Categories, Tags, RelatedPosts }
};
</script>

