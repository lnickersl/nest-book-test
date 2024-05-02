'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async (transaction) => {
            // 1) rename column
            await queryInterface.renameColumn('authors', 'fullName', 'full_name', { transaction });

            // 2 add constraint unique
            await queryInterface.addConstraint('authors', {
                fields: ['full_name'],
                type: 'unique',
                name: 'authors_full_name_key',
                transaction,
            });
        });
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeConstraint("authors", {
                fields: ['full_name'],
                type: "unique",
                name: "authors_full_name_key",
                transaction,
            });

            await queryInterface.renameColumn("authors", "full_name", "fullName", {
              transaction,
            });
          });
    }
};
