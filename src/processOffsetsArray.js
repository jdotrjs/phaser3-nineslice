const processsOffsetArray = (arr) => {
  switch (arr.length) {
  case 1:
    // topRightBottomLeft
    return [arr[0], arr[0], arr[0], arr[0]]
  case 2:
    // topBottom rightLeft
    return [arr[0], arr[1], arr[0], arr[1]]
  case 3:
    // top rightLeft bottom
    return [arr[0], arr[1], arr[2], arr[1]]
  case 4:
    // top right bottom left
    return arr
  }
  throw new Error('Received ${arr.length} offset values, expected 1 to 4.')
}

export default processsOffsetArray