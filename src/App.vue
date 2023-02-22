<template>
  <v-app>
    <v-main>
      <HomeMovie/>
    </v-main>
  </v-app>
</template>

<script>
import HomeMovie from "@/views/HomeMovie.vue";

export default {
  name: 'App',
  components: {
    HomeMovie,
  },
};
</script>
