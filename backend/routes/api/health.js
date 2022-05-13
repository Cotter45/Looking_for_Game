const express = require("express");
const asyncHandler = require("express-async-handler");
const os = require("os");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const redisClient = require("../../utils/redis/index");

const router = express.Router();

// route for load testing, when using fib do not exceed 32 for :n
router.get("/loadtest/:n", asyncHandler( async (req, res, next) => {
  let n = parseInt(req.params.n);

  let fibonnaci = (n) => {
    if (n <= 1) return 1;

    fibonnaci(n - 1) + fibonnaci(n - 2);
  }

  fibonnaci(n);

  res.send('Completed');
  // other tests
}));

function getCPUUsage() {

  let stats1 = getCPUInfo();
  let startIdle = stats1.idle;
  let startTotal = stats1.total;

  let percentage = new Promise((res, rej) => {
    setTimeout(function() {
      let stats2 = getCPUInfo();
      let endIdle = stats2.idle;
      let endTotal = stats2.total;

      let idle = endIdle - startIdle;
      let total = endTotal - startTotal;
      let perc = idle / total;

      res(+perc.toFixed(2));
    }, 1000);
  }).then(value => value);

  return percentage;


function getCPUInfo() {
  
  let cpus = os.cpus();

  // let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;
  let total = 0;

  for (let cpu in cpus) {
    if (!cpus.hasOwnProperty(cpu)) continue;

    // user += cpus[cpu].times.user;
    nice += cpus[cpu].times.nice;
    sys += cpus[cpu].times.sys;
    irq += cpus[cpu].times.irq;
    idle += cpus[cpu].times.idle;
  }

  // total = user + nice + sys + idle + irq;
  total = nice + sys + idle + irq;

  return {
    'idle': idle,
    'total': total
  }
}}

// route to get basic system health, connections, total ram usage, process uptime
router.get("/", asyncHandler( async (req, res, next) => {

  try {

    // id is to get something from the cache to check cache ok
    // await redisClient.set("test", "test");
    // const cache = await redisClient.get("test");

    const freeMem = +(os.freemem() / (1024 * 1024).toFixed(2));
    const totalMem = +(os.totalmem() / (1024 * 1024).toFixed(2));
    const memFreePerc = +((freeMem / totalMem) * 100).toFixed(2);
    const osType = process.arch;
    const heapUsed = Math.round(process.memoryUsage().rss / (1024 * 1024));
    const percHeapUsed = 
      osType.includes('64') ?
        +((heapUsed / 1400) * 100).toFixed(2) :
        +((heapUsed / 700) * 100).toFixed(2);
    const cpus = os.cpus();
    let cpuIdle = 0;

    for (let i = 0, len = cpus.length; i < len; i++) {
      const cpu = cpus[i]
      let total = 0;

      for (let type in cpu.times) {
        total += cpu.tims[type];
      }

      for (type in cpu.times) {
        if (type === 'idle') cpuIdle += Math.round(100 * cpu.times[type] / total);
      }
    }

    const currentCpuPerc = await getCPUUsage();

    const data = {
      message: 'Ok',
      server: 'Ok',
      cache: cache ? 'Ok' : 'Error',
      freeMem,
      totalMem,
      usedMemPerc,
      memFreePerc,
      avgCpuPerc: +(100 - (cpuIdle / cpus.length)).toFixed(2),
      currentCpuPerc,
      osType,
      heapUsed,
      percHeapUsed
    }

    return res.status(200).json(data);

  } catch (e) {

      const data = {
        uptime: process.uptime(),
        message: e.message,
      }

      return res.status(418).json(data);
  }
}))

// route to get todays logs
router.get('/logs/today', asyncHandler( async (req, res, next) => {
  const date = new Date(Date.now());
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDay();

  if (month < 10) month = '0' + `${month}`;
  if (day < 10) day = '0' + `${day}`;

  const file = `info-${year}-${month}-${day}.log`;
  const route = path.resolve('logs');

  let logs = [];

  async function processLineByLine() {
    const fileStream = fs.createReadStream(`${route}/${file}`);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // each line in input.txt will be successively available here as 'line'
      logs.push(JSON.parse(line));
    }
  }

  await processLineByLine();
  return res.json(logs);
}))

// route to get todays error logs
router.get('/errors/today', asyncHandler( async (req, res, next) => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDay();

  if (month < 10) month = '0' + `${month}`;
  if (day < 10) day = '0' + `${day}`;

  const file = `errors-${year}-${month}-${day}.log`;
  const route = path.resolve('logs');

  let logs = [];

  async function processLineByLine() {
    const fileStream = fs.createReadStream(`${route}/${file}`);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // each line in input.txt will be successively available here as 'line'
      logs.push(JSON.parse(line));
    }
  }

  await processLineByLine();
  return res.json(logs);
}))

// route to get 1 weeks worth of logs
router.get('/logs/week', asyncHandler( async (req, res, next) => {

  const dates = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  const files = [];

  for ( let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + `${month}`;
    if (day < 10) day = '0' + `${day}`;

    files.push(`info-${year}-${month}-${day}.log`);
  }

  const route = path.resolve('logs');

  let logs = [];

  async function processLineByLine(files, routes) {
    for (let file of files) {
      if (fs.existsSync(`${route}/${file}`)) {
        const fileStream = fs.createReadStream(`${route}/${file}`);

        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });

        for await (const line of rl) {
          logs.push(JSON.parse(line));
        }
      } else continue;
    }
  }

  await processLineByLine(files, route);
  return res.json(logs);
}))

// route to get 1 weeks worth of error logs
router.get('/logs/week', asyncHandler( async (req, res, next) => {

  const dates = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  const files = [];

  for ( let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + `${month}`;
    if (day < 10) day = '0' + `${day}`;

    files.push(`errors-${year}-${month}-${day}.log`);
  }

  const route = path.resolve('logs');

  let logs = [];

  async function processLineByLine(files, routes) {
    for (let file of files) {
      if (fs.existsSync(`${route}/${file}`)) {
        const fileStream = fs.createReadStream(`${route}/${file}`);

        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });

        for await (const line of rl) {
          logs.push(JSON.parse(line));
        }
      } else continue;
    }
  }

  await processLineByLine(files, route);
  return res.json(logs);
}))

// route to get 2 weeks worth of logs
router.get('/logs/two_week', asyncHandler( async (req, res, next) => {

  const dates = [...Array(14)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  const files = [];

  for ( let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + `${month}`;
    if (day < 10) day = '0' + `${day}`;

    files.push(`info-${year}-${month}-${day}.log`);
  }

  const route = path.resolve('logs');

  let logs = [];

  async function processLineByLine(files, routes) {
    for (let file of files) {
      if (fs.existsSync(`${route}/${file}`)) {
        const fileStream = fs.createReadStream(`${route}/${file}`);

        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });

        for await (const line of rl) {
          logs.push(JSON.parse(line));
        }
      } else continue;
    }
  }

  await processLineByLine(files, route);
  return res.json(logs);
}))

// route to get 2 weeks worth of error logs
router.get('/logs/two_week', asyncHandler( async (req, res, next) => {

  const dates = [...Array(14)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  const files = [];

  for ( let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + `${month}`;
    if (day < 10) day = '0' + `${day}`;

    files.push(`errors-${year}-${month}-${day}.log`);
  }

  const route = path.resolve('logs');

  let logs = [];

  async function processLineByLine(files, routes) {
    for (let file of files) {
      if (fs.existsSync(`${route}/${file}`)) {
        const fileStream = fs.createReadStream(`${route}/${file}`);

        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });

        for await (const line of rl) {
          logs.push(JSON.parse(line));
        }
      } else continue;
    }
  }

  await processLineByLine(files, route);
  return res.json(logs);
}))


module.exports = router;