const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback (null, 'src/uploads')
    },
    filename: (req,file, cb) =>{
        cb (null, `${file.fieldname} - ${Date.now()}.png`)
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 2000000},
    fileFilter(req, file, callback){
        if (file.originalname.match(/\.(jpg|jpeg|png)\b/)) {
            callback(null, true)
        } else  {
            callback('Error type, file must jpg, jpeg, or png', null )
        }
    }
})

module.exports = upload