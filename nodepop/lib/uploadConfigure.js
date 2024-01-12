const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const ruta = path.join(__dirname, '..', 'public', 'images');
    callback(null, ruta);
  },
  filename: function (req, file, callback) {
    const filename = `${Date.now()}-${file.fieldname}-${file.originalname}`;
    callback(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
