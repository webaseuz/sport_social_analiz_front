<template>
  <b-nav-item-dropdown
    id="dropdown-grouped"
    variant="link"
    class="dropdown-language"
    right
  >
    <template #button-content>
      <!-- <b-img
        :src="currentLocale.img"
        height="14px"
        width="22px"
        :alt="currentLocale.locale"
      /> -->
      <span class="ml-50 text-body">{{ currentLocale.name }}</span>
    </template>
    <b-dropdown-item
      v-for="localeObj in locales"
      :key="localeObj.locale"
      @click="ChangeLang(localeObj)"
    >
      <!-- <b-img
        :src="localeObj.img"
        height="14px"
        width="22px"
        :alt="localeObj.locale"
      /> -->
      <span class="ml-50">{{ localeObj.name }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { BNavItemDropdown, BDropdownItem, BImg } from 'bootstrap-vue'
import UserService from '@/services/user.service'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BImg,
  },
  // ! Need to move this computed property to comp function once we get to Vue 3
  computed: {
    currentLocale() {
      return this.locales.find(l => l.locale === this.$i18n.locale)
    },
  },
  methods:{
    ChangeLang(item){
      this.$i18n.locale = item.locale
      localStorage.setItem('locale',item.locale)
      // window.location.reload()
         this.ChangeLanguageUser(item)
    },
    ChangeLanguageUser (item){
     UserService.UserData(item.locale).then(res =>{
       localStorage.setItem('user_info',JSON.stringify(res.data))
       window.location.reload()
     })
  }
  },
  
  setup() {
    /* eslint-disable global-require */
    const locales = [
      {
        locale: 'uz_cyrl',
        img: require('@/assets/images/flags/en.png'),
        name: 'Ўзбек тили',
      },
      {
        locale: 'uz_latn',
        img: require('@/assets/images/flags/fr.png'),
        name: "O'zbek tili",
      },
      {
        locale: 'ru',
        img: require('@/assets/images/flags/de.png'),
        name: 'Русский язык',
      },
      // {
      //   locale: 'pt',
      //   img: require('@/assets/images/flags/pt.png'),
      //   name: 'Portuguese',
      // },
    ]
    /* eslint-disable global-require */

    return {
      locales,
    }
  },
}
</script>

<style>

</style>
