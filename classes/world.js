const Ship = require('./ship')

module.exports = class World {
	constructor(dimensions) {
		this.dimensions = dimensions
		this.entities = new Map()
	}

	createShip(position) {
		const ship = new Ship(position)
		return ship.setId()
			.then(() => {
				this.entities.set(ship.id, ship)
				return ship
			})
	}
}