<template>
  <q-layout class="bg-primary">
    <Header />
    <SubHeader />

    <Loading v-if="loading" />

    <div class="flex justify-start bg-primary">
      <template v-for="character in characters" :key="character">
        <q-card
          clickable="true"
          @click="showData(character.url)"
          class="shadow-1 size-card q-mb-sm cursor-pointer"
        >
          <q-card-section class="q-pa-sm">
            <img width="100" src="images/no-image.jpeg" :alt="character.alt" />
            <p class="text-center text-caption text-bold">
              {{ character.name }}
            </p>
          </q-card-section>
        </q-card>
      </template>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import Header from 'components/molecules/Header.vue';
import Loading from '../components/molecules/Loading.vue';
import SubHeader from 'src/components/molecules/SubHeader.vue';
// import { Character } from 'src/models';

export default defineComponent({
  components: { Header, SubHeader, Loading },
  setup() {
    const characters = ref([]);
    console.log(characters);
    const loading = ref(true);

    const fetchCharacters = async () => {
      const response = await api.get('/people');
      characters.value = response.data.results;
      loading.value = false;
    };

    const router = useRouter();

    const showData = (url: string) => {
      const id = url.substring(url.length - 2, url.length - 1);
      void router.push(`/person/${id}`);
    };

    onMounted(fetchCharacters);

    return { characters, showData, loading };
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
