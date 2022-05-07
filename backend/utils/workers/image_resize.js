const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

async function resize(photo) {
  const { filename: image } = photo;

  const newName = bcrypt.hashSync(image.split('.')[0].toString() + '.png');

  await sharp(photo.path)
    .resize(200)
    .png({ quality: 30 })
    .toFile(path.resolve(photo.destination, 'resized', newName));

  fs.unlinkSync(photo.path);
  return newName;
}

process.on('message', async (photo) => {
  process.send(await resize(photo));
})