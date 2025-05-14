// express 모듈을 불러옵니다.
const express = require("express");
// 파일 경로를 다루기 위한 path 모듈을 불러옵니다. Node.js 내장 모듈이에요.
const path = require("path");

// Express 애플리케이션 인스턴스를 생성합니다.
const app = express();
// 서버가 사용할 포트 번호를 정합니다. 보통 3000번이나 8080번을 많이 써요!
const port = 3000; // 원하는 포트 번호로 바꿔도 괜찮아요.

// 'public' 폴더를 정적 파일(static files) 제공 폴더로 설정합니다.
// 이렇게 설정하면 브라우저에서 '/파일이름' 형식으로 public 폴더 안의 파일들에 바로 접근할 수 있게 됩니다.
// 예) public/index.html -> http://localhost:3000/index.html 로 접근 가능
// 예) public/style.css -> http://localhost:3000/style.css 로 접근 가능
// 네 HTML, CSS, JS 파일들을 이 public 폴더에 넣어두면 돼요!
app.use(express.static(path.join(__dirname, "public")));

// 만약 사용자가 웹사이트의 기본 주소('/')로 접속하면,
// public 폴더 안에 있는 index.html 파일을 보여주도록 설정할 수 있습니다.
// app.use(express.static(path.join(__dirname, 'public'))); 설정을 해두면
// public 폴더 안에 index.html 파일이 있을 경우 이 라인이 없어도 자동으로 보여주기도 합니다.
// 필요하다면 아래 코드를 추가하거나 사용하세요.
/*
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 설정된 포트 번호로 서버를 시작하고 대기합니다.
app.listen(port, () => {
  // 서버가 성공적으로 시작되면 이 메시지가 터미널에 출력됩니다.
  console.log(`서버가 http://localhost:${port} 에서 실행 중이에요!`);
  console.log(
    `이제 웹 브라우저를 열고 http://localhost:${port} 로 접속해 보세요.`
  );
});
