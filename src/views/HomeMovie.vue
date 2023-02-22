<template>
    <v-container>
      <h2 class="mt-2 grey--text">Popular Movie</h2>
      <v-row>
        <v-col
            col="12"
            sm="3"
            v-for="item in listPopularMovie"
            :key="item.id">
          <card-movie
              :title="item.title"
              :date="item.date"
              :vote-average="item.voteAverage"
              :image="item.posterPath"
          />
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import CardMovie from "@/components/CardMovie.vue";
import PopularMovieService from "@/usecases/PopularMovieService";

export default {
  name: "HomeMovie",
  components: {CardMovie},
  data() {
    return {
      listPopularMovie: []
    }
  },
  computed: {
    responsiveMovie() {
      return this.$vuetify.breakpoint.xs ? 'movie-scoll' : 'movie-list'
    },
    responsiveBillboard() {
      return this.$vuetify.breakpoint.xs ? 'home-screen' : 'home-video'
    }
  },
  mounted() {
    this.fetchPopularMovie()
  },
  methods: {
    async fetchPopularMovie() {
      const response = await PopularMovieService.getListPopularMovies()
      if (response.code === 200) {
        this.listPopularMovie = response.data.results
      }
    }
  }
}
</script>
<style>
</style>
