const EVENTS = {
    MOVE: 'move',
    SPAWN: 'spawn'
}

function createSpawnResponseDTO({objectId, position, isBeingOwned = false} = {}) {
    return {objectId, position, isBeingOwned}
}

function createMoveResponseDTO({objectId, position} = {}) {
    return {objectId, position}
}

module.exports = {
    createSpawnResponseDTO, createMoveResponseDTO, EVENTS
}