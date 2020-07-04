import path from 'path'

module.exports = {
    client: 'pg',
    connection:{
        host : '127.0.0.1',
        user : 'semicheche',
        password : 'semicheche',
        database : 'app_collect',
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }
}