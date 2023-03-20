const validaDate = (date)=> {
    let dateFormat = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/

    if (date.match(dateFormat)) {
        let dateUnit = date.split('-')
        let year = parseInt(dateUnit[0])
        let month = parseInt(dateUnit[1])
        let day = parseInt(dateUnit[2])
        return true
    } else {
        return false
    }
}

const validaMensagem = (message)=> {
    if (message.length != 0) {
        return true
    } else {
        return false
    }
}

const validaObjMessage = (date, message)=> {
    if (validaDate(date) == false) {
        return {
            result: false,
            message: `message's date does not follow a valid format`
        }
    } else if (validaMensagem(message) == false) {
        return {
            result: false,
            message: `message's content is empty`
        }
    } else {
        return {
            result: true,
            message: `message's data is valid`
        }
    }
}

export const criaObjetoMessage = async (body)=> {
    const id = body.id
    const date = body.date
    const message = body.message
    const validation = validaObjMessage(date, message)
    if (validation.result == true) {
        return [{
                   "id": id,
                   "date": date,
                   "message": message
               },
               {
                    "feedback": validation.message,
                    "erro": false
               }]
    } else {
        return [{
            "id": id,
            "date": date,
            "message": message
        },
        {
             "feedback": validation.message,
             "erro": true
        }]
    }
}