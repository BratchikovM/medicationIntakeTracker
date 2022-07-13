const jwt = require('jsonwebtoken')
const models = require('../models')
const CONSTS = require('../const')
const { edit } = require('../validator/medication')

module.exports = {
  list: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, CONSTS.JWT_SECRET_KEY)
    const userId = decodedToken.id
    const { limit, page } = req.query

    try {
      const medication =  await models.Medication.findAndCountAll({
        where: {
          user_id: userId
        },
        limit,
        offset: page * limit,
        order: [[models.sequelize.literal('is_completed, created_at'), 'desc']]
      })

      res.json({
        list: medication
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        error: err,
        list: []
      })
    }
  },
  save: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, CONSTS.JWT_SECRET_KEY)
    const userId = decodedToken.id
    const { name, description, destinationCount } = req.body

    try {
      const medication = await models.Medication.create({
        name,
        description,
        destinationCount,
        count: 0,
        user_id: userId
      })

      res.json({
        medication
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        error: err,
      })
    }
  },
  delete: async (req, res) => {
    const { id } = req.params

    try {
      await models.Medication.destroy({ where: { id: id } })

      res.json({
        success: true,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        success: false,
        error: err,
      })
    }
  },
  increment: async (req, res) => {
    const { id } = req.params
    let drug = {}

    try {
      drug = await models.Medication.findByPk(id)
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err,
      })
    }

    try {
      await drug.increment('count', { by: 1 })

      if (drug.count === drug.destinationCount) {
        drug.is_completed = true
        await drug.save()
      }

      res.json({
        success: true,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        success: false,
        error: err,
      })
    }
  },
  decrement: async (req, res) => {
    const { id } = req.params
    let drug = {}

    try {
      drug = await models.Medication.findByPk(id)
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err,
      })
    }

    try {
      await drug.decrement('count', { by: 1 })

      if (drug.count === drug.destinationCount) {
        drug.is_completed = true
        await drug.save()
      }

      res.json({
        success: true,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        success: false,
        error: err,
      })
    }
  },
  edit: async (req, res) => {
    const { name, description, destinationCount, id } = req.body
    const checkValid = edit({ name, destinationCount, id })

    if (Object.keys(checkValid).length > 0) {
      res.status(400).json(checkValid)

      return
    }

    try {
      const medication = await models.Medication.update({
        name,
        description,
        destinationCount,
      },
      {
        where: {
          id,
        }
      })

      res.json({
        success: true,
        medication
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        success: false,
        error: err,
      })
    }
  },
}
