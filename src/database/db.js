import Datastore from "nedb";

var db = new Datastore({ filename: 'chats' })

db.loadDatabase()

export function resetDb() {
    return db.remove({ }, { multi: true }, function (err, numRemoved) {
        db.loadDatabase(function (err) {
          // done
        });
      });
}

export function pushChat(chat_id, callback) {
    chatAlreadyExists(chat_id, (docs) => {
        if (docs.length === 0) {
            db.insert({
                chat_id,
                quiz_started: true
            })
            return callback(false)
        }

        callback(docs[0].quiz_started)
    })
}

function chatAlreadyExists(chat_id, callback) {
    db.find({ chat_id }, (err, docs) => {
        if (err)
            console.log(err)

        callback(docs)
    })
}

export function checkIfQuizStarted(chat_id, callback) {
    db.find({ chat_id }, (err, docs) => {
        if (err)
            console.log(err)

        callback(docs)
    })
}

export function getChat(chat_id, callback) {
    db.find({ chat_id }, (err, docs) => {
        if (err)
            console.log(err)

        callback(docs)
    })
}

export function quizOpened(chat_id) {
    return db.update({ chat_id }, { chat_id: chat_id, quiz_started: true })
}

export function quizClosed(chat_id) {
    return db.update({ chat_id }, { chat_id: chat_id, quiz_started: false })
}