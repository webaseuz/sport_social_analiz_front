import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import apps from './routes/apps'
import dashboard from './routes/dashboard'
import uiElements from './routes/ui-elements/index'
import pages from './routes/pages'
import chartsMaps from './routes/charts-maps'
import formsTable from './routes/forms-tables'
import others from './routes/others'
import info from './routes/info'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'dashboard' } },
    ...info,
    
    // ...apps,
    // ...dashboard,
    ...pages,
    // ...chartsMaps,
    // ...formsTable,
    // ...uiElements,
    // ...others,
    {
      path: '*',
      redirect: 'error-404',
    }
  ],
})

router.beforeEach((to, from, next) => {
  // next()
  // const isLoggedIn = isUserLoggedIn()

  // if (!canNavigate(to)) {
  //   // Redirect to login if not logged in
  //   if (!isLoggedIn) return next({ name: 'auth-login' })

  //   // If logged in => not authorized
  //   return next({ name: 'misc-not-authorized' })
  // }

  // // Redirect if logged in
  // if (to.meta.redirectIfLoggedIn && isLoggedIn) {
  //   const userData = getUserData()
  //   next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  // }

  // return next()
  if (to.path !== '/login') {
    if (localStorage.getItem('auth_token')) {

      next();
    } else {

      next('login');
    }
  } else {

    next();
  }
})

export default router
