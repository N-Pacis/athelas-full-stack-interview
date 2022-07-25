import multer, { diskStorage } from "multer"

export function uploadFile(destination) {
    const storage = diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination)
        },
        filename: (req, file, cb) => {
            let rand = Math.random() * 392989
            cb(null, rand + file.originalname)
        }
    })

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === "image/jpg") {
            cb(null, true)
        }
        else {
            cb("File not supported", false)
        }
    }

    const upload = multer({
        storage: storage, 
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter,
    })

    return upload
}