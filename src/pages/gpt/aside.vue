<template>
    <div class="top">
        <div class="newChat" @click="createSession">
            <span style="margin-right: 10px">
                <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-4 w-4 shrink-0"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </span>
            <span> 创建 </span>
        </div>
        <div class="close" @clic="close">
            <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
        </div>
    </div>
    <div class="content">
        <div
            v-for="(item, index) in sessionList"
            :key="index"
            :class="{
                contentItem: item.sessionId !== '-1',
                contentFontItem: item.sessionId === '-1',
                select: sessionIdSelect === item.sessionId
            }"
        >
            <div v-if="item.sessionId !== '-1'" class="message">
                <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-4 w-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </div>
            <div
                v-if="item.sessionId !== '-1'"
                class="text"
                @click="changeSessionId(item.sessionId)"
            >
                <div
                    :class="{
                        lineLimitLength: true,
                        lineSelect: sessionIdSelect === item.sessionId
                    }"
                    >{{ item.title }}</div
                >
            </div>
            <div v-if="item.sessionId !== '-1' && sessionIdSelect === item.sessionId" class="edit">
                <div class="ic">
                    <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                </div>
                <div class="ic" @click="delSessionBut(item.sessionId)">
                    <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path
                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        ></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </div>
            </div>
            <span v-if="item.sessionId === '-1'" style="font-size: 0.875rem">{{ item.title }}</span>
        </div>
    </div>
    <div class="end">
        <div
            v-if="!showSelect"
            style="width: 230px; height: 1px; background-color: rgb(77, 77, 79)"
        ></div>
        <div v-if="!showSelect" class="endItem" @click="showStore = true">
            <div class="avatar" style="font-size: 20px">
                <el-icon><User /></el-icon>
            </div>
            <div class="name">
                <span>购买你的次数</span>
            </div>
            <div class="butNew">
                <span>NEW</span>
            </div>
        </div>
        <div v-if="!showSelect" class="endItem freeFrequency" @click="showFollow = true">
            <div class="avatar" style="font-size: 20px">
                <el-icon><Promotion /></el-icon>
            </div>
            <div class="name">
                <span>用户剩余次数</span>
            </div>
            <div class="butNew">
                <span>{{ frequency }}</span>
            </div>
        </div>
        <div v-if="showSelect" class="endItem brColor">
            <div class="avatar" style="font-size: 20px">
                <el-icon><User /></el-icon>
            </div>
            <div class="name">
                <span>用户中心</span>
            </div>
            <div style="width: 40px"> </div>
        </div>
        <div v-if="showSelect" class="endItem brColor" @click="showExchange = true">
            <div class="avatar" style="font-size: 20px">
                <el-icon><Unlock /></el-icon>
            </div>
            <div class="name">
                <span>兑换中心</span>
            </div>
            <div style="width: 40px"> </div>
        </div>
        <div
            v-if="
                showSelect && userInfo.roleVOList.filter((u) => u.roleCode === 'admin').length > 0
            "
            class="endItem brColor"
            @click="showSetting = true"
        >
            <div class="avatar" style="font-size: 20px">
                <el-icon><Tools /></el-icon>
            </div>
            <div class="name">
                <span>设置</span>
            </div>
            <div style="width: 40px"> </div>
        </div>
        <div
            v-if="showSelect"
            style="width: 230px; height: 1px; background-color: rgb(77, 77, 79)"
        ></div>
        <div v-if="showSelect" class="endItem brColor" @click="changeLogout">
            <div class="avatar" style="font-size: 20px">
                <el-icon><SwitchButton /></el-icon>
            </div>
            <div class="name">
                <span>退出登入</span>
            </div>
            <div style="width: 40px"> </div>
        </div>
        <div class="endItem">
            <div class="avatar">
                <el-avatar
                    shape="square"
                    :size="40"
                    :src="userInfo.avatar ? userInfo.avatar : avatar"
                    style="margin-left: auto"
                />
            </div>
            <div class="name">
                <span style="margin-left: 10px">{{ userInfo.userName }}</span>
            </div>
            <div class="but" tabindex="-1" @click="showSelect = !showSelect" @blur="changeBlur">
                <span style="margin-right: 20px; font-size: 20px">...</span>
            </div>
        </div>
    </div>
    <setting-component v-model:show-setting="showSetting" @down-setting="downSetting" />
    <store-component v-model:show-store="showStore" @down-store="downStore" />
    <follow-component v-model:show-follow="showFollow" @down-follow="downFollow" />
    <exchange-component v-model:show-exchange="showExchange" @down-exchange="downExchange" @change-frequency="loadFrequency"/>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'AsideComponent'
    });
</script>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import { GptSessionVO } from '@/api/chatgpt/chatgpt';
    import { delSession, getFrequency, getSessionList } from '@/api/chatgpt/api';
    import { ElMessage } from 'element-plus';
    import avatar from '@/assets/avatar.png';
    import { Promotion, SwitchButton, Tools, Unlock, User } from '@element-plus/icons-vue';
    import { useUserStore } from '@/store/user';
    import SettingComponent from '@/pages/gpt/setting.vue';
    import StoreComponent from '@/pages/gpt/store.vue';
    import FollowComponent from '@/pages/gpt/follow.vue';
    import ExchangeComponent from '@/pages/gpt/exchange.vue';

    const emit = defineEmits(['change-session-id']);

    const sessionList = ref<GptSessionVO[]>([]);
    const sessionIdSelect = ref();
    const showSelect = ref(false);
    const userInfo = useUserStore();
    const frequency = ref();

    onMounted(() => {
        initSessionList();
        loadFrequency();
    });

    function changeBlur() {
        setTimeout(() => {
            showSelect.value = false;
        }, 500);
    }

    function createSession() {
        emit('change-session-id', '');
    }

    function changeSessionId(sessionId: string) {
        emit('change-session-id', sessionId);
        sessionIdSelect.value = sessionId;
    }

    function delSessionBut(sessionId: string) {
        delSession(sessionId).then(() => {
            ElMessage.success('删除成功');
            sessionList.value = [];
            initSessionList();
        });
    }

    function initSessionList() {
        getSessionList().then(({ data }) => initData(data));
    }

    function today() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // 月份从0开始，需要加1
        const day = today.getDate();
        return new Date(`${year}-${month}-${day}`);
    }

    function oldDay(limit: number) {
        const today = new Date();
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(today.getDate() - limit);

        const year = fiveDaysAgo.getFullYear();
        const month = fiveDaysAgo.getMonth() + 1; // 月份从0开始，需要加1
        const day = fiveDaysAgo.getDate();
        return new Date(`${year}-${month}-${day}`);
    }

    function initData(data: GptSessionVO[]) {
        if (data.length > 0) {
            let a = true;
            let b = true;
            let c = true;
            let d = true;
            for (let i = 0; i < data.length; i++) {
                let at = data.at(i);
                let time;
                if (at) {
                    time = new Date(at.createTime);
                    time.setHours(0, 0, 0, 0);
                }
                if (a && time && time <= today() && time > oldDay(1)) {
                    sessionList.value.push({
                        sessionId: '-1',
                        title: '今天',
                        createTime: ''
                    });
                    a = false;
                }

                if (b && time && time <= oldDay(1) && time > oldDay(2)) {
                    sessionList.value.push({
                        sessionId: '-1',
                        title: '昨天',
                        createTime: ''
                    });
                    b = false;
                }

                if (c && time && time <= oldDay(2) && time > oldDay(10)) {
                    sessionList.value.push({
                        sessionId: '-1',
                        title: '几天前',
                        createTime: ''
                    });
                    c = false;
                }

                if (d && time && time <= oldDay(10)) {
                    sessionList.value.push({
                        sessionId: '-1',
                        title: '10天前',
                        createTime: ''
                    });
                    d = false;
                }
                if (at) sessionList.value.push(at);
            }
        }
    }

    function changeLogout() {
        userInfo.logout();
    }

    function createOne(sessionId: string) {
        sessionList.value = [];
        initSessionList();
        sessionIdSelect.value = sessionId;
    }

    function loadFrequency() {
        getFrequency().then(({ data }) => {
            frequency.value = data;
        });
    }

    /* 父传子 暴露子的方法 */
    defineExpose({
        createOne,
        loadFrequency
    });

    const showSetting = ref(false);
    function downSetting() {
        showSetting.value = false;
    }
    const showStore = ref(false);
    function downStore() {
        showStore.value = false;
    }
    const showFollow = ref(false);
    function downFollow() {
        showFollow.value = false;
    }
    const showExchange = ref(false);
    function downExchange() {
        showExchange.value = false;
    }
</script>

<style scoped>
    .top {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
    }

    .end {
        /*置于底部*/
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        /*背景颜色*/
        background-color: rgb(32, 33, 35);
        width: 252px;
        display: flex;
        align-items: center;
        flex-direction: column;
        color: white;
    }

    .endItem {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 252px;
        height: 60px;
    }

    .endItem:hover {
        background-color: rgb(52, 53, 65);
    }

    .newChat {
        height: 45px;
        flex: 8;
        border: 1px solid rgb(77, 77, 79);
        border-radius: 8px;
        color: white;
        font-size: 0.875rem;
        margin: 4px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .newChat:hover {
        background-color: rgb(52, 53, 65);
    }

    .close {
        height: 45px;
        margin: 4px;
        flex: 2;
        color: white;
        border: 1px solid rgb(77, 77, 79);
        border-radius: 8px;
        display: flex;
        /**
          上下居中
        */
        align-items: center;
        /**
          水平居中
        */
        justify-content: center;
    }

    .close:hover {
        background-color: rgb(52, 53, 65);
    }

    .content {
        flex: 9;
        width: 100%;
        display: flex;
        align-items: center;
        /**
          树状排列
        */
        flex-direction: column;
        padding: 2px 10px;
    }

    .contentItem {
        height: 50px;
        width: 100%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin: 4px 10px;
    }

    .contentItem:hover {
        background-color: rgb(52, 53, 65);
    }

    .select {
        background-color: rgb(52, 53, 65);
    }

    .contentFontItem {
        height: 20px;
        width: 100%;
        color: rgb(128, 128, 160);
        margin: 1px 10px;
    }

    .message {
        margin-right: auto;
        margin-left: 10px;
        font-size: 0.875rem;
    }

    .text {
        width: 85%;
        font-size: 0.875rem;
        margin: 0 20px;
    }

    .edit {
        margin-left: auto;
        margin-right: 10px;
        font-size: 0.875rem;
        display: flex;
    }

    .ic {
        margin: 0 5px;
    }

    .lineLimitLength {
        max-width: 168px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; /*文本不换行，这样超出一行的部分被截取，显示...*/
    }

    .lineSelect {
        max-width: 120px;
    }

    .avatar {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .name {
        flex: 5;
    }
    .but {
        flex: 3;
        display: flex;
        align-items: center;
        justify-content: end;
        margin-top: -10px;
    }
    .butNew {
        width: 40px;
        height: 20px;
        background-color: rgb(250, 230, 158);
        color: black;
        font-size: 10px;
        border-radius: 6px;
        text-align: center;
        margin: 0 10px;
        padding: 1px 0;
    }

    .brColor {
        background-color: black;
    }

    /*免费次数*/
    .freeFrequency {
        position: relative;
    }

    .freeFrequency::before {
        content: '获取免费次数';
        position: absolute;
        left: 145px;
        top: 40px;
        display: none; /* 默认隐藏 */
        padding: 5px;
        background-color: #7a7a7a;
        color: #fff;
        border-radius: 6px;
    }

    .freeFrequency:hover::before {
        display: block; /* 鼠标放上去时显示 */
    }
</style>
