const http = require('http');
const fs = require("fs");
const path = require("path");


const PORT = 3000;

const serveFile = (res,filePath, statusCode = 200) =>{

    fs.readFile(filePath,(err,data) => {
        if(err){
            res.writeHead(500,{"Content-Type": "text/plain"});
            res.end("Internal Server Error")
        }
        else{
            res.writeHead(statusCode,{"Contect-Type" : "text/html"});
            res.end(data);
        }
    });
};


const server = http.createServer((req,res) => {
    if(req.url === "/style.css"){
        fs.readFile(path.join(__dirname,"public","style.css"),(err,data) =>{
            if(err){
                res.writeHead(500);
                res.end()
            }else{
                res.writeHead(200, {"Content-Type": "text/css"});
                res.end(data);
            }
        });
        return;
    }

    switch (req.url){
        case "/":
        case "/home":
            serveFile(res, path.join(__dirname, "pages", "home.html"), 200);
            break;
        
        case "/about":
            serveFile(res, path.join(__dirname, "pages", "about.html"), 200);
            break;

        case "/contact":
            serveFile(res, path.join(__dirname, "pages", "contact.html"), 200);
            break;

        default:
            serveFile(res, path.join(__dirname, "pages","404.html"), 404);
            
    }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
