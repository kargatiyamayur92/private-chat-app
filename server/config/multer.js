import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './public/images')
    },

    filename: function (req, file, cb) {
        const uniquename = Date.now() + "-" + file.originalname
        cb(null, uniquename)
    }

})

const upload = multer(
    {
        storage: storage
    }
)

export default upload