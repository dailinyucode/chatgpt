<template>
    <div class="root">
        <div class="shell">
            <div id="a-container" ref="aContainer" class="container a-container">
                <form id="a-form" class="form">
                    <h2 class="form_title title">创建账号</h2>
                    <div class="form_icons">
                        <el-icon class="iconfont">
                            <Edit />
                        </el-icon>
                        <el-icon class="iconfont">
                            <Share />
                        </el-icon>
                        <el-icon class="iconfont">
                            <StarFilled />
                        </el-icon>
                    </div>
                    <span class="form_span">选择注册方式活电子邮箱注册</span>
                    <input
                        v-model="userRegisterRO.userName"
                        type="text"
                        class="form_input"
                        placeholder="名称"
                    />
                    <input
                        v-model="userRegisterRO.userAccount"
                        type="text"
                        class="form_input"
                        placeholder="账号"
                    />
                    <input
                        v-model="userRegisterRO.password"
                        type="password"
                        class="form_input"
                        placeholder="密码"
                    />
                    <input
                        v-model="userRegisterRO.email"
                        type="text"
                        class="form_input"
                        placeholder="邮箱"
                    />
                    <div class="captcha_style">
                        <input
                            v-model="userRegisterRO.code"
                            style="width: 250px"
                            type="text"
                            class="form_input"
                            placeholder="验证码"
                        />
                        <el-button :class="UpOrDown" type="primary" @click="sendEmailCaptcha">{{
                            UpOrDownText
                        }}</el-button>
                    </div>
                    <button type="button" class="form_button button" @click="onRegisterSubmit"
                        >SIGN UP</button
                    >
                </form>
            </div>

            <div id="b-container" ref="bContainer" class="container b-container">
                <form id="b-form" class="form">
                    <h2 class="form_title title">登入账号</h2>
                    <div class="form_icons">
                        <el-icon class="iconfont"><UserFilled /></el-icon>
                        <el-icon class="iconfont"><Comment /></el-icon>
                        <el-icon class="iconfont"><HelpFilled /></el-icon>
                    </div>
                    <span class="form_span">选择登录方式活电子邮箱登录</span>
                    <input
                        v-model="loginRo.username"
                        type="text"
                        class="form_input"
                        placeholder="账号"
                    />
                    <input
                        v-model="loginRo.password"
                        type="password"
                        class="form_input"
                        placeholder="密码"
                    />
                    <div class="captcha_style">
                        <input
                            v-model="loginRo.code"
                            style="width: 250px"
                            type="text"
                            class="form_input"
                            placeholder="验证码"
                        />
                        <el-image
                            class="code_image"
                            :src="codeUrl"
                            fit="scale-down"
                            @click="flushCaptcha"
                        />
                    </div>
                    <a class="form_link">忘记密码？</a>
                    <button type="button" class="form_button button" @click="onLoginSubmit"
                        >SIGN IN</button
                    >
                </form>
            </div>

            <div id="switch-cnt" ref="switchCtn" class="switch">
                <div ref="switchCircle1" class="switch_circle"></div>
                <div ref="switchCircle2" class="switch_circle switch_circle-t"></div>
                <div id="switch-c1" ref="switchC1" class="switch_container">
                    <h2 class="switch_title title" style="letter-spacing: 0">Welcome Back！</h2>
                    <p class="switch_description description"
                        >已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p
                    >
                    <button
                        ref="switchBtn"
                        class="switch_button button switch-btn"
                        @click="changeForm"
                        >SIGN IN</button
                    >
                </div>

                <div id="switch-c2" ref="switchC2" class="switch_container is-hidden">
                    <h2 class="switch_title title" style="letter-spacing: 0">Hello Friend！</h2>
                    <p class="switch_description description"
                        >去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p
                    >
                    <button class="switch_button button switch-btn" @click="changeForm"
                        >SIGN UP</button
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'LoginPage'
    });
</script>

<script lang="ts" setup>
    import { computed, onMounted, ref } from 'vue';
    import { LoginRO, UserRegisterRO } from '@/api/auth/auth';
    import { login, register } from '@/api/auth/api';
    import { saveToken } from '@/utils/constant';
    import { ElMessage } from 'element-plus';
    import { useUserStore } from '@/store/user';
    import router from '@/router';
    import { getCaptcha, senEmail } from '@/api/captcha/api';
    import {
        Comment,
        Edit,
        HelpFilled,
        Share,
        StarFilled,
        UserFilled
    } from '@element-plus/icons-vue';
    const codeUrl = ref<string>('');

    const isSend = ref<boolean>(false);
    const countdown = ref<number>(60);
    const UpOrDown = computed(() => {
        return isSend.value ? 'sendEmailButtonDown' : 'sendEmailButtonUp';
    });

    const UpOrDownText = computed(() => {
        return isSend.value ? `${countdown.value} s` : '发送验证码';
    });

    //发送邮箱验证码
    function sendEmailCaptcha() {
        if (!isSend.value) {
            if (!userRegisterRO.value.email || userRegisterRO.value.email === '') {
                //消息提示
                ElMessage({
                    message: '请填写登入邮箱',
                    type: 'error'
                });
            }
            senEmail(userRegisterRO.value.email).then(({ code }) => {
                if (code === 200) {
                    isSend.value = !isSend.value;
                    let interval = setInterval(() => {
                        countdown.value--;
                    }, 1000);
                    setTimeout(() => {
                        clearInterval(interval);
                        isSend.value = !isSend.value;
                        countdown.value = 60;
                    }, 60000);
                    //消息提示
                    ElMessage({
                        showClose: true,
                        message: '发送成功',
                        type: 'success'
                    });
                }
            });
        }
    }

    onMounted(() => {
        //切换到登入页面
        changeForm();
        //获取验证码
        flushCaptcha();
    });

    function flushCaptcha() {
        getCaptcha().then((value) => {
            if (value.code === 200) {
                loginRo.value.uuid = value.data.uuid;
                codeUrl.value = `data:image/png;base64,${value.data.image}`;
            }
        });
    }

    const userRegisterRO = ref<UserRegisterRO>({
        userName: '',
        userAccount: '',
        password: '',
        email: '',
        code: ''
    });

    const loginRo = ref<LoginRO>({
        username: '',
        password: '',
        loginType: 'ACCOUNT',
        code: '',
        uuid: ''
    });

    function onRegisterSubmit() {
        register(userRegisterRO.value).then(({ code, data }) => {
            if (code === 200) {
                ElMessage({
                    message: '注册成功',
                    type: 'success'
                });
                saveToken(data, true);
                router.push({ path: '/gpt' });
            }
        });
    }

    //登入方法
    function onLoginSubmit() {
        login(loginRo.value).then((data) => {
            if (data.code === 200) {
                ElMessage({
                    message: '登入成功',
                    type: 'success'
                });
                saveToken(data.data, true);
                router.push({ path: '/gpt' });
            }
        });
    }
    onMounted(() => {
        let userInfo = useUserStore();
        console.log('用户信息', userInfo.id);
    });

    const switchCtn = ref<HTMLDivElement | null>();
    const switchC1 = ref<HTMLDivElement>();
    const switchC2 = ref<HTMLDivElement>();
    const switchCircle1 = ref<HTMLDivElement | null>();
    const switchCircle2 = ref<HTMLDivElement | null>();
    const aContainer = ref<HTMLDivElement>();
    const bContainer = ref<HTMLDivElement>();
    function changeForm() {
        // 修改类名
        switchCtn.value?.classList.add('is-gx');
        setTimeout(function () {
            switchCtn.value?.classList.remove('is-gx');
        }, 1500);
        switchCtn.value?.classList.toggle('is-txr');
        switchCircle1.value?.classList.toggle('is-txr');
        switchCircle2.value?.classList.toggle('is-txr');
        switchC1.value?.classList.toggle('is-hidden');
        switchC2.value?.classList.toggle('is-hidden');
        aContainer.value?.classList.toggle('is-txl');
        bContainer.value?.classList.toggle('is-txl');
        bContainer.value?.classList.toggle('is-z');
    }
</script>

<style scoped>
    .sendEmailButtonUp {
        width: 90px;
        height: 38px;
        margin: 0 3px;
        background-color: #ecf0f3;
        color: #a0a5a8;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        border-color: transparent; /* 设置边框颜色为透明，即不可见 */
        transition: box-shadow 0.3s;
    }

    .sendEmailButtonDown {
        width: 90px;
        height: 38px;
        margin: 0 3px;
        background-color: #ecf0f3;
        color: #a0a5a8;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        border-color: transparent; /* 设置边框颜色为透明，即不可见 */
        transition: box-shadow 0.3s;
    }

    .captcha_style {
        display: flex;
        align-items: center;
    }
    .code_image {
        width: 100px;
        height: 40px;
        margin: 4px 2px;
    }
    .code_image :deep(*) {
        opacity: 0.95;
        border: none;
        outline: none;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    }
    .root {
        position: absolute;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        background-color: #ecf0f3;
        color: #a0a5a8;
    }

    .shell {
        position: relative;
        width: 1000px;
        min-width: 1000px;
        min-height: 600px;
        height: 600px;
        padding: 25px;
        background-color: #ecf0f3;
        box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
        border-radius: 12px;
        overflow: hidden;
    }

    /* 设置响应式 */
    @media (max-width: 1200px) {
        .shell {
            transform: scale(0.7);
        }
    }

    @media (max-width: 1000px) {
        .shell {
            transform: scale(0.6);
        }
    }

    @media (max-width: 800px) {
        .shell {
            transform: scale(0.5);
        }
    }

    @media (max-width: 600px) {
        .shell {
            transform: scale(0.4);
        }
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        width: 600px;
        height: 100%;
        padding: 25px;
        background-color: #ecf0f3;
        transition: 1.25s;
    }

    .form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .iconfont {
        margin: 0 5px;
        border: rgba(0, 0, 0, 0.5) 2px solid;
        border-radius: 50%;
        font-size: 25px;
        padding: 3px;
        opacity: 0.5;
        transition: 0.1s;
    }

    .iconfont:hover {
        opacity: 1;
        transition: 0.15s;
        cursor: pointer;
    }

    .form_input {
        width: 350px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    }

    .form_input:focus {
        box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
    }

    .form_span {
        margin-top: 30px;
        margin-bottom: 12px;
    }

    .form_link {
        color: #181818;
        font-size: 15px;
        margin-top: 25px;
        border-bottom: 1px solid #a0a5a8;
        line-height: 2;
    }

    .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
        letter-spacing: 10px;
    }

    .description {
        font-size: 14px;
        letter-spacing: 0.25px;
        text-align: center;
        line-height: 1.6;
    }

    .button {
        width: 180px;
        height: 50px;
        border-radius: 25px;
        margin-top: 50px;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 1.15px;
        background-color: #4b70e2;
        color: #f9f9f9;
        box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
        border: none;
        outline: none;
    }

    .a-container {
        z-index: 100;
        left: calc(100% - 600px);
    }

    .b-container {
        left: calc(100% - 600px);
        z-index: 0;
    }

    .switch {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 400px;
        padding: 50px;
        z-index: 200;
        transition: 1.25s;
        background-color: #ecf0f3;
        overflow: hidden;
        box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
    }

    .switch_circle {
        position: absolute;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        background-color: #ecf0f3;
        box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
        bottom: -60%;
        left: -60%;
        transition: 1.25s;
    }

    .switch_circle-t {
        top: -30%;
        left: 60%;
        width: 300px;
        height: 300px;
    }

    .switch_container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        width: 400px;
        padding: 50px 55px;
        transition: 1.25s;
    }

    .switch_button {
        cursor: pointer;
    }

    .switch_button:hover,
    .submit:hover {
        box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
        transform: scale(0.985);
        transition: 0.25s;
    }

    .switch_button:active,
    .switch_button:focus {
        box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
        transform: scale(0.97);
        transition: 0.25s;
    }

    .is-txr {
        left: calc(100% - 400px);
        transition: 1.25s;
        transform-origin: left;
    }

    .is-txl {
        left: 0;
        transition: 1.25s;
        transform-origin: right;
    }

    .is-z {
        z-index: 200;
        transition: 1.25s;
    }

    .is-hidden {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        transition: 1.25s;
    }

    .is-gx {
        animation: is-gx 1.25s;
    }

    @keyframes is-gx {
        0%,
        10%,
        100% {
            width: 400px;
        }

        30%,
        50% {
            width: 500px;
        }
    }
</style>
