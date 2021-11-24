const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const { start } = require('repl');
const fs = require('fs');
const superagent = require('superagent')
const bot = require('./cartSender')
require('superagent-proxy')(superagent)
puppeteer.use(stealthPlugin());


let proxies = fs.readFileSync('proxies.txt').toString().split("\r\n");


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }  



product = 'https://www.shoepalace.com/product/puma/193663-03/clyde-hardwood-mens-basketball-shoe-white-pink/'


async function plzAtc(page, number) {

    const findAccessDenied = await page.evaluate(() => window.find("Error 1005"));
    const findSoftBan = await page.evaluate(() => window.find("Error 501"));
    const findAllCartsBusy = await page.evaluate(() => window.find("All Carts Busy"));
    console.log('[TASK ' + number + '] - GOING TO PRODUCT PAGE...')
    await page.goto(product)

    page.on('1005', hardBan=> {
      console.log(err, '[TASK ' + number + '] - PROXY BAN. RESTARTING...');
      browser.close()
      startTask(number)
    });
  
    page.on('501', softBan=> {
      console.log(softBan, '[TASK ' + number + '] - RATE LIMITED. RESTARTING...');
    })

    const attr = await page.$$eval("button.button.w32.dark", el => el.map(x => x.getAttribute("data-id")));


    await page.waitFor(4000)
    sizeChoice = attr[Math.floor(Math.random() * ((attr.length-1)))];
    await page.waitFor(3000)

    await page.goto("https://www.shoepalace.com/checkout/cart/add/product/" + sizeChoice);
     try {
       await page._client.send('Network.getAllCookies').array.forEach(element => {
         if(element.name === 'frontend') {
           console.log(element.name)
           bot.sendHook(element.name)
         }
       });
     } catch {
       console.log('ATC Failed! Retrying...')
       await page.waitFor(150000)
       plzAtc(page)
     }

     await page._client.send('Network.getAllCookies').array.forEach(element => {
       if(element.name === 'frontend') {
         console.log(element.name)
         bot.sendHook(element.name)
       }
     });

    let cookies = await page.cookies();
    console.log("with page.cookies: " + cookies)
    let frontend = cookies.filter(obj => {
      if(obj.name === 'frontend') {
        bot.sendHook(obj.value)
      }
    })
    
    
}

async function startTask(number) {
  console.log('[TASK ' + number + '] - STARTING...')

  if (proxies[0].indexOf(':') != proxies[0].lastIndexOf(':')) {
    let authProxy = proxy.split(':')
    const browser = await puppeteer.launch( {
      headless: false,
      defaultViewport: null,
      args: [
        '--proxy-server=http://' + authProxy[0] + ':' + authProxy[1]
      ]
  });
    await page.authenticate({
      'username': authProxy[2],
      'password': authProxy[3]
  });

  proxies.shift();
  } else{
  const browser = await puppeteer.launch( {
    headless: false,
    defaultViewport: null,
    args: [
      '--proxy-server=http://' + proxies[0]
    ]
  });

  proxies.shift();


  }

    const browser = await puppeteer.launch( {
        headless: false,
        defaultViewport: null,
        args: [
          '--proxy-server=http://' + proxies[number]
        ] //'--proxy-server=' + authProxy[0] + ':' + authProxy[1]
    });
    
    
    const page = await browser.newPage();
    
    
    await sleep(5000);
    
    await plzAtc(page, number);
    


     if (findAccessDenied) {
         // Kill browser, delete proxy from list, new browser
     }
     if (findAllCartsBusy) {
         page.waitFor(120000)
         console.log(new Date().toLocaleTimeString(), '[ALL CARTS BUSY] RETRYING AFTER DELAY...')
         plzAtc();
     }

     if (findSoftBan) {
         console.log(new Date().toLocaleTimeString(), '[501 ERROR] [POSSIBLE PROXY BAN] RETRYING...')
         browser.close() 
     }

    browser.close()
}

async function reqATCtest() {
  const browser = await puppeteer.launch( {
    headless: false,
    defaultViewport: null,
    args: [
      '--proxy-server=http://192.214.218.139:48007'
    ] //'--proxy-server=' + authProxy[0] + ':' + authProxy[1]
  });
  const page = await browser.newPage();
  await page.goto("https://www.shoepalace.com/product/nike/cn8490-001/air-max-90-mens-running-shoe-grey-wolf-grey-black/");
  const attr = await page.$$eval("button.button.w32.dark", el => el.map(x => x.getAttribute("data-id")));
  let sizeChoice = attr[Math.floor(Math.random() * ((attr.length-1)))];

  page.on('console', consoleObj => console.log(consoleObj.text()));

  page.evaluate(async() => {
    console.log("doing request things...")
    fetch("https://www.shoepalace.com/checkout/cart/add/product/855662", {
      credentials: "include",
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    }).then(function(response) {
      console.log(response.headers['set-cookie']);  
    })
  });
}

readline.question('Enter Task Number \n >', taskCount => {
    console.log(new Date().toLocaleTimeString(), 'Starting')
    for(let i = 1; i <= taskCount; i++) {
      startTask(i)
      sleep(5000);
    }
})


