const fs = require('fs');
const path = require('path');
const axios = require('axios');

let games = require("./combined_games.json");
let categories = require("./game_categories.json");
let genres = require("./game_genres.json");

const url = 'http://store.steampowered.com/api/appdetails?appids='

const getGame = async (id) => {
  try {
    const response = await axios.get(url + id)
    return response;

  } catch (e) {
    console.error(e);
  }
}

const getAndSaveGame = async () => {
  let game = games.pop();
  if (!game.appid) return;
  const response = await getGame(game.appid);
  if (response.success === false) return;
  game = response.data[game.appid];
  const gameData = {
    name: game.data.name || null,
    description: game.data.short_description || null,
    image_url: game.data.header_image || null,
    is_free: game.data.is_free || null,
    price: game.data.price_overview?.final_formatted || null,
    rating: game.data.metacritic?.score || null,
    rating_url: game.data.metacritic?.url || null,
    steam_id: game.data.steam_appid || null
  }
  console.log(gameData)

  if (!fs.existsSync(path.resolve(__dirname, 'full_games.json'))) {
    fs.writeFileSync(path.resolve(__dirname, 'full_games.json'), JSON.stringify([gameData]));
  } else {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'full_games.json')));
    data.push(gameData);
    fs.writeFileSync(path.resolve(__dirname, 'full_games.json'), JSON.stringify(data));
  }
  return;
}


let timeout;

// function timer() {
//   if (games.length !== 0) {
//     timeout = setTimeout(function () {
//       getAndSaveGame();
//       timer();
//     }, 1600);
//   } 
// };

// timer()
// let combinedGames = [...fullgames, ...zane];
// combinedGames = combinedGames.map(game => {
//   return {
//     name: game.name,
//     description: game.description,
//     image_url: game.image_url,
//     is_free: game.is_free,
//     steam_id: game.steam_id || game.id
//   }
// })
// combinedGames = JSON.stringify(Array.from(new Set(combinedGames)));

// for (let image of images) {
//   let game = combined.find(game => game.steam_id === game.game_id);
//   if (!game) continue;
//   if (game.image_url) continue;
//   else game.image_url = image.screenshot;
// }

let temp = {};
for (let game of games) {
  temp[game.steam_id] = game;
}
let tempCategories = [];
for (let category of categories) {
  if (temp[category.game_id]) tempCategories.push(category)
  else continue
}
let tempGenres = [];
for (let genre of genres) {
  if (temp[genre.game_id]) tempGenres.push(genres);
  else continue;
}

console.log(tempCategories.length, tempGenres.length, games.length)
tempCategories = JSON.stringify(Array.from(new Set(tempCategories)));
tempGenres = JSON.stringify(Array.from(new Set(tempGenres)));

fs.writeFileSync(path.resolve(__dirname, 'format_game_categories.json'), tempCategories);
fs.writeFileSync(path.resolve(__dirname, 'format_game_genres.json'), tempGenres);