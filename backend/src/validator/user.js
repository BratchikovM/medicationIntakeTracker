const { checkEmailAddress } = require('../utils/helperFunction')

module.exports = {
  register: ({ email, password }) => {
    let error = false

    if (password && password.length < 6) {
      error = {
        password: true,
        error: 'Min length 6 symbols'
      }
    }

    if (!checkEmailAddress(email)) {
      error = {
        email: true,
        error: 'Invalid email address'
      }
    }

    return error
  }
}