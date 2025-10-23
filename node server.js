// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// API 키를 저장할 임시 객체 (실제 운영 환경에서는 DB 사용 필수)
let apiKeys = {
    openAiKey: null,
    elevenLabsKey: null
};

app.use(bodyParser.json());
// HTML 파일들이 있는 디렉토리를 정적 파일로 제공
app.use(express.static(path.join(__dirname)));

// 1. API 키 저장 엔드포인트
app.post('/api/save-keys', (req, res) => {
    const { openAiKey, elevenLabsKey } = req.body;
    
    if (openAiKey) {
        apiKeys.openAiKey = openAiKey;
        console.log('OpenAI API Key 저장됨');
    }
    if (elevenLabsKey) {
        apiKeys.elevenLabsKey = elevenLabsKey;
        console.log('ElevenLabs API Key 저장됨');
    }

    res.json({ message: 'API 키가 성공적으로 저장되었습니다.' });
});

// 2. API 키 로드 엔드포인트
app.get('/api/load-keys', (req, res) => {
    // 키 자체를 클라이언트에게 직접 노출하는 것은 보안상 위험할 수 있지만,
    // 테스트 및 학습 목적으로는 제공합니다.
    res.json(apiKeys);
});

// 3. 메인 화면으로 리디렉션
app.get('/', (req, res) => {
    // API 입력 화면으로 리디렉션
    res.sendFile(path.join(__dirname, 'api_input.html')); 
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
    console.log(`API 키 입력 화면: http://localhost:${port}/api_input.html`);
});