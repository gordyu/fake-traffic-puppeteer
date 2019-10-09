const puppeteer = require('puppeteer');
const config = require('./config.js');
const URL = config.URL;
const proxies = [ //see https://free-proxy-list.net/
    "52.37.86.231:8118",
    "134.209.219.234:80",
    "69.64.87.186:3128",
    "104.236.55.48:8080",
    "45.79.58.206:8123",
    "45.79.39.170:8118",
    "52.37.86.231:8118",
    "134.209.219.234:80",
    "69.64.87.186:3128",
    "104.236.55.48:8080",
    "45.79.58.206:8123",
    "45.79.39.170:8118",
    "69.64.87.141:3128",
    "69.64.81.253:3128",
    "49.51.195.24:1080",
    "69.64.78.4:3128",
    "69.64.89.79:3128",
    "23.102.169.60:3128",
    "69.64.77.172:3128",
    "104.236.54.196:8080",
    "69.64.83.84:3128",
    "76.76.76.74:53281",
    "69.64.89.134:3128",
    "69.64.82.217:3128",
    "69.64.79.167:3128",
    "69.64.82.28:312"];
const randProxy = () =>
    proxies[Math.floor(Math.random() * (proxies.length - 1))];

const autoScroll = page =>
    page.evaluate(
      async () =>
        await new Promise((resolve, reject) => {
          let totalHeight = 0;
          let distance = 5000;
          let timer = setInterval(() => {
            var scrollHeight = 10000; 
                //Forbes defeats by appending new articles toward the end.
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 1);
        })
    );


  (async () => {
    var timesRun = 0;
    while (timesRun < 100) {
        const browser = await puppeteer.launch({
            args: [`--proxy-server=http=${randProxy}`, "--incognito"],
            headless: false
        });
        const page = await browser.newPage();
        await page.goto(URL, { waitUntil: "networkidle2" });
        await page.setViewport({ width: 1200, height: 800 });
        await autoScroll(page);
        await browser.close();
        timesRun++;
        console.log('Ran', timesRun, 'times');
    }
  })();