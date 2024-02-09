const express = require("express");
const app = express();

app.get("/", (req, res) => {
   res.send("root working");
});

app.listen(5000, () => {
   console.log("app listening on port 5000");
});
