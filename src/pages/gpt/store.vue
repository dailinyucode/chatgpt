<template>
    <el-dialog
        v-model="showStore"
        style="margin-top: 10px"
        width="50%"
        title="购买次数"
        :before-close="handleClose"
    >
        <el-row>
            <el-col v-for="o in productList" :key="o.id" class="col" :span="8" :gutter="20">
                <el-card class="card" shadow="hover">
                    <img :src="o.url" class="image" />
                    <div style="padding: 14px">
                        <span>{{ o.name }}</span>
                    </div>
                    <div class="buy">
                        <span>购买</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'StoreComponent'
    });
</script>
<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { getProductList } from '@/api/chatgpt/api';
    import { ProductVO } from '@/api/chatgpt/chatgpt';

    const props = defineProps<{ showStore: boolean }>();
    const emit = defineEmits(['down-store']);
    const showStore = ref(false);
    watch(
        () => props.showStore,
        (newVale) => {
            showStore.value = newVale;
            if (newVale) {
                localProduct();
            }
        }
    );
    function handleClose() {
        emit('down-store');
    }

    const productList = ref<ProductVO[]>([]);
    async function localProduct() {
        await getProductList().then(({ data }) => {
            productList.value = data;
        });
    }
</script>
<style scoped>
    .col {
        padding: 14px;
    }
    .card {
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .image {
        width: 220px;
        height: 140px;
        display: block;
        margin: 0 auto;
    }
    .buy {
        padding: 14px;
    }
    .buy:hover {
        background-color: #e1e1e1;
    }
</style>
