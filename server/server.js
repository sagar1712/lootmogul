const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

app.get("/api/home", (req, res) =>{
    res.json({ message: "API is working properly" });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});