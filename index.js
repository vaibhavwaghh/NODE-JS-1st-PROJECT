// const fs = require("fs");
/**SYNCRONOUS CODE */
// const input = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(input);
/**ASSYNCHRONOUS CODE */
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// console.log("VAIBHAV WAGH");

/**CALL-BACK HELL */
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//     });
//   });
// });
// console.log("VAIBHAV WAGH");

// const http = require("http");
/**BUILDING A SERVER */
// const server = http.createServer((req, res) => {
//   res.end("HELLO I AM THE SERVER MOTHERFUCKER");
// });
// server.listen(9000, "127.0.0.1", () => {
//   console.log("SERVER IS LISTENING MOTHERFUCKER");
// });

/**IMPLEMENT ROUTING */
// const http = require("http");
// const url = require("url");
// const server = http.createServer((req, res) => {
//   if (req.url === "/overview") {
//     res.end("WELCOME OVERVIEW");
//   } else if (req.url === "/result") {
//     res.end("WELCOME RESULT");
//   } else if (req.url === "/") {
//     res.end("WELCOME HOME ");
//   } else {
//     res.writeHead(400, {
//       "Content-type": "text/html",
//       "my-own-header": "TERI MAA KI CHUDIYA KHANKEGI",
//     });
//     res.end("<h1>ERROR HAI BSDK</h1>");
//   }
// });
// server.listen(9000, "127.0.0.1", () => {
//   console.log("SERVER LISTENING BUDDY");
// });

/**BUILDING A SIMPLE WEB API */
// const http = require("http");
// const url = require("url");
// const fs = require("fs");
// // const showData = fs.readFileSync("./dev-data/data.json", "utf-8");
// const server = http.createServer((req, res) => {
//   if (req.url === "/overview") {
//     res.end("WELCOME OVERVIEW");
//   } else if (req.url === "/result") {
//     fs.readFile(`${__dirname}/dev-data/data.json`, (err, data) => {
//       const showData = JSON.parse(data);
//       console.log(
//         showData
//       ); /**TO SHOW DATA IN CONSOLE I NEED TO PARSE IT FROM JSON FORMAT TO JAVASCRIPT */
//       res.writeHead(200, {
//         "Content-type": "application/json",
//       });
//       res.end(data);
//     });
//     // res.end(`${showData}`);
//   } else if (req.url === "/") {
//     res.end("WELCOME HOME ");
//   } else {
//     res.writeHead(400, {
//       "Content-type": "text/html",
//       "my-own-header": "TERI MAA KI CHUDIYA KHANKEGI",
//     });
//     res.end("<h1>ERROR HAI BSDK</h1>");
//   }
// });
// server.listen(9001, "127.0.0.1", () => {
//   console.log("SERVER LISTENING BUDDY");
// });

/**HTML TEMPLATE PASS DATA */
const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/module.js");
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

/**LOAD THE DATA FROM DATA.JSON */
const showData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(showData);
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(url.parse(req.url));
  const { query, pathname } = url.parse(req.url, true);
  console.log(query, pathname);
  /**OVERVIEW PAGE */
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardHTML = dataObj.map((el) => replaceTemplate(templateCard, el));
    const output2 = templateOverview.replace(`{%PRODUCT_CARDS%}`, cardHTML);
    res.end(output2);
  } else if (pathname === "/product") {
    /**PROCUCT PAGE */
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    console.log(product, query);
    const output4 = replaceTemplate(templateProduct, product);
    res.end(output4);
  } else if (pathname === "/api") {
    /**API PAGE */
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(showData);
  } else {
    /**NOT FOUND */
    res.writeHead(400, {
      "Content-type": "text/html",
      "my-own-header": "TERI MAA KI CHUDIYA KHANKEGI",
    });
    res.end("<h1>ERROR HAI BSDK</h1>");
  }
});
server.listen(9002, "127.0.0.6", () => {
  console.log("SERVER LISTENING BUDDY");
});
