module.exports = {
  edit: ({ name, destinationCount, id }) => {
    let error = false

    if (!id) {
      error = {
        id: true,
        error: 'Please, try again'
      }
    }

    if (destinationCount < 1) {
      error = {
        destinationCount: true,
        error: 'Can\'t be less than 0'
      }
    }

    if (!name) {
      error = {
        name: true,
        error: 'Input name'
      }
    }

    return error
  }
}