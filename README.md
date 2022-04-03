# @jrh/rely

Simple dependency injection for Node.js functions.

## Installation

`npm install @jrh/rely`

## Usage

```
const rely = require('@jrh/rely')

const reliant = rely.on(dependencies).to(original)

reliant.provide(provided).run()
```

## Specifying Dependencies

### `.on(dependencies)`

#### Arguments

| Name | Type | Description |
| :-- | :-- | :-- |
| dependencies | ...String | Any number of dependency names. |

### `.to(original)`

#### Arguments

| Name | Type | Description |
| :-- | :-- | :-- |
| original | Function | The function to provide dependencies to. |

### Example

```javascript
function combine(base, { a, b, c }) {
  return base + a + b + c
}

const reliant = rely.on('a', 'b', 'c').to(combine)
```

## Providing Dependencies

### `.provide(dependencies)`

#### Arguments

| Name | Type | Description |
| :-- | :-- | :-- |
| dependencies | Object | An object with keys of dependency names and values of dependencies. |

### Exceptions

Throws a standard `Error` if not all specified dependencies were provided, or any dependency is `undefined`.

### `.run(arguments)`

#### Arguments

| Name | Type | Description |
| :-- | :-- | :-- |
| arguments | ...Any | Arguments for the original function. |

### Example

```javascript
function combine(base, { a, b, c }) {
  return base + a + b + c
}

const reliant = rely.on('a', 'b', 'c').to(combine)

reliant
  .provide({ a: 1, b: 2, c: 3 })
  .run(10)
  // => 15
```

---

## Usage Example

**jump.js**
```javascript
const rely = require('@jrh/rely')

function jump(power, { jumpStrategy }) {
  return jumpStrategy(power)
}

module.exports = rely.on('jumpStrategy').to(jump)
```

**jump.strategies.js**
```javascript
function ground(power) {
  return power * 1
}

function trampoline(power) {
  return power * 10
}

module.exports = { ground, trampoline }
```

**index.js**
```
const jump = require('./jump')
const { ground, trampoline } = require('./jump.strategies')

jump.provide({ jumpStrategy: ground }).run(5) // => 5
jump.provide({ jumpStrategy: trampoline }).run(5) // => 50
```
