const functions = require('./index.js')

test('adds properly', () => {
    expect(functions.sum(1, 5)).toBe(6)
})

test('subtracts properly', () => {
    expect(functions.subtract(1, 2)).toBe(-1)
})