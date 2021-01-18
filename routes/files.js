const router = require('express').Router()
const multer = require('multer')
const {v4: uuid4} = require('uuid')
const path = require('path')
const File = require('../models/file')

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}` 
        cb(null, uniqueName);
    }
})

let upload = multer({
    storage,
    limit: {fileSize: 1000000 * 100},

}).single('myFile')

router.post('/', (req, res) => {

    //upload data
    upload(req, res, async (err) => {
        //validate request
        if(!req.file) {
            return res.json({
                error: "All fields are required"
            })
        }
        if(err) {
            return res.status(500).send({
                error: err.message
            })
        }
      
        //store in db
        const file = new File({
          fileName: req.file.filename,
          uuid: uuid4(),
          path: req.file.path,
          size: req.file.size
        });

        const respone = await file.save();
        return res.json({file : `${process.env.APP_BASE_URL}/files/${respone.uuid}`})
    })

    

    //Response Link
})

module.exports = router