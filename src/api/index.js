import { post, get } from 'axios';
const HOST = 'https://zgwdemo.icu:3001';
// const HOST = 'https://127.0.0.1:3001';

const URL_login = HOST + '/user/login';
const URL_linkList = HOST + '/link/list';
const URL_addLink = HOST + '/link/add';

const URL_getWechatClass = HOST + '/wechat/getWechatClass';
const URL_createWechatClass = HOST + '/wechat/createWechatClass';
const URL_deleteWechatClass = HOST + '/wechat/deleteWechatClass';
const URL_updateWechat = HOST + '/wechat/update';
const URL_getUserList = HOST + '/user/list';
const URL_linkWechatId = HOST + '/link/linkWechatId';
const URL_deleteLink = HOST + '/link/delete';

const URL_deleteUser = HOST + '/user/delete';
const URL_addUser = HOST + '/user/create';
export default {
    login(data) {
        return post(URL_login, data);
    },
    getLinkList(data) {
        return post(URL_linkList, data);
    },
    addLink(data) {
        return post(URL_addLink, data);
    },
    deleteLink(data) {
        return post(URL_deleteLink, data);
    },
    getWechatClass(data) {
        return post(URL_getWechatClass, data);
    },
    createWechatClass(data) {
        return post(URL_createWechatClass, data);
    },
    deleteWechatClass(data) {
        return post(URL_deleteWechatClass, data);
    },
    updateWechat(data) {
        return post(URL_updateWechat, data);
    },
    getUserList(data) {
        return post(URL_getUserList, data);
    },
    linkWechatId(data) {
        return post(URL_linkWechatId, data);
    },
    addUser(data) {
        return post(URL_addUser, data);
    },
    deleteUser(data) {
        return post(URL_deleteUser, data);
    },
};
