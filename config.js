module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: 'mongodb://localhost/blog',
    database: {
        login: 'admin',
        password: encodeURIComponent('Master#100')
    }
}
