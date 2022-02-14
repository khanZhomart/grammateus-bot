import Datastore from "nedb";

var db = new Datastore({ filename: 'chats' })

db.loadDatabase()

export function resetDb() {
    return db.remove({ }, { multi: true }, function (err, numRemoved) {
        db.loadDatabase(function (err) { });
      });
}

export function pushChat(chat_id, callback) {
    chatAlreadyExists(chat_id, (docs) => {
        if (docs.length === 0) {
            db.insert({
                chat_id,
                quiz_started: true,
                data: {
                    current_question: {
                        poll_id: -1,
                        correct_option_id: -1
                    }
                },
                users: []
            })
            return callback(false)
        }

        callback(docs[0].quiz_started)
    })
}

export function setCurrentQuestion(chat_id, poll_id, correct_option_id) {
    console.log('bruh')

    db.update(
        { chat_id },
        {
            data: {
                current_question: {
                    poll_id,
                    correct_option_id
                }
            }
        },
        {},
        (err, docs) => {
            if (err)
                console.log(err)

            console.log(docs)
        }
    )
}

export function removeChat(chat_id) {
    db.remove({ chat_id }, {})
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

export function getAllChats(callback) {
    db.find({}, (err, docs) => {
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