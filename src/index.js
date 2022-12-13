const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", require("./user/user.router"));

app.get("/", (req, res) => {
  res.send(
    `<div><h5>Hello</h5><p>Please make a post request to /user/login to login</p></div>`
  );
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await dbConnect();
  console.log(`server started at http://localhost:${PORT}`);
});
