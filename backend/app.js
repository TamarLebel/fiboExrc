const express = require("express");
const cors = require("cors");
const github = require("./controllers/githubCtrl");

const app = express();
const port = 3001;

app.use(cors());
app.use("/github", github);

app.listen(port, () => {
  console.log(`server listen on port: ${port}`);
});
