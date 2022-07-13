module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.addColumn({ tableName: 'medication' }, 'is_completed',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
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
      await queryInterface.removeColumn({ tableName: 'medication' }, 'is_completed', { transaction })
      transaction.commit()
    } catch (e) {
      transaction.rollback()
      throw e
    }
  }
}
