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
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const url = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json';
// const url = 'https://randoms-api.herokuapp.com/api/parks'
const getGames = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(url);
        console.log(response);
        return response;
    }
    catch (e) {
        console.error(e);
    }
});
let games = () => __awaiter(void 0, void 0, void 0, function* () {
    let games = yield getGames();
    if (games.data) {
        games = JSON.stringify(games.data.applist.apps);
        fs.writeFileSync(path.resolve(__dirname, 'games.json'), games, 'utf8');
    }
    else
        console.log("NO GAMES");
});
games();
// games = JSON.stringify(games);
// fs.writeFileSync(path.resolve(__dirname, 'games.json', 'utf8'));
