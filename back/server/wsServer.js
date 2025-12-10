const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

// 메모리에 저장될 임시 채팅 기록
let chatHistory = [];

console.log("🔥 WebSocket 서버 실행 중... ws://localhost:3001");

wss.on("connection", (ws) => {
    console.log("✨ 클라이언트 연결됨");

    // 새로 입장한 클라이언트에게 과거 메시지 전송
    chatHistory.forEach(msg => {
        ws.send(JSON.stringify(msg));
    });

    ws.on("message", (msg) => {
        console.log("📩 받은 메시지:", msg.toString());

        let parsed;
        try {
            parsed = JSON.parse(msg);
        } catch (e) {
            console.log("JSON 파싱 실패:", msg.toString());
            return;
        }

        // 메모리에 저장
        chatHistory.push(parsed);

        // 전체 클라이언트에게 브로드캐스트
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsed));
            }
        });
    });

    ws.on("close", () => {
        console.log("❌ 클라이언트 연결 종료");
    });
});
