const eventSource = new EventSource(
  'http://localhost:8083/sender/xanqus/receiver/jhs512'
)

eventSource.onmessage = e => {
  console.log('e', e)
  const data = JSON.parse(e.data)
  console.log('data', data)
}

let chatBox = document.querySelector('#chat-box')
let msgInput = document.querySelector('#chat-outgoing-msg')

const getSendMsgBox = msg => {
  return `<div class="sent_msg">
    <p>${msg}</p>
    <span class="time_date"> 11:18 | Today</span>
  </div>`
}

document.querySelector('#chat-send').addEventListener('click', () => {
  let chatOutgoingBox = document.createElement('div')
  chatOutgoingBox.className = 'outgoing_msg'
  chatOutgoingBox.innerHTML = getSendMsgBox(msgInput.value)
  chatBox.append(chatOutgoingBox)
  msgInput.value = ''
})

document.querySelector('#chat-outgoing-msg').addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    let chatOutgoingBox = document.createElement('div')
    chatOutgoingBox.className = 'outgoing_msg'
    chatOutgoingBox.innerHTML = getSendMsgBox(msgInput.value)
    chatBox.append(chatOutgoingBox)
    msgInput.value = ''
  }
})
