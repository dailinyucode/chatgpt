<template>
    <el-container class="common-layout">
        <el-aside class="aside">
            <aside-component ref="sessions" @change-session-id="changeSessionId" />
        </el-aside>
        <main-component
            :session-id="sessionId"
            @change-session-select="changeSessionSelect"
            @change-frequency="changeFrequency"
        />
    </el-container>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'GptPage'
    });
</script>

<script lang="ts" setup>
    import AsideComponent from '@/pages/gpt/aside.vue';
    import MainComponent from '@/pages/gpt/main.vue';
    import { ref } from 'vue';
    const sessionId = ref<string>('');
    const sessions = ref();
    function changeSessionId(nowSessionId: string) {
        sessionId.value = nowSessionId;
    }
    function changeSessionSelect(sessionId: string) {
        sessions.value.createOne(sessionId);
    }
    function changeFrequency() {
        sessions.value.loadFrequency();
    }
</script>

<style scoped>
    .common-layout {
        //height: 100%;
        width: 100vw;
        //min-width: 1100px;
        height: 100vh;
    }
    .aside {
        background-color: rgb(32, 33, 35);
        width: 252px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    /* 隐藏滚动条样式 */
    .aside::-webkit-scrollbar {
        width: 0.5em;
    }

    @media (max-width: 768px) {
        .aside {
            display: none;
        }
        .main {
            flex: 10; /* 去掉30%后，70%变成100% */
        }
    }
</style>
