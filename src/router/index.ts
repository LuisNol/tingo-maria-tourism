import { createRouter, createWebHistory } from 'vue-router'
import SplashScreen from '@/views/SplashScreen.vue'
import HomeView from '@/views/HomeView.vue'
import PlacesView from '@/views/PlacesView.vue'
import PlaceDetailView from '@/views/PlaceDetailView.vue'
import HotelsView from '@/views/HotelsView.vue'
import RestaurantsView from '@/views/RestaurantsView.vue'
import PlannerView from '@/views/PlannerView.vue'
import WeatherView from '@/views/WeatherView.vue'
import LanguageView from '@/views/LanguageView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: SplashScreen,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/places',
    name: 'Places',
    component: PlacesView,
  },
  {
    path: '/places/:id',
    name: 'PlaceDetail',
    component: PlaceDetailView,
    props: true,
  },
  {
    path: '/hotels',
    name: 'Hotels',
    component: HotelsView,
  },
  {
    path: '/restaurants',
    name: 'Restaurants',
    component: RestaurantsView,
  },
  {
    path: '/planner',
    name: 'Planner',
    component: PlannerView,
  },
  {
    path: '/weather',
    name: 'Weather',
    component: WeatherView,
  },
  {
    path: '/language',
    name: 'Language',
    component: LanguageView,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router