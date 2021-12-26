const {Sequelize} =  require('sequelize')

// DB_NAME=toDo
// DB_USER=postgres
// DB_PASSWORD=1616300
// DB_HOST=localhost
// DB_PORT=5432
// SECRET_KEY=random

module.exports = new Sequelize(
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASSWORD,
    // {
    //     dialect:'postgres',
    //     host:process.env.DB_HOST,
    //     port:process.env.DB_PORT
    // }
    
    process.env.DATABASE_URL,
    {
        dialect:'postgres',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }
    
)