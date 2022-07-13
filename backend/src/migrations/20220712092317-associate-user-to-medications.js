module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.addColumn({ tableName: 'medication' }, 'user_id',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: { tableName: 'user' },
            key: 'id',
          }
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
      await queryInterface.removeColumn({ tableName: 'medication' }, 'user_id', { transaction })
      transaction.commit()
    } catch (e) {
      transaction.rollback()
      throw e
    }
  }
}
