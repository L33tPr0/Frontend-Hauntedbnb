"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class SpotImage extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         SpotImage.belongsTo(models.Spot, {
            foreignKey: "spotId",
         });
      }
   }
   SpotImage.init(
      {
         spotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "Spots",
            },
            onDelete: "CASCADE",
         },
         url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               isUrl: true,
            },
         },
         preview: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
         },
      },
      {
         sequelize,
         modelName: "SpotImage",
         defaultScope: {
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
         },
      }
   );
   return SpotImage;
};
