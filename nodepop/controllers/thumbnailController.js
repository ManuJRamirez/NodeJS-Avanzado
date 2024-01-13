const jimp = require('jimp');
const path = require('node:path');

async function thumbnailController(foto) {
  const image = await jimp.read(foto);

  await image.resize(100, 100);

  const thumbnailsFolderPath = path.join(__dirname, '../public/thumbnails');

  await image.writeAsync(path.join(thumbnailsFolderPath, path.basename(foto)));

  return image;
}

module.exports = thumbnailController;
