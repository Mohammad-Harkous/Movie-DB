const { MongoClient } = require('mongodb')


let dbConnection

module.exports ={
    connectToDb: (callBack) => {
        MongoClient.connect(process.env.MONGOLAB_URI)
        .then((client) => {
            dbConnection = client.db()
            return callBack()
        }).catch(err => {
            console.log(err)
            return callBack(err )
        })
    },
    getDb: () => dbConnection
}