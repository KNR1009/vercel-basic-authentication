const { query } = require("express");
const express = require("express");
const app = express();

// firebase周り
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const ServiceAccount = require("./ServiceAccount.json");

admin.initializeApp({ credential: admin.credential.cert(ServiceAccount) });

const db = admin.firestore();
const docRef = db.collection("users").doc("organization3");

// // データを取得
// db.collection("users")
//   .get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       if (doc.id === "organization1") {
//         console.log(doc.id, "=>", doc.data());
//       }
//     });
//   })
//   .catch((err) => {
//     console.log("Error getting documents", err);
//   });

// データを登録;
// const setAda = docRef.set({
//   first: "kazu",
//   last: "itou",
//   born: 1815,
// });

// firebase周り終了

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// htmlファイルから叩かれるエンドポイント
// クエリパラメタで必要な組織idを送る
app.get("/api", function (req, res) {
  const id = req.query.id;
  db.collection("users")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id) {
          res.json(doc.data());
        }
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
  // res.json(obj);
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
