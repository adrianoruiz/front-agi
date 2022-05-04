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
      <TailCard>
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
              {{ state.character.name }}
            </h5>
          </div>
        </q-card-section>
        <q-card-section class="full-width">
          <div class="q-pb-md" style="margin-top: -30px">
            <p class="text-grey-6 text-center text-uppercase">
              {{ state.homeworld.name }}
            </p>
            <template v-for="film in state.films" :key="film">
              <p class="q-mt-md">
                Episódio {{ convertToRomanNumeral(film.episode_id) }}:
                <span class="text-bold">{{ film.title }}</span>
              </p>
            </template>
          </div>
        </q-card-section>
      </TailCard>

      <div class="row q-col-gutter-x-md q-pa-lg">
        <div class="col-6">
          <q-card>
            <p class="sub-title-size text-grey-6 q-pa-sm">HOME WORLD</p>
            <a class="text-links flex flex-center q-pb-lg" href="#">{{
              state.homeworld.name
            }}</a>
          </q-card>
        </div>
        <div class="col-6">
          <q-card>
            <p class="sub-title-size text-grey-6 q-pa-sm">SPECIES</p>
            <template v-if="state.species.length">
              <template v-for="specie in state.species" :key="specie">
                <a class="text-links flex flex-center q-pb-lg" href="#"
                  >{{ specie.name }}
                </a>
              </template>
            </template>
            <a class="text-links flex flex-center q-pb-lg" href="#" v-else
              >Human
            </a>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-x-md q-px-lg q-py-xs">
        <div class="col-4">
          <q-card>
            <p class="sub-title-size text-grey-6 q-pa-sm">DOB</p>
            <p class="flex flex-center q-pb-lg">
              {{ state.character.birth_year }}
            </p>
          </q-card>
        </div>
        <div class="col-4">
          <q-card>
            <p class="sub-title-size text-grey-6 q-pa-sm">HEIGHT</p>
            <p class="flex flex-center q-pb-lg">{{ state.character.height }}</p>
          </q-card>
        </div>
        <div class="col-4">
          <q-card>
            <p class="sub-title-size text-grey-6 q-pa-sm">MASS</p>
            <p class="flex flex-center q-pb-lg">{{ state.character.mass }}</p>
          </q-card>
        </div>
        <div class="col-4">
          <q-card>
            <p class="sub-title-size text-grey-6 q-pa-sm">GENDER</p>
            <p class="flex flex-center q-pb-lg">{{ state.character.gender }}</p>
          </q-card>
        </div>
        <div class="col-4">
          <q-card>
            <p class="sub-title-size text-grey-6 q-pa-sm">HAIR</p>
            <p class="flex flex-center q-pb-lg">
              {{ state.character.hair_color }}
            </p>
          </q-card>
        </div>
        <div class="col-4">
          <q-card>
            <p class="sub-title-size text-grey-6 q-pa-sm">SKIN</p>
            <p class="flex flex-center q-pb-lg">
              {{ state.character.skin_color }}
            </p>
          </q-card>
        </div>
      </div>

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
        >Starships</span
      >

      <div class="scroll-list full-width justify-start q-pa-lg">
        <template v-for="starship in state.starships" :key="starship">
          <div style="display: inline-block" class="q-mx-md">
            <div class="text-center">
              <img width="100" src="images/no-image.jpeg" alt="" />
              <p class="text-caption text-center text-bold">
                {{ starship.name }}
              </p>
            </div>
          </div>
        </template>
      </div>

      <span
        class="q-ml-lg text-uppercase text-grey-8 text-weight-bold"
        style="font-size: 20px"
        >Vehicles</span
      >

      <div class="scroll-list full-width justify-start q-pa-lg">
        <template v-for="vehicle in state.vehicles" :key="vehicle">
          <div style="display: inline-block" class="q-mx-md">
            <div class="text-center">
              <img width="100" src="images/no-image.jpeg" alt="" />
              <p class="text-caption text-center text-bold">
                {{ vehicle.name }}
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
import { Character, Film, Planet, Specie, Starship, Vehicle } from 'src/models';
import { removeApiBase, convertToRomanNumeral } from 'src/utils';

export default defineComponent({
  components: { Loading, TailCard },

  setup() {
    const route = useRoute();

    const state = reactive({
      character: {
        films: [''],
      } as Character,
      films: [] as Film[],
      vehicles: [] as Vehicle[],
      starships: [] as Starship[],
      homeworld: {} as Planet,
      species: [] as Specie[],
    });

    const loading = ref(false);

    const fetchCharacter = async () => {
      const id = route.params.id;
      const response = await api.get(`people/${id}`);
      state.character = response.data as Character;
    };

    const fetchFilms = async () => {
      state.character.films.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const film = response.data as Film;
        state.films.push(film);
      });
    };

    const fetchHomeLand = async () => {
      const url = state.character.homeworld;
      const resumedUrl = removeApiBase(url);
      const response = await api.get(resumedUrl);
      const homeworld = response.data as Planet;
      state.homeworld = homeworld;
    };

    const fetchVehicles = async () => {
      state.character.vehicles.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const vehicle = response.data as Vehicle;
        state.vehicles.push(vehicle);
      });
    };

    const fetchStarships = async () => {
      state.character.starships.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const starship = response.data as Starship;
        state.starships.push(starship);
      });
    };

    const fetchSpecies = async () => {
      state.character.species.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const specie = response.data as Specie;
        state.species.push(specie);
      });
    };

    onMounted(async () => {
      loading.value = true;

      await Promise.all([
        await fetchCharacter(),
        await fetchFilms(),
        await fetchHomeLand(),
        await fetchSpecies(),
        await fetchVehicles(),
        await fetchStarships(),
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
