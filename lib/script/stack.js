'use strict'

var Stack = function Stack (rawstack, varsStack) {
  this.stack = rawstack
  this.varsStack = varsStack || []
}

module.exports = Stack

Stack.prototype.pushVar = function (varName) {
  this.varsStack.push(varName || '$tmp')
}

Stack.prototype.popVar = function () {
  this.varsStack.pop()
}

Stack.prototype.push = function (n, varName) {
  this.pushVar(varName)
  this.stack.push(n)
  this.checkConsistency()
}

Stack.prototype.pop = function () {
  this.popVar()
  let top = this.stack.pop()
  this.checkConsistency()
  return top
}

Stack.prototype.updateVarsStack = function (vars) {
  this.checkConsistencyWithVars(vars)
  this.varsStack.splice(0, vars.length, ...vars.reverse())
}

Stack.prototype.stacktop = function (i) {
  return this.stack[this.stack.length + i]
}

Stack.prototype.vartop = function (i) {
  return this.varsStack[this.varsStack.length + i]
}

Stack.prototype.slice = function (start, end) {
  return this.stack.slice(start, end)
}

Stack.prototype.splice = function (start, deleteCount, ...items) {
  this.varsStack.splice(start, deleteCount, ...items)
  return this.stack.splice(start, deleteCount, ...items)
}

Stack.prototype.write = function (i, value) {
  this.stack[this.stack.length + i] = value
}

Stack.prototype.copy = function () {
  return new Stack(this.stack.slice() || [], this.varsStack.slice() || [])
}

Stack.prototype.printVarsStack = function () {
  console.log(this.varsStack.join(','))
}

Stack.prototype.checkConsistency = function () {
  if (this.stack.length !== this.varsStack.length) {
    this.printVarsStack()
    throw new Error(`checkConsistency fail, stack: ${this.stack.length}, varsStack:${this.varsStack.length}`)
  }
}

Stack.prototype.checkConsistencyWithVars = function (varsStack) {
  if (this.stack.length < varsStack.length) {
    this.printVarsStack()
    throw new Error(`checkConsistencyWithVars fail, stack: ${this.stack.length}, varsStack:${varsStack.length}`)
  }
}

Object.defineProperty(Stack.prototype, 'length', {
  get: function () {
    return this.stack.length
  }
})

Object.defineProperty(Stack.prototype, 'rawstack', {
  get: function () {
    return this.stack
  }
})
