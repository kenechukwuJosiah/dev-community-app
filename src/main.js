import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import UsersList from './components/users/UsersList.vue';
import TeamsList from './components/teams/TeamsList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    // {path: '/',  alias: '/'}
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true
        }
      ]
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(to, from, next) {
        console.log('users beforeEnter');
        console.log(to, from);
        next();
      }
    },
    { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savePosition) {
    if (savePosition) return savePosition;
    return { left: 0, top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  next();
});

router.afterEach((to, from) => {
  console.log(to, from);
});

const app = createApp(App);
app.use(router);

router.isReady().then(function() {
  app.mount('#app');
});
