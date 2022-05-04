import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'films',
    component: () => import('pages/FilmsSection.vue'),
  },
  {
    path: '/people',
    component: () => import('pages/PeopleSection.vue'),
    name: 'people',
  },
  {
    path: '/person/:id',
    name: 'character',
    component: () => import('pages/CharacterSection.vue'),
  },

  {
    path: '/film/:id',
    name: 'film',
    component: () => import('pages/FilmSection.vue'),
  },
  {
    path: '/species',
    name: 'species',
    component: () => import('pages/SpeciesSection.vue'),
  },
  {
    path: '/specie/:id',
    name: 'specie',
    component: () => import('pages/SpecieSection.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
