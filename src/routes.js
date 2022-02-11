import Profile from './pages/Profile'
import Uploads from './pages/Uploads'

// In this app, App.vue only renders routes for registered users
// For guarded routes, see https://router.vuejs.org/guide/advanced/navigation-guards.html
export default [

  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },

  {
    path: '/',
    name: 'uploads',
    component: Uploads
  }

]
