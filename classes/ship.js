const Entity = require('./entity')

module.exports = class Ship extends Entity {
	constructor(position) {
		super(position)
		this.rotation = 0
	}
}