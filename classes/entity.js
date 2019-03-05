
const crypto = require('crypto')
const ID_SIZE = 48

module.exports = class Entity {
    constructor(position) {
        this.position = position
        this.id = ''
    }


    setId() {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(ID_SIZE, (err, buffer) => {
                if (err) return reject(err)
                this.id = buffer.toString('hex')
                resolve()
            })
        })
    }
}