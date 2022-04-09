import express from "express";

const app = express();

app.use('/', (req, res) => {
    res.send('Hello World from Express 2');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Working on port: ${port}`);
});