<template>
    <el-dialog v-model="showExchange" title="福利兑换" :before-close="handleClose">
        <el-form-item label="兑换码" label-width="100px">
            <el-input v-model="codeN" type="password" placeholder="输入兑换码" show-password />
        </el-form-item>
        <el-form-item class="item" label-width="100px">
            <el-button style="width: 100px" @click="exchange">兑换</el-button>
        </el-form-item>
    </el-dialog>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'ExchangeComponent'
    });
</script>
<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { parseCode } from '@/api/chatgpt/api';
    import { ElMessage } from 'element-plus';
    import { useUserStore } from '@/store/user';

    const props = defineProps<{ showExchange: boolean }>();
    const emit = defineEmits(['down-exchange', 'change-frequency']);
    const userInfo = useUserStore();
    const showExchange = ref(false);
    watch(
        () => props.showExchange,
        (newVale) => {
            showExchange.value = newVale;
        }
    );
    function handleClose() {
        emit('down-exchange');
    }

    const codeN = ref('');

    function exchange() {
        if (userInfo.id) {
            parseCode({
                code: codeN.value,
                type: 'OTHER',
                userId: userInfo.id
            }).then(({ code }) => {
                if (code === 200) {
                    ElMessage({
                        showClose: true,
                        message: '兑换成功',
                        type: 'success'
                    });
                    emit('change-frequency');
                }
                codeN.value = '';
            });
        }
    }
</script>

<style scoped>
    .el-button:focus,
    .el-button:hover {
        background-color: #bdbdbd;
        color: rgba(0, 0, 0, 0.91);
        border: 1px #bdbdbd;
    }
</style>
