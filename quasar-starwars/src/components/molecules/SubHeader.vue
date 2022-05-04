<template>
  <div class="bg-primary q-pa-md">
    <p class="text-caption text-grey-7 text-center">
      <span class="text-bold text-subtitle1">STAR WARS </span>
    </p>

    <q-tabs
      no-caps
      class="bg-transparent text-grey-7"
      align="left"
      active-class="text-grey-10"
      shrink
      indicator-color="transparent"
    >
      <q-route-tab to="/" exact replace label="FILMS" />
      <q-route-tab to="/people" exact replace label="PEOPLE" />
      <q-route-tab to="/species" exact replace label="SPECIES" />
    </q-tabs>
  </div>
</template>
