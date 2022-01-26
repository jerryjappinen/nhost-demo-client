<template>
  <div id="nav">
    <router-link to="/">
      Home
    </router-link> |
    <router-link to="/about">
      About
    </router-link>
  </div>

  <router-view />
</template>

<style>
@import url('./styles/global.css');
</style>
