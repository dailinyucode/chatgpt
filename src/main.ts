import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
//pinia插件实现缓存到浏览器
import piniaPersist from 'pinia-plugin-persist';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

//md预览插件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import Prism from 'prismjs';
// 创建vue实例
const app = createApp(App);
//添加element的图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

store.use(piniaPersist);
app.use(store);
app.use(router);
app.use(ElementPlus);

VMdPreview.use(vuepressTheme, {
    Prism
});
VMdPreview.use(createCopyCodePlugin());
app.use(VMdPreview);

// 挂载实例
app.mount('#app');
