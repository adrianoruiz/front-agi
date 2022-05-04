<template>
  <q-layout class="bg-primary">
    <Header />
    <SubHeader />

    <Loading v-if="loading" />

    <div v-else class="flex justify-start bg-primary">
      <template v-for="film in films" :key="film">
        <q-card
          clickable="true"
          @click="showData(film.url)"
          class="shadow-1 size-card q-mb-md cursor-pointer"
        >
          <q-card-section class="q-pa-sm">
            <img width="100" src="images/no-image.jpeg" :alt="film.alt" />
            <p class="text-center text-caption text-bold">
              {{ film.title }}
            </p>
          </q-card-section>
        </q-card>
      </template>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from 'src/services/api';
import Header from 'components/molecules/Header.vue';
import SubHeader from 'components/molecules/SubHeader.vue';
import Loading from 'components/molecules/Loading.vue';

export default defineComponent({
  components: { Header, SubHeader, Loading },
  setup() {
    const films = ref([]);
    const loading = ref(true);

    const fetchFilms = async () => {
      const response = await api.get('/films');
      films.value = response.data.results;
      loading.value = false;
    };

    const router = useRouter();

    const showData = (url: string) => {
      const id = url.substring(url.length - 2, url.length - 1);
      void router.push(`/film/${id}`);
    };

    onMounted(fetchFilms);

    return { films, showData, loading };
  },
});
</script>

<style scoped>
.size-card {
  width: 115px;
  margin: 5px;
  border-bottom-right-radius: 15px;
}
</style>
