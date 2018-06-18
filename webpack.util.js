const path = require('path');
const fs = require('fs');

function getDirPath() {
  let args = []
  if (arguments.length !== 0) {
    args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
  }
  args.unshift(__dirname)

  return path.resolve.apply(null, args)
}

function getFilesIn(dir, excludes = []) {
  return [].concat.apply([], fs.readdirSync(dir).map((f) => {
    let shouldExclude = false

    p = path.resolve(dir, f)
    if (fs.statSync(p).isDirectory()) {
      return [].concat.apply([], getFilesIn(p, excludes))
    } else {
      excludes.forEach(ex => {
        shouldExclude = shouldExclude || ex.test(p)
      })

      if (shouldExclude) {
        return []
      }
      return p
    }
  }))
}

module.exports = {
  getDirPath: getDirPath,
  getFilesIn: getFilesIn,
}
