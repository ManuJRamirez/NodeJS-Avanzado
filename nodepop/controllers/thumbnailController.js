const jimp = require('jimp');

async function thumbnailController(foto) {
  const image = await jimp.read(foto);

  await image.resize(100, 100);

  await image.writeAsync(foto);

  return image;
}

module.exports = thumbnailController;
