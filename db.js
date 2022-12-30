const { MongoClient } = require('mongodb')

let dbConnection
let uri = 'mongodb+srv://admin:Kc8pfbUuRaNFkaG5@cluster0.xfpiwlk.mongodb.net/?retryWrites=true&w=majority'
module.exports ={
    connectToDb: (callBack) => {
        MongoClient.connect(uri)
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