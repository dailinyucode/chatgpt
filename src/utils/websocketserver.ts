const baseWebsocketPath = import.meta.env.VITE_WEBSOCKET_API;

let webSocket: WebSocket;

function webSocketLink(userId: string) {
    const path = baseWebsocketPath + '/chat/api/' + userId;
    webSocket = new WebSocket(path);
    webSocket.onopen = () => {
        console.log('链接成功');
    };

    webSocket.onclose = (e) => {
        console.log('关闭链接', e);
    };

    webSocket.onmessage = (e) => {
        console.log('服务端的消息', e.data);
    };
}
