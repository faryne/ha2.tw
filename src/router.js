import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    {
        name: "telegraph",
        path:"/telegraph",
        component: () => import("./components/pages/telegraph/index")
    },
    {
        name: "rates",
        path: "/rates",
        component: () => import("./components/pages/rates/index")
    },
    {
        name: "hololive.vtuber",
        path: "/hololive/:id",
        component: () => import("./components/pages/vtubers/vtuber")
    },
    {
        name: "hololive",
        path: "/hololive",
        component: () => import("./components/pages/vtubers/index")
    },
    {
        name: "yandere.tags",
        path: "/yandere/tags",
        component: () => import("./components/pages/yandere/TagsList")
    },
    {
        name: "dmm.videos",
        path: "/dmm/videos",
        component: () => import("./components/pages/dmm/SearchResult"),
        props: {
            PageType: "video"
        }
    },
    {
        name: "dmm.actresses",
        path: "/dmm/actresses",
        component: () => import("./components/pages/dmm/SearchResult"),
        props: {
            PageType: "actress"
        }
    },
    {
        name: "twstats.main",
        path: "/tw-stats",
        component: () => import("./components/pages/twstats/index")
    },
    {
        name: "year.main",
        path: "/progress-year",
        component: () => import("./components/pages/timer/index")
    },
    // 預設首頁
    {
        "name": "main",
        "path": "*",
        "component": () => import("./components/HelloWorld")
    }
];

export default new VueRouter({
    mode: "history",
    routes
})