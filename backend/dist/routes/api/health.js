"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// const express = require("express");
const express_1 = __importDefault(require("express"));
const asyncHandler = require("express-async-handler");
const os = require("os");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const redisClient = require("../../utils/redis/index");
const router = express_1.default.Router();
// route for load testing, when using fib do not exceed 32 for :n
router.get("/loadtest/:n", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let n = parseInt(req.params.n);
    let fibonnaci = (n) => {
        if (n <= 1)
            return 1;
        // @ts-ignore
        fibonnaci(n - 1) + fibonnaci(n - 2);
    };
    fibonnaci(n);
    res.send('Completed');
    // other tests
})));
function getCPUUsage() {
    let stats1 = getCPUInfo();
    let startIdle = stats1.idle;
    let startTotal = stats1.total;
    let percentage = new Promise((res, rej) => {
        setTimeout(function () {
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
        let user = 0;
        let nice = 0;
        let sys = 0;
        let idle = 0;
        let irq = 0;
        let total = 0;
        for (let cpu in cpus) {
            if (!cpus.hasOwnProperty(cpu))
                continue;
            user += cpus[cpu].times.user;
            nice += cpus[cpu].times.nice;
            sys += cpus[cpu].times.sys;
            irq += cpus[cpu].times.irq;
            idle += cpus[cpu].times.idle;
        }
        total = user + nice + sys + idle + irq;
        // total = nice + sys + idle + irq;
        return {
            'idle': idle,
            'total': total
        };
    }
}
// route to get basic system health, connections, total ram usage, process uptime
router.get("/", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // id is to get something from the cache to check cache ok
        yield redisClient.set("test", "test");
        const cache = yield redisClient.get("test");
        const freeMem = +(os.freemem() / (1024 * 1024)).toFixed(2);
        const totalMem = +(os.totalmem() / (1024 * 1024)).toFixed(2);
        const memFreePerc = +((freeMem / totalMem) * 100).toFixed(2);
        const osType = process.arch;
        const heapUsed = Math.round(process.memoryUsage().rss / (1024 * 1024));
        const percHeapUsed = osType.includes('64') ?
            +((heapUsed / 1400) * 100).toFixed(2) :
            +((heapUsed / 700) * 100).toFixed(2);
        const cpus = os.cpus();
        let cpuIdle = 0;
        for (let i = 0, len = cpus.length; i < len; i++) {
            const cpu = cpus[i];
            let total = 0;
            for (let type in cpu.times) {
                total += cpu.times[type];
            }
            for (let type in cpu.times) {
                if (type === 'idle')
                    cpuIdle += Math.round(100 * cpu.times[type] / total);
            }
        }
        const currentCpuPerc = yield getCPUUsage();
        const data = {
            message: 'Ok',
            server: 'Ok',
            cache: cache ? 'Ok' : 'Error',
            freeMem,
            totalMem,
            usedMemPerc: +(((totalMem - freeMem) / totalMem) * 100).toFixed(2),
            memFreePerc,
            avgCpuPerc: +(100 - (cpuIdle / cpus.length)).toFixed(2),
            currentCpuPerc,
            osType,
            heapUsed,
            percHeapUsed
        };
        return res.status(200).json(data);
    }
    catch (e) {
        const data = {
            uptime: process.uptime(),
            message: e.message,
        };
        return res.status(418).json(data);
    }
})));
// route to get todays logs
router.get('/logs/today', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    if (month < 10)
        month = '0' + `${month}`;
    if (day < 10)
        day = '0' + `${day}`;
    const file = `info-${year}-${month}-${day}.log`;
    const route = path.resolve('logs');
    let logs = [];
    function processLineByLine() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const fileStream = fs.createReadStream(`${route}/${file}`);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
            try {
                // Note: we use the crlfDelay option to recognize all instances of CR LF
                // ('\r\n') in input.txt as a single line break.
                for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), !rl_1_1.done;) {
                    const line = rl_1_1.value;
                    // each line in input.txt will be successively available here as 'line'
                    logs.push(JSON.parse(line));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (rl_1_1 && !rl_1_1.done && (_a = rl_1.return)) yield _a.call(rl_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    yield processLineByLine();
    return res.json(logs);
})));
// route to get todays error logs
router.get('/errors/today', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    if (month < 10)
        month = '0' + `${month}`;
    if (day < 10)
        day = '0' + `${day}`;
    const file = `errors-${year}-${month}-${day}.log`;
    const route = path.resolve('logs');
    let logs = [];
    function processLineByLine() {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const fileStream = fs.createReadStream(`${route}/${file}`);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
            try {
                // Note: we use the crlfDelay option to recognize all instances of CR LF
                // ('\r\n') in input.txt as a single line break.
                for (var rl_2 = __asyncValues(rl), rl_2_1; rl_2_1 = yield rl_2.next(), !rl_2_1.done;) {
                    const line = rl_2_1.value;
                    // each line in input.txt will be successively available here as 'line'
                    logs.push(JSON.parse(line));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (rl_2_1 && !rl_2_1.done && (_a = rl_2.return)) yield _a.call(rl_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    yield processLineByLine();
    return res.json(logs);
})));
// route to get 1 weeks worth of logs
router.get('/logs/week', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dates = [...Array(7)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date;
    });
    const files = [];
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10)
            month = '0' + `${month}`;
        if (day < 10)
            day = '0' + `${day}`;
        files.push(`info-${year}-${month}-${day}.log`);
    }
    const route = path.resolve('logs');
    let logs = [];
    function processLineByLine(files, routes) {
        var e_3, _a;
        return __awaiter(this, void 0, void 0, function* () {
            for (let file of files) {
                if (fs.existsSync(`${route}/${file}`)) {
                    const fileStream = fs.createReadStream(`${route}/${file}`);
                    const rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity
                    });
                    try {
                        for (var rl_3 = (e_3 = void 0, __asyncValues(rl)), rl_3_1; rl_3_1 = yield rl_3.next(), !rl_3_1.done;) {
                            const line = rl_3_1.value;
                            logs.push(JSON.parse(line));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (rl_3_1 && !rl_3_1.done && (_a = rl_3.return)) yield _a.call(rl_3);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                else
                    continue;
            }
        });
    }
    yield processLineByLine(files, route);
    return res.json(logs);
})));
// route to get 1 weeks worth of error logs
router.get('/errors/week', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dates = [...Array(7)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date;
    });
    const files = [];
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10)
            month = '0' + `${month}`;
        if (day < 10)
            day = '0' + `${day}`;
        files.push(`errors-${year}-${month}-${day}.log`);
    }
    const route = path.resolve('logs');
    let logs = [];
    function processLineByLine(files, routes) {
        var e_4, _a;
        return __awaiter(this, void 0, void 0, function* () {
            for (let file of files) {
                if (fs.existsSync(`${route}/${file}`)) {
                    const fileStream = fs.createReadStream(`${route}/${file}`);
                    const rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity
                    });
                    try {
                        for (var rl_4 = (e_4 = void 0, __asyncValues(rl)), rl_4_1; rl_4_1 = yield rl_4.next(), !rl_4_1.done;) {
                            const line = rl_4_1.value;
                            logs.push(JSON.parse(line));
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (rl_4_1 && !rl_4_1.done && (_a = rl_4.return)) yield _a.call(rl_4);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                else
                    continue;
            }
        });
    }
    yield processLineByLine(files, route);
    return res.json(logs);
})));
// route to get 2 weeks worth of logs
router.get('/logs/two_week', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dates = [...Array(14)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date;
    });
    const files = [];
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10)
            month = '0' + `${month}`;
        if (day < 10)
            day = '0' + `${day}`;
        files.push(`info-${year}-${month}-${day}.log`);
    }
    const route = path.resolve('logs');
    let logs = [];
    function processLineByLine(files, routes) {
        var e_5, _a;
        return __awaiter(this, void 0, void 0, function* () {
            for (let file of files) {
                if (fs.existsSync(`${route}/${file}`)) {
                    const fileStream = fs.createReadStream(`${route}/${file}`);
                    const rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity
                    });
                    try {
                        for (var rl_5 = (e_5 = void 0, __asyncValues(rl)), rl_5_1; rl_5_1 = yield rl_5.next(), !rl_5_1.done;) {
                            const line = rl_5_1.value;
                            logs.push(JSON.parse(line));
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (rl_5_1 && !rl_5_1.done && (_a = rl_5.return)) yield _a.call(rl_5);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
                else
                    continue;
            }
        });
    }
    yield processLineByLine(files, route);
    return res.json(logs);
})));
// route to get 2 weeks worth of error logs
router.get('/errors/two_week', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dates = [...Array(14)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date;
    });
    const files = [];
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10)
            month = '0' + `${month}`;
        if (day < 10)
            day = '0' + `${day}`;
        files.push(`errors-${year}-${month}-${day}.log`);
    }
    const route = path.resolve('logs');
    let logs = [];
    function processLineByLine(files, routes) {
        var e_6, _a;
        return __awaiter(this, void 0, void 0, function* () {
            for (let file of files) {
                if (fs.existsSync(`${route}/${file}`)) {
                    const fileStream = fs.createReadStream(`${route}/${file}`);
                    const rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity
                    });
                    try {
                        for (var rl_6 = (e_6 = void 0, __asyncValues(rl)), rl_6_1; rl_6_1 = yield rl_6.next(), !rl_6_1.done;) {
                            const line = rl_6_1.value;
                            logs.push(JSON.parse(line));
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (rl_6_1 && !rl_6_1.done && (_a = rl_6.return)) yield _a.call(rl_6);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                }
                else
                    continue;
            }
        });
    }
    yield processLineByLine(files, route);
    return res.json(logs);
})));
module.exports = router;
