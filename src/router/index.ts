import { useAppConfigStore } from '@/store/app-config';
import { createRouter, createWebHistory } from 'vue-router/auto';

// 🐞 Depending on the order of imports this will fail
// const stroe = useAppConfigStore();

const router = createRouter({
  history: createWebHistory(),
  extendRoutes(routes) {
    return routes;
  },
});
console.log(router.getRoutes(), '🚥');

router.beforeEach((to, from, next) => {
  console.log(to, from, '✅');
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const { authorization, clearAuthorization } = useAppConfigStore();

  if (!authorization?.accessToken && to.path !== '/login') {
    clearAuthorization();
    next({ path: '/login' });
  }

  console.log(authorization, '🔑');
  next();
});

export default router;
