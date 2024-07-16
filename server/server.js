const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get("api/home", (req, res) =>{
    res.json({ message: "API is working properly" });
})