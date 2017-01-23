'use strict';

function Robot() {
  this.bearing = undefined
  // implement your solution here!
}

Robot.prototype.orient = function(direction) {
  var validDirections = ['north', 'east', 'south', 'west']
  if (validDirections.includes(direction)) {
    this.bearing = direction
  } else {
    throw new Error("Invalid Robot Bearing")
  }
}

Robot.prototype.turnRight = function() {
  var directions = ['north', 'east', 'south', 'west']
  let currentBearing = this.bearing
  let index = directions.findIndex((element) => element ===currentBearing)
  if (index <= 2) {
    index ++
  } else {
    index = 0
  }

  this.bearing = directions[index]

}

Robot.prototype.turnLeft = function() {
  var directions = ['north', 'east', 'south', 'west']
  let currentBearing = this.bearing
  let index = directions.findIndex((element) => element ===currentBearing)
  if (index >= 1) {
    index --
  } else {
    index = 3
  }
  this.bearing = directions[index]
}

Robot.prototype.at = function(x, y) {
  this.coordinates = [ x, y]
}

Robot.prototype.advance = function() {
  let bearing = this.bearing
  let currentEWPosition = this.coordinates[0]
  let currentNSPosition = this.coordinates[1]

  switch (bearing) {
    case 'north':
      currentNSPosition ++
      break;
    case 'south':
      currentNSPosition --
      break;
    case 'east':
      currentEWPosition ++
      break;
    case 'west':
      currentEWPosition --
      break;
    }
    this.at(currentEWPosition, currentNSPosition)
}

Robot.prototype.instructions = function(letters) {
  var letterArray = letters.split("")
  var instructions = []
  letterArray.forEach( (letter) => {
    switch (letter) {
      case 'R':
        instructions.push('turnRight')
        this.turnRight()
        break;
      case 'L':
        instructions.push('turnLeft')
        this.turnLeft()
        break;
      case 'A':
        instructions.push('advance')
        this.advance()
        break;
    }
  })
  return instructions
}

Robot.prototype.evaluate = function(letters) {
  this.instructions(letters)
}


Robot.prototype.place = function(object) {
  this.coordinates = [object.x, object.y]
  this.bearing = object.direction
}