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
	constructor(size, position, speed,texture) {
		this.size = size,
		this.position = position
		this.texture = texture
		this.speed = speed
	}

	moveXAxis(direction) {
		this.position.x += (this.speed * direction)
	}

	moveYAxis(direction) {
		this.position.y += (this.speed * direction)
	}
}

const gamePlayer = new GameObject(new Vector2d(20,20), new Vector2d(50,50), 10, '')

function init(){
	objects[playerID] = gamePlayer
	window.addEventListener('keypress', controller)
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
	const keyNumber = event.charCode
	const playerObject = objects[playerID]
	switch(keyNumber){
	case 119: {		//w
		playerObject.moveYAxis(-1) 
		break
	}	
		
	case 115:{ 		//s
		playerObject.moveYAxis(1)
		break
	}	

	case 97: {		//a
		playerObject.moveXAxis(-1)
		break	
	}
		
	case 100: {		//d
		playerObject.moveXAxis(1)
		break
	}		
	}
}


function updateContext(){
	context.clearRect(0, 0, canvas.width, canvas.height)
	render()
}

init()
setInterval(updateContext,fps)