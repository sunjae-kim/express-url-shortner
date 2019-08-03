'use strict';
export default (sequelize, DataTypes) => {
  const Shortener = sequelize.define(
    'Shortener',
    {
      from: {
        type: DataTypes.STRING,
        allowNull: false
      },
      to: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {}
  );
  return Shortener;
};