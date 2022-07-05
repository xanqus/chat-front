const eventSource = new EventSource(
  'http://localhost:8083/sender/xanqus/receiver/jhs512'
)

eventSource.onmessage = e => {
  console.log('e', e)
  const data = JSON.parse(e.data)
  console.log('data', data)
  initMessage(data)
}

let chatBox = document.querySelector('#chat-box')
let msgInput = document.querySelector('#chat-outgoing-msg')

const getSendMsgBox = (msg, time) => {
  return `<div class="sent_msg">
    <p>${msg}</p>
    <span class="time_date"> ${time} </span>
  </div>`
}

const initMessage = data => {
  const { msg, createdAt } = data
  let chatOutgoingBox = document.createElement('div')
  chatOutgoingBox.className = 'outgoing_msg'
  chatOutgoingBox.innerHTML = getSendMsgBox(msg, createdAt)
  chatBox.append(chatOutgoingBox)
  msgInput.value = ''
}

const addMessage = () => {
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

  chatOutgoingBox.innerHTML = getSendMsgBox(msgInput.value, now)
  chatBox.append(chatOutgoingBox)
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
