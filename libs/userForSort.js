function userForSort(option) {
  const sortObject = {}

  if (Object.keys(option).length !== 0) {
    const sort = option.sort || 'asc'
    const sortName = option.sortName || 'name'
    sortObject[sortName] = sort
  } else {
    const sort = 'asc'
    const sortName = 'name'
    sortObject['sortName'] = sortName
    sortObject['sort'] = sort
  }
  return sortObject
}

module.exports = userForSort