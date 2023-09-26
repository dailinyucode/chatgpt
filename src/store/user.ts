import { defineStore } from 'pinia';
import { getToken, removeToken, saveToken } from '@/utils/constant';
import { refreshToken } from '@/api/auth/api';
import router from '@/router';
import { UserVO } from '@/api/user/user';
import { getUserInfo } from '@/api/user/api';

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: (): UserVO => ({
        id: null,
        userName: null,
        userEmail: null,
        avatar: null,
        roleVOList: [],
        permissionVOList: []
    }),
    actions: {
        //获取用户信息
        async getUserInfo() {
            await getUserInfo().then(({ data }) => {
                this.id = data.id;
                this.userName = data.userName;
                this.userEmail = data.userEmail;
                this.avatar = data.avatar;
                this.roleVOList = data.roleVOList;
                this.permissionVOList = data.permissionVOList;
            });
        },
        //更新名字
        updateName(name: string) {
            this.userName = name;
        },
        //刷新token
        refreshToken() {
            const token = getToken();
            return refreshToken(token.refreshToken)
                .then((data) => {
                    if (data.code === 200) {
                        //刷新token
                        saveToken(data.data, true);
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch(() => {
                    return false;
                });
        },
        //退出登入
        logout() {
            removeToken();

            router.push({ path: 'login' }).then();
        }
    },
    //整个仓库持久化存储
    persist: {
        enabled: true,
        //指定字段存储，并且指定存储方式：
        strategies: [
            {
                storage: sessionStorage,
                paths: ['id', 'userName', 'userEmail', 'roleVOList', 'permissionVOList', 'avatar']
            } // age 和 count字段用sessionStorage存储
        ]
    }
});
