
import Vue from 'vue'
import EN  from './languages/en'
import FR  from './languages/fr'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

const messages = {
  en: EN,
  fr: FR
}

const i18n = new VueI18n({
  locale: navigator.language.substr(0,2), // set locale
  messages // set locale messages
})



export default i18n;
