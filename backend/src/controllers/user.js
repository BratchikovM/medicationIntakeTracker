const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const models = require('../models')
const validator = require('../validator')
const CONSTS = require('../const')


module.exports = {
  signup: async (req, res) => {
    const transaction = await models.sequelize.transaction()
    const { email, password } = req.body
    const validations = validator.user.register({ email, password })

    if (validations) {
      return res.status(400).json(validations)
    }

    try {
      const salt = await bcrypt.genSalt(10)
      const user = await models.User.create({
        email,
        password: await bcrypt.hash(password, salt),
      })

      await transaction.commit()
      const accessToken = jwt.sign({ email, id: user.id }, CONSTS.JWT_SECRET_KEY, { expiresIn: '20m' })

      res.json({ accessToken })
    } catch (e) {
      console.error(e)
      await transaction.rollback()

      return res.status(400).json({
        email: true,
        error: 'Email already taken!'
      })
    }
  },
  signin: async (req, res) => {
    let user

    try {
      user = await models.User.findOne({
        where: {
          email: req.body.email
        }
      })
    } catch (err) {
      res.status(500).send({ error: err.message })
    }

    if (!user) {
      return res.status(404).send({ email: true, error: 'User Not found.' })
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )

    if (!passwordIsValid) {
      return res.status(401).send({
        password: true,
        error: 'Invalid Password!'
      })
    }

    const token = jwt.sign({ email: user.email, id: user.id }, CONSTS.JWT_SECRET_KEY, { expiresIn: '20m' })

    res.status(200).send({
      id: user.id,
      email: user.email,
      accessToken: token
    })
  }
}
