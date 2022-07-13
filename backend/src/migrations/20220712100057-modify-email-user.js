'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.addConstraint({ tableName: 'user' }, ['email'],
        {
          type: 'unique',
          name: 'user_email_key'
        },
        { transaction })

      transaction.commit()
    }
    catch (e) {
      transaction.rollback()
      throw e
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.removeConstraint({ tableName: 'user' }, 'user_email_key',
        { transaction })
      transaction.commit()
    } catch (e) {
      transaction.rollback()
      throw e
    }
  }
}
