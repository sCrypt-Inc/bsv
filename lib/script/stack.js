var Stack = function Stack (mainStack, varsStack) {
  this.stack = mainStack
  this.varsStack = varsStack || []
}

module.exports = Stack

Stack.prototype.pushVars = function (...vars) {
  this.varsStack.push(...vars)
}

Stack.prototype.popVar = function () {
  this.varsStack.pop()
}

Stack.prototype.push = function (n, ...vars) {
  this.pushVars(...vars)
  this.stack.push(n)
}

Stack.prototype.pop = function () {
  this.popVar()
  return this.stack.pop()
}

Stack.prototype.stacktop = function (i) {
  return this.stack[this.stack.length + i]
}

Stack.prototype.slice = function (start, end) {
  return this.stack.slice(start, end)
}

Stack.prototype.splice = function (start, deleteCount, ...items) {
  return this.stack.splice(start, deleteCount, ...items)
}

Stack.prototype.write = function (i, value) {
  this.stack[this.stack.length + i] = value
}

Stack.prototype.copy = function () {
  return new Stack(this.stack.slice() || [], this.varsStack.slice() || [])
}

Object.defineProperty(Stack.prototype, 'length', {
  get: function () {
    return this.stack.length
  }
})
