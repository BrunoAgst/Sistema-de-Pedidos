const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.set(express.static('public'));

app.get("/", (req, res) => {
    res.send("<h1> Teste </h1>");
});

app.listen("3000", () => {
    console.log("servidor ok");
});