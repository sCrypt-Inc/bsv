const fs = require('fs')
const path = require('path')

const copyLib = (src, dest) => {
    const libFiles = fs.readdirSync(src)
    libFiles.forEach(file => {
        const filePath = path.join(src, file)
        if (fs.statSync(filePath).isDirectory()) {
            fs.mkdirSync(path.join(dest, file), { recursive: true })
            copyLib(filePath, path.join(dest, file))
        } else {
            fs.copyFileSync(filePath, path.join(dest, file))
        }
    })
}

const main = () => {
    // copy all files under lib to dist/lib recursively, if the file is a directory, create the directory in dist/lib and copy the files recursively
    const libDir = path.join(__dirname, 'dist', 'lib')
    fs.mkdirSync(libDir, { recursive: true })
    copyLib(path.join(__dirname, 'lib'), libDir)
}


main()