const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const OBJECT_TYPES = ['PLAYER','PROJECTILE']
const playerID = 'player'
const fps = 1000 / 30

let objects = {}

const modulo = (firstNumber, secondNUmber) => (firstNumber % secondNUmber + secondNUmber) % secondNUmber
class Vector2d {
	constructor(x,y){
		this.x = x,
		this.y = y
	}
}

class GameObject {
	constructor(size, position, speed,texture, objectType) {
		this.size = size,
		this.position = position
		this.texture = texture
		this.speed = speed
		this.objectType = objectType
	}

	swapPositionInBorder(borderWidth, borderHeight){
		this.position.x = modulo(this.position.x, borderWidth)
		this.position.y = modulo(this.position.y, borderHeight)
	}

	isInBorder(borderWidth, borderHeight){
		return this.position.x >=0 && this.position.x <= borderWidth && this.position.y >= 0 && this.position.y <= borderHeight
	}
	
	moveXAxis(direction) {
		this.position.x += (this.speed * direction)
	}

	moveYAxis(direction) {
		this.position.y += (this.speed * direction)
	}
}

const gamePlayer = new GameObject(new Vector2d(20,20), new Vector2d(50,50), 10, '', OBJECT_TYPES[0])

function init(){
	objects[playerID] = gamePlayer
	window.addEventListener('keypress', controller)
}

function render() {
	Object.values(objects).forEach( gameObject => {
		
		if(gameObject.objectType === OBJECT_TYPES[0])
			gameObject.checkBorder(canvas.width, canvas.height)

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