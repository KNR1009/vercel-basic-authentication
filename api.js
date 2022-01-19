const { query } = require("express");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// エンドポイントの作成
app.get("/api", function (req, res) {
  var obj = { aaa: 100, bbb: 200 };

  // if (req.query.ip === kazu) {
  //   var obj = { aaa: 100, bbb: 200 };
  // } else {
  //   var obj = { message: "エラーです" };
  // }
  res.json(obj);
});

// ページ遷移
app.get("/", (req, res) => {
  try {
    // res.send({ name: "hoge" });
    res.sendFile(__dirname + "/public/index.html");
  } catch (error) {
    res.sendStatus(500);
  }
});

//app.listen(process.env.PORT || 3000);
app.listen({ port: 3000 }, () => {
  console.log(`Server ready at http://localhost:3000`);
});
console.log("starts");

module.exports = app;
