<template>
    <el-dialog v-model="showFollow" title="关注公众号" :before-close="handleClose">
        <div class="root">
            <div class="content">
                <div class="item img">
                    <img :src="wxCount" class="image" alt="程序员伊和" />
                </div>
                <div class="item text">
                    <span>关注公众号: </span>
                    <span style="font-size: 0.9rem; font-weight: bold"> 程序员伊和 </span>
                </div>
                <div class="item text">
                    <span> 回复: </span>
                    <span style="font-size: 0.9rem; color: red; font-weight: bold">
                        {{ code }}
                    </span>
                </div>
                <div class="item text">
                    <span> 可免费获取50次</span>
                </div>
            </div>
            <div class="content">
                <div class="item img">
                    <img :src="wx" class="image" alt="程序员伊和" />
                </div>
                <div class="item text" />
                <div class="item text">
                    <span>联系作者</span>
                </div>
                <div class="item text">
                    <span> 获取带有免费次数 </span>
                    <span style="font-size: 0.9rem; color: red; font-weight: bold"> 兑换码 </span>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'FollowComponent'
    });
</script>
<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import wxCount from '@/assets/wx_count.jpg';
    import wx from '@/assets/wx.jpg';
    import { getCode } from '@/api/chatgpt/api';

    const props = defineProps<{ showFollow: boolean }>();
    const emit = defineEmits(['down-follow']);
    const showFollow = ref(false);
    watch(
        () => props.showFollow,
        (newVale) => {
            showFollow.value = newVale;
            if (newVale) {
                loadCode();
            }
        }
    );
    function handleClose() {
        emit('down-follow');
    }

    const code = ref('');
    function loadCode() {
        getCode({
            freeType: 'WX'
        }).then(({ data }) => {
            code.value = data;
        });
    }
</script>
<style scoped>
    .root {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content {
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        /*纵向排列*/
        flex-direction: column;
        padding: 10px;
    }

    .image {
        max-width: 200px;
        max-height: 200px;
        display: block;
        margin: 0 auto;
    }

    .item {
        margin: 10px 4px;
    }
    .text {
        height: 1rem;
        font-size: 0.875rem;
        color: black;
    }
</style>
