import Vue from "vue"
import Vuex from 'vuex'
import player from './modules/player'
import search from './modules/search'
import singer from './modules/singer'
import user from './modules/user'
import createLogger from 'vuex/dist/logger'

// 使用Vuex
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        player,
        search,
        singer,
        user,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})