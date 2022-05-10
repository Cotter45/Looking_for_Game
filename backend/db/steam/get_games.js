const fs = require('fs');
const path = require('path');
const axios = require('axios');

const url = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json';
// const url = 'https://randoms-api.herokuapp.com/api/parks'
const getGames = async () => {
  try {
    const response = await axios.get(url);
    console.log(response);
    return response
  } catch (e) {
    console.error(e);
  }
}

let games = async () => {
  let games = await getGames();

  if (games.data) {
    games = JSON.stringify(games.data.applist.apps);
    fs.writeFileSync(path.resolve(__dirname, 'games.json'), games, 'utf8');
  }
  else console.log("NO GAMES");
}

games()

// games = JSON.stringify(games);

// fs.writeFileSync(path.resolve(__dirname, 'games.json', 'utf8'));