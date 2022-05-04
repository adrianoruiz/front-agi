<template>
  <q-layout class="bg-primary">
    <div class="bg-secondary" style="height: 150px">
      <q-toolbar>
        <q-space />
        <q-btn flat round dense class="q-mr-xs">
          <q-icon
            size="10"
            color="black"
            name="mdi-arrow-left"
            clickable
            @click="$router.back()"
          />
        </q-btn>
      </q-toolbar>
    </div>

    <Loading v-if="loading" />
    <div v-else>
      <TailCard class="q-mb-md">
        <img
          src="images/no-image.jpeg"
          alt="Character"
          class="img-character shadow-8"
        />

        <q-card-section class="full-width">
          <div style="width: 85%">
            <h5
              class="text-bold text-uppercase border-name-character text-center"
            >
              {{ state.specie.name }}
            </h5>
          </div>
        </q-card-section>
        <q-card-section class="full-width">
          <div class="q-pb-md" style="margin-top: -30px">
            <p class="text-grey-6 text-center text-uppercase">
              {{ state.specie.designation }}
            </p>
          </div>
        </q-card-section>
      </TailCard>

      <span
        class="q-ml-lg text-uppercase text-grey-8 text-weight-bold"
        style="font-size: 20px"
        >Films</span
      >

      <div class="scroll-list full-width justify-start q-pa-lg">
        <template v-for="film in state.films" :key="film">
          <div style="display: inline-block" class="q-mx-md">
            <div class="text-center">
              <img width="100" src="images/no-image.jpeg" alt="" />
              <p class="text-caption text-center text-bold">{{ film.title }}</p>
            </div>
          </div>
        </template>
      </div>

      <span
        class="q-ml-lg text-uppercase text-grey-8 text-weight-bold"
        style="font-size: 20px"
        >Characters</span
      >

      <div class="scroll-list full-width justify-start q-pa-lg">
        <template v-for="character in state.characters" :key="character">
          <div style="display: inline-block" class="q-mx-md">
            <div class="text-center">
              <img width="100" src="images/no-image.jpeg" alt="" />
              <p class="text-caption text-center text-bold">
                {{ character.name }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { defineComponent, onMounted, ref, reactive } from 'vue';
import api from '../services/api';
import Loading from 'components/molecules/Loading.vue';
import { TailCard } from '../components/bosons';
import { Character, Film, Specie } from 'src/models';
import { removeApiBase, convertToRomanNumeral } from 'src/utils';

export default defineComponent({
  components: { Loading, TailCard },

  setup() {
    const route = useRoute();

    const state = reactive({
      specie: {
        people: [''],
      } as Specie,
      characters: [] as Character[],
      films: [] as Film[],
    });

    const loading = ref(false);

    const fetchData = async () => {
      const id = route.params.id;
      const response = await api.get(`species/${id}`);
      state.specie = response.data as Specie;
    };

    const fetchCharacters = async () => {
      state.specie.people.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const character = response.data as Character;
        state.characters.push(character);
      });
    };

    const fetchFilms = async () => {
      state.specie.films.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const film = response.data as Film;
        state.films.push(film);
      });
    };

    onMounted(async () => {
      loading.value = true;

      await Promise.all([
        await fetchData(),
        await fetchCharacters(),
        await fetchFilms(),
      ]);

      loading.value = false;
    });

    return { state, loading, convertToRomanNumeral };
  },
});
</script>

<style scoped>
.img-character {
  width: 230px;
  position: absolute;
  top: -85px;
  border: 3px solid rgb(198, 209, 219);
}

.size-card {
  padding-top: 100px;
}

.border-name-character {
  border-top: 1px solid rgb(241, 206, 5);
  border-bottom: 1px solid rgb(241, 206, 5);
  padding: 1rem 0 1rem 0;
}

.sub-title-size {
  font-size: 9px;
}

.text-links {
  color: rgb(214, 185, 21);
}

.scroll-list {
  overflow: auto;
  white-space: nowrap;
}
</style>
