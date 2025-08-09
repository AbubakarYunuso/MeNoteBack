const uuid = require("uuid")
const fs = require("fs")

class fileService {
  addImage(imageFile) {
    const imageNameFile = imageFile.name + uuid.v4() + ".jpg"

    imageFile.mv("static/" + imageNameFile)
    return imageNameFile
  }

  deleteImage(imageName) {

    fs.unlinkSync(`static/${imageName}`)

    return process.env.NO_AVATAR
  }

}

module.exports = new fileService()