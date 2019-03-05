
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const {World} = require('./classes')
const settings = require('./settings.json')

let map

init()

function createWorld() {
	map = new World(settings.world)
	console.log('World created')
}

function startHttpServer() {
	app.get('/', (req, res) => {
		res.sendFile(`${__dirname}/frontend/index.html`)
	})

	http.listen(3000, () => {
		console.log('listening on *:3000')
	})
}

function startWebSocketServer() {
	io.on('connection', setupEvents)
	io.on('error', error => console.log(error))
}

function setupEvents(socket) {
	console.log('a user connected')
	map.createShip({x: 0, y:0})
		.then(ship => {
			console.log('Ship created', ship)
			socket.emit('spawn', {objectId: ship.id, position: ship.position})
			socket.on('move', event => {
				console.log('event', event.objectId)
				console.log('entries', map.entities.entries())
				map.entities.get(event.objectId).move(event.position)
				map.entities.forEach(ship => {
					socket.emit('move', {objectId: ship.id, position: ship.position})
				})
			})
		})
	socket.on('disconnect', () => {  
		console.log('user disconnected')
	})
}

function init() {
	createWorld()
	startHttpServer()
	startWebSocketServer()
}



