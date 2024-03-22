const multer = require('multer')
const cloudinary = require('./cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// const storage = multer.memoryStorage()
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Dashboard/image',
        allowedFormats: ['jpeg', 'png', 'jpg'],
        uniqueFilename: true,
    }
})

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)/)) {
            return cb(new Error('please upload an image'))
        }
        cb(undefined, true)
    }
});

// const cloudinaryUpload = async (fileBuffer) => {
//     try {
//         const base64String = fileBuffer.toString('base64');
//         // `data:image/png;base64,${base64String}`
//         const res = await cloudinary.uploader.upload(`data:image/png;base64,${base64String}`, { folder: 'Dashboard/image/laffyu' })
//         // const res = await cloudinary.uploader.upload(fileBuffer, { folder: 'Dashboard/image/laffyu', resource_type: 'image' })
//         return res
//     } catch (error) {
//         throw error
//     }
// }

module.exports = {upload};
