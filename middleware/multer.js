import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req , file,cd) {
        return cd(null,"./public")
    },
    filename: function(req , file,cd) {
        return cd(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

export default upload