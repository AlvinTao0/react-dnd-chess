let knightPosition = [0, 0]
let observer = null // render

function emitChange() {
  observer(knightPosition)
}

// 收集依赖
export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o
  emitChange()
}

// watcher
export function moveKnight(toX, toY) {
  knightPosition = [toX, toY]
  emitChange()
}

export function canMoveKnight(toX, toY) {
  const [x, y] = knightPosition
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}