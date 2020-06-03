import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userId: '',
        isRoot: false,
    },
    mutations: {
        setUserId(state, payload) {
            state.userId = payload.userId;
            localStorage.setItem('userId', state.userId);
        },
        setIsRoot(state, payload) {
            state.isRoot = payload.isRoot;
            if (state.isRoot) {
                localStorage.setItem('isRoot', state.isRoot);
            } else {
                localStorage.setItem('isRoot', '');
            }
        },
    },
    actions: {
        isLogin(context, { account, password }) {
            api.login({ account, password }).then(({ data }) => {
                if (data.code == 1) {
                    context.commit('setUserInfo', data.result._id);
                    context.commit('isRoot', data.result.isRoot);
                } else {
                    context.commit('setUserInfo', {});
                }
            });
        },
    },
    modules: {},
});
