module.exports = (sequelize, DataTypes) => {
  const Medication = sequelize.define(
    'Medication',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      count: {
        type: DataTypes.INTEGER,
      },
      destinationCount: {
        type: DataTypes.INTEGER,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      tableName: 'medication'
    }
  )

  Medication.associate = (models) => {
    Medication.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id'
    })
  }

  return Medication
}
