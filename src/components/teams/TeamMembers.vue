<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">go to team two</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem
  },
  inject: ['teams', 'users'],
  props: ['teamId'],
  data() {
    return {
      teamName: 'Test',
      members: []
    };
  },
  methods: {
    loadTeamMembers(teamId) {
      const selectedMember = this.teams.find(team => team.id === teamId);
      console.log(selectedMember);
      const teamMembers = selectedMember.members;
      const selectedMembers = [];

      for (const member of teamMembers) {
        const user = this.users.find(user => user.id === member);
        selectedMembers.push(user);
      }
      this.members = selectedMembers;
    }
  },
  created() {
    this.loadTeamMembers(this.teamId);
  },
  watch: {
    teamId(newId) {
      this.loadTeamMembers(newId);
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('navigated to Team Members');
    console.log(to, from);
    next();
  },

  unmounted() {}
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
