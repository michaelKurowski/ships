
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const {World} = require('./classes')
const settings = require('./settings.json')
const {createSpawnResponseDTO, createMoveResponseDTO, EVENTS} = require('./socketEvents')

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
			const reponseToOwner = {
				objectId: ship.id,
				position: ship.position,
				isBeingOwned: true
			}
			const reponseToOthers = {
				objectId: ship.id,
				position: ship.position
			}
			socket.emit(
				EVENTS.SPAWN,
				createSpawnResponseDTO(reponseToOwner)
			)
			socket.broadcast.emit(
				EVENTS.SPAWN,
				createSpawnResponseDTO(reponseToOthers)
			)
			socket.on(EVENTS.MOVE, event => {
				const ship = map.entities.get(event.objectId)

				ship.move(event.position)
				const response = {objectId: ship.id, position: ship.position}
			
				
				socket.broadcast.emit(EVENTS.MOVE, createMoveResponseDTO(response))
				socket.emit(EVENTS.MOVE, createMoveResponseDTO(response))
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



