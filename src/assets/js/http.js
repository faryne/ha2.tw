import axios from 'axios';
import Vue from "vue";

const BaseUri = "https://faryne.dev";

export default {
    BaseUri,

    checkHost(url){
        let uri = BaseUri + url;
        if (url.toString().indexOf(BaseUri) >= 0) {
            uri = url;
        }
        return uri;
    },
    async get(url, query, config) {
        let uri = this.checkHost(url);
        let loader = Vue.$loading.show();
        let req = axios.get(uri, query, config);
        loader.hide();

        let resp = await req.then( obj => {
            return obj;
        });

        return resp.data;
    },

    async customGet(url, query, config) {
        let loader = Vue.$loading.show();
        let req = axios.get(url, query, config);
        loader.hide();

        let resp = await req.then( obj => {
            return obj;
        });

        return resp.data;
    },

    async post(url, params, config) {
        let uri = this.checkHost(url);
        let req = axios.post(uri, params, config)
        let resp = await req.then( obj => {
            return obj.data;
        });

        return resp.data;
    }
}