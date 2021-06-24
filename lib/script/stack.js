'use strict'

var assert = require('assert')

var Stack = function Stack (mainStack, varsStack) {
  this.stack = mainStack
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
  assert.strictEqual(this.stack.length, this.varsStack.length)
}

Stack.prototype.pop = function () {
  this.popVar()
  let top = this.stack.pop()
  assert.strictEqual(this.stack.length, this.varsStack.length)
  return top
}

Stack.prototype.updateVarsStack = function (vars) {
  this.varsStack.splice(0, vars.length, ...vars.reverse())
}

Stack.prototype.stacktop = function (i) {
  return this.stack[this.stack.length + i]
}

Stack.prototype.varsStacktop = function (i) {
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

Object.defineProperty(Stack.prototype, 'length', {
  get: function () {
    return this.stack.length
  }
})
