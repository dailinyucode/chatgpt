import { LoginVO } from '@/api/auth/auth';

//localStorage 的 key
const localKey = {
    Token: 'TOKEN'
};

function saveToken(loginVO: LoginVO, remember: boolean) {
    console.log('loginVO 返回值', loginVO);
    removeToken();
    if (remember) {
        localStorage.setItem(localKey.Token, JSON.stringify(loginVO));
    } else {
        sessionStorage.setItem(localKey.Token, JSON.stringify(loginVO));
    }
}

function getToken(): LoginVO {
    const token = sessionStorage.getItem(localKey.Token) || localStorage.getItem(localKey.Token);
    return token && JSON.parse(token);
}

export function removeToken() {
    localStorage.removeItem(localKey.Token);
    sessionStorage.removeItem(localKey.Token);
    sessionStorage.removeItem('user');
}

export { saveToken, getToken };
