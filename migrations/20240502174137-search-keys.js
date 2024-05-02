
const vectorName = '_search';

const searchObjects = {
  authors: ['full_name'],
  books: ['name'],
};

module.exports = {
    up: (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
        const tableNames = Object.keys(searchObjects);

        for (let table of tableNames) {
            await queryInterface.sequelize.query(`
                ALTER TABLE ${table} ADD COLUMN ${vectorName} TSVECTOR;
            `, { transaction });

            await queryInterface.sequelize.query(`
                UPDATE ${table} SET ${vectorName} = to_tsvector('english', ${searchObjects[table].join(" || ' ' || ")});
            `, { transaction });

            await queryInterface.sequelize.query(`
                CREATE INDEX ${table}_search ON ${table} USING gin(${vectorName});
            `, { transaction });

            await queryInterface.sequelize.query(`
                CREATE TRIGGER ${table}_vector_update
                BEFORE INSERT OR UPDATE ON ${table}
                FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(${vectorName}, 'pg_catalog.english', ${searchObjects[table].join(', ')});
            `, { transaction });
        }
    }),

  down: (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
        let tableNames = Object.keys(searchObjects);
        for (let table of tableNames) {
                await queryInterface.sequelize.query(`
                    DROP TRIGGER ${table}_vector_update ON ${table};
                `, { transaction });

                await queryInterface.sequelize.query(`
                    DROP INDEX ${table}_search;
                `, { transaction });

                await queryInterface.sequelize.query(`
                    ALTER TABLE ${table} DROP COLUMN ${vectorName};
                `, { transaction });
            }
    }),
};