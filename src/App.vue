<template>
  <div class="app">
    <div class="routed-content">
      <router-view />
    </div>

    <div class="navigation">
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link>
    </div>
  </div>
</template>

<style>
@import url('./styles/global.css');

.navigation {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;

  color: white;
  background-color: black;
}

.routed-content {
  padding: 1em 1em 8em 1em;
}

</style>
