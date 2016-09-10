export function validColors() {
  return ['#000000', '#008000', '#0000FF']
}

export function changeColor(item) {
  const colors = validColors()
  var index = colors.indexOf(item.color)
  item.color = colors[(index + 1) % colors.length]
}
