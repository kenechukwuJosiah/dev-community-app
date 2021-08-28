<template>
  <the-navigation></the-navigation>
  <!-- <router-view></router-view> -->
  <router-view v-slot="slotProps">
    <transition mode="in-out" name="animate-route">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <router-view name="footer"></router-view>
</template>

<script>
import TheNavigation from './components/nav/TheNavigation.vue';

export default {
  components: {
    TheNavigation
  },
  provide() {
    return {
      teams: this.teams,
      users: this.users
    };
  },
  data() {
    return {
      teams: [
        { id: 't1', name: 'Frontend Engineers', members: ['u1', 'u2'] },
        { id: 't2', name: 'Backend Engineers', members: ['u1', 'u2', 'u3'] },
        { id: 't3', name: 'Client Consulting', members: ['u4', 'u5'] }
      ],
      users: [
        { id: 'u1', fullName: 'Max Schwarz', role: 'Engineer' },
        { id: 'u2', fullName: 'Praveen Kumar', role: 'Engineer' },
        { id: 'u3', fullName: 'Julie Jones', role: 'Engineer' },
        { id: 'u4', fullName: 'Alex Blackfield', role: 'Consultant' },
        { id: 'u5', fullName: 'Marie Smith', role: 'Consultant' }
      ]
    };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
.animate-route-enter-from,
.animate-route-leave-to {
  opacity: 0;
}
.animate-route-enter-active,
.animate-route-leave-active {
  transition: all ease-in 0.5s;
}
.animate-route-enter-to,
.animate-route-leave-from {
  opacity: 1;
}

@keyframes animate {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
