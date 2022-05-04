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
              {{ state.film.title }}
            </h5>
          </div>
        </q-card-section>
      </TailCard>

      <div class="row q-col-gutter-x-md q-pa-lg">
        <div class="col-6">
          <q-card>
            <p class="sub-title-size text-grey-6 q-pa-sm">Diretor</p>
            <a class="text-links flex flex-center q-pb-lg" href="#">{{
              state.film.director
            }}</a>
          </q-card>
        </div>
        <div class="col-6">
          <q-card>
            <p class="sub-title-size text-grey-6 q-pa-sm">Release data</p>
            <a class="text-links flex flex-center q-pb-lg" href="#">{{
              state.film.release_date
            }}</a>
          </q-card>
        </div>
      </div>

      <span
        class="q-ml-lg text-uppercase text-grey-8 text-weight-bold"
        style="font-size: 20px"
        >Personagens</span
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

      <span
        class="q-ml-lg text-uppercase text-grey-8 text-weight-bold"
        style="font-size: 20px"
        >Planets</span
      >

      <div class="scroll-list full-width justify-start q-pa-lg">
        <template v-for="planet in state.planets" :key="planet">
          <div style="display: inline-block" class="q-mx-md">
            <div class="text-center">
              <img width="100" src="images/no-image.jpeg" alt="" />
              <p class="text-caption text-center text-bold">
                {{ planet.name }}
              </p>
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
      film: {} as Film,

      vehicles: [] as Vehicle[],
      starships: [] as Starship[],
      planets: [] as Planet[],
      species: [] as Specie[],
      characters: [] as Character[],
    });

    const loading = ref(false);

    const fetchData = async () => {
      const id = route.params.id;
      const response = await api.get(`films/${id}`);
      state.film = response.data as Film;
    };

    const fetchCharacters = async () => {
      state.film.characters.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const character = response.data as Character;
        state.characters.push(character);
      });
    };

    const fetchVehicles = async () => {
      state.film.vehicles.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const vehicle = response.data as Vehicle;
        state.vehicles.push(vehicle);
      });
    };

    const fetchStarships = async () => {
      state.film.starships.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const starship = response.data as Starship;
        state.starships.push(starship);
      });
    };

    const fetchSpecies = async () => {
      state.film.species.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const specie = response.data as Specie;
        state.species.push(specie);
      });
    };

    const fetchPlanets = async () => {
      state.film.planets.forEach(async (url: string) => {
        const resumedUrl = removeApiBase(url);
        const response = await api.get(resumedUrl);
        const planet = response.data as Planet;
        state.planets.push(planet);
      });
    };

    onMounted(async () => {
      loading.value = true;

      await Promise.all([
        await fetchData(),
        await fetchCharacters(),
        await fetchPlanets(),
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
