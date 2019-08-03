'use strict';
export default (sequelize, DataTypes) => {
  const Shortener = sequelize.define(
    'Shortener',
    {
      from: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      to: {
        type: DataTypes.STRING,
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