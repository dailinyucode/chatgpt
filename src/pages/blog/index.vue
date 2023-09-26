<template>
    <h1> 测试 vueUse 的鼠标坐标 </h1>
    <p>{{ userInfo.id }}</p>
    <p>{{ userInfo.userName }}</p>
    <p>{{ userInfo.userEmail }}</p>
    <p>唯一的code: {{ code }}</p>
    <el-button @click="OnEventSource">测试 event</el-button>
    <div ref="myDiv"></div>
    <button @click="logoutBut">退出登入</button>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'BlogPage'
    });
</script>

<script setup lang="ts">
    import { useUserStore } from '@/store/user';
    import { ref } from 'vue';
    import { logout } from '@/api/auth/api';

    const userInfo = useUserStore();

    const code = ref<string>('');

    const myDiv = ref<HTMLDivElement>();

    function OnEventSource() {
        const source = new EventSource('http://127.0.0.1:9090/3');
        source.onopen = () => {
            if (myDiv.value) {
                myDiv.value.innerHTML += '<p>Connection open ...</p>';
            }
        };
        // 连接创建失败的回调事件
        source.onerror = function (event) {
            if (myDiv.value) {
                myDiv.value.innerHTML += '<p>Connection close ...</p>';
            }
        };

        // 自定义事件，服务端返回时设置event字段为自定义事件名称
        source.addEventListener(
            'connecttime',
            function (event) {
                if (myDiv.value) {
                    myDiv.value.innerHTML += '<p>Start time: ' + event.data + '</p>';
                }
            },
            false
        );

        // 接受到数据的回调事件，event未特殊设置时，默认是message
        source.onmessage = function (event) {
            if (myDiv.value) {
                myDiv.value.innerHTML += '<p>message event: ' + event.data + '</p>';
            }
        };
    }
    async function logoutBut() {
        await logout().then(() => {
            userInfo.logout();
        });
    }
</script>
<style scoped></style>
