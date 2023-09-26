<template>
    <el-dialog v-model="showSetting" title="管理设置" :before-close="handleClose">
        <div class="setting">
            <div class="form">
                <el-form class="demo-form-inline" label-position="right" label-width="120px">
                    <el-form-item label="OpenAi官方地址">
                        <el-input
                            v-model="chatConfig.baseUrl"
                            style="width: 100%"
                            placeholder="OpenAi官方地址"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label="密钥key">
                        <el-input
                            v-model="chatConfig.key"
                            style="width: 100%"
                            placeholder="OpenAi官方地址"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label="连接类型">
                        <el-select v-model="chatConfig.proxyType" placeholder="连接类型" clearable>
                            <el-option label="直连" value="DIRECT" />
                            <el-option label="代理" value="PROXY" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理Ip">
                        <el-input
                            v-model="chatConfig.proxyIp"
                            style="width: 100%"
                            placeholder="输入代理Ip"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label="代理端口">
                        <el-input
                            v-model="chatConfig.port"
                            style="width: 100%"
                            placeholder="输入代理端口"
                            clearable
                        />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showSetting = false">取消</el-button>
                <el-button type="primary" @click="save"> 保存 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'SettingComponent'
    });
</script>
<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { ChatConfig } from '@/api/chatgpt/chatgpt';
    import { getChatConfig, saveChatConfig } from '@/api/chatgpt/api';

    const chatConfig = ref<ChatConfig>({
        baseUrl: '',
        key: '',
        proxyIp: '',
        port: 0,
        proxyType: ''
    });

    async function loadChatConfig() {
        getChatConfig().then(({ data }) => {
            chatConfig.value = data;
        });
    }

    function save() {
        saveChatConfig(chatConfig.value).then(() => {
            showSetting.value = false;
        });
    }

    const props = defineProps<{ showSetting: boolean }>();
    const emit = defineEmits(['down-setting']);
    const showSetting = ref(false);
    watch(
        () => props.showSetting,
        (newVale) => {
            showSetting.value = newVale;
            if (newVale) {
                loadChatConfig();
            }
        }
    );
    function handleClose() {
        emit('down-setting');
    }
</script>
<style scoped>
    .setting {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form {
        width: 600px;
    }

    .demo-form-inline .el-input {
        --el-input-width: 220px;
    }
</style>
