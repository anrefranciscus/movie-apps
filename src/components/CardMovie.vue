<template>
  <v-hover
      v-slot="{hover}"
      open-delay="200"
  >
    <v-card :elevation="hover ? 16:2" :class="{'on-hover' : hover}">
      <div >
        <v-img :src="posterImage" alt="" class=""></v-img>
      </div>
      <v-card-title class="subtitle-2">{{title}}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating :value="voteAverage / 2" color="amber" dense half-increments readonly size="14">
          </v-rating>
          <div class="grey--text ml-4">
            {{voteAverage * 10}} % | {{date}}
          </div>
        </v-row>
<!--        <div class="my-4 subtitle-2">-->
<!--              <span v-for="(genre, index) in movie.genre_ids" :key="genre">-->
<!--                  {{genreTypeName(genre, index)}}-->
<!--              </span>-->
<!--        </div>-->
      </v-card-text>
    </v-card>

  </v-hover
  >

</template>

<script>
import PopularMovieService from "@/usecases/PopularMovieService";

export default {
  name: "CardMovie",
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    voteAverage: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
  },
  computed: {
    posterImage() {
      return PopularMovieService.getPosterPath(this.image)
    }
  }
}
</script>
