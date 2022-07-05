const eventSource = new EventSource(
  'http://localhost:8083/sender/xanqus/receiver/jhs512'
)

eventSource.onmessage = e => {
  console.log('e', e)
  const data = JSON.parse(e.data)
  console.log('data', data)
  initMessage(data)
}

const getSendMsgBox = (msg, time) => {
  return `<div class="sent_msg">
    <p>${msg}</p>
    <span class="time_date"> ${time} </span>
  </div>`
}

const initMessage = data => {
  let chatBox = document.querySelector('#chat-box')
  let msgInput = document.querySelector('#chat-outgoing-msg')
  const { msg, createdAt } = data
  let chatOutgoingBox = document.createElement('div')
  chatOutgoingBox.className = 'outgoing_msg'
  chatOutgoingBox.innerHTML = getSendMsgBox(msg, createdAt)
  chatBox.append(chatOutgoingBox)
  msgInput.value = ''
}

const addMessage = async () => {
  let chatBox = document.querySelector('#chat-box')
  let msgInput = document.querySelector('#chat-outgoing-msg')
  let chatOutgoingBox = document.createElement('div')
  chatOutgoingBox.className = 'outgoing_msg'

  let date = new Date()
  let now =
    date.getHours() +
    ':' +
    date.getMinutes() +
    ' | ' +
    (date.getMonth() + 1) +
    '/' +
    date.getDate()

  let chat = {
    sender: 'xanqus',
    receiver: 'jhs512',
    msg: msgInput.value,
  }
  let response = await fetch('http://localhost:8083/chat', {
    method: 'post',
    body: JSON.stringify(chat),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
  console.log(response)

  let parseResponse = await response.json()
  console.log(parseResponse)

  msgInput.value = ''
}

document.querySelector('#chat-send').addEventListener('click', () => {
  addMessage()
})

document.querySelector('#chat-outgoing-msg').addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    addMessage()
  }
})
