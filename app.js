const protect = require("static-auth");
const safeCompare = require("safe-compare");

const app = protect(
  "/",
  (username, password) =>
    safeCompare(username, process.env.USERNAME || "admin") &&
    safeCompare(password, process.env.PASSWORD || "admin"),
  {
    directory: `${__dirname}/public`,
    onAuthFailed: (res) => {
      res.end("Authentication failed");
    },
  }
);

// const local = () => {
//   console.log("aaa");
// };

module.exports = app;
// module.exports = local;
