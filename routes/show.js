const router = require('express').Router()
const File = require('./../models/file')

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({uuid: req.params.uuid})
        if(!file) {
           res.render('download', {error : 'something went wrong'})
        }

        return res.render('download' ,{
            uuid: file.uuid,
            fileName: file.fileName,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    }catch(e) {
       res.render('download', {error : 'something went wrong'})
    }
})

module.exports = router