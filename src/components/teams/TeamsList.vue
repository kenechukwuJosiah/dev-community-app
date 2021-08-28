<template>
  <div>
    <router-view v-slot="slotProps">
      <transition name="small" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <ul>
      <teams-item
        v-for="team in teams"
        :key="team.id"
        :name="team.name"
        :id="team.id"
        :member-count="team.members.length"
      ></teams-item>
    </ul>
    <button @click="!testBoolean">comfirm</button>
  </div>
</template>

<script>
import TeamsItem from './TeamsItem.vue';

export default {
  components: {
    TeamsItem
  },
  data() {
    return {
      testBoolean: false
    };
  },
  inject: ['teams'],
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    if (this.testBoolean) return next();
    else {
      const comfirm = confirm('Sure you want to leave the page?');
      return next(comfirm);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 40rem;
  padding: 0;
}

.small-enter-from,
.small-leave-to {
  opacity: 0;
}
.small-enter-active,
.small-leave-active {
  transition: all ease-in 0.5s;
}
.small-enter-to,
.small-leave-from {
  opacity: 1;
}
</style>
