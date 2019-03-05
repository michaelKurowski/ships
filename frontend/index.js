const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const playerID = 'player'
const fps = 1000 / 30


let objects = {}

class Vector2d {
	constructor(x,y){
		this.x = x,
		this.y = y
	}
}

class GameObject {
	constructor(size, position , texture) {
		this.size = size,
		this.position = position
		this.texture = texture
	}
}

const gamePlayer = new GameObject(new Vector2d(20,20), new Vector2d(50,50), '')

function init(){
	objects[playerID] = gamePlayer
	window.addEventListener('keypress', controller, false)
}

function render() {
	Object.values(objects).forEach( gameObject => {
		context.strokeRect(
			gameObject.position.x,
			gameObject.position.y,
			gameObject.size.x,
			gameObject.size.y
		)
		context.stroke()
	})

}

function controller(event){
	console.log(event.keyCode)
}

function updatePosition(objectId, position) {
	objects[objectId].position = position
}

function updateContext(){
	context.clearRect(0, 0, canvas.width, canvas.height)
	render()
}

init()
setInterval(updateContext,fps)