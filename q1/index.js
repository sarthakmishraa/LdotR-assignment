import http from "http";


const PORT = process.env.PORT | 3000;

const app = http.createServer((req, res) => {
    res.end("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Simple NodeJS server running on port: ${ PORT }`)
})