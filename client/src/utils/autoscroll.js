

function chattomtobottomscroll() {
    const chatcontainer = document.querySelector('.chat-container')
    if (!chatcontainer) return

    const isbottom = chatcontainer.scrollHeight - chatcontainer.scrollTop <= chatcontainer.clientHeight + 70

    if (!isbottom) {
        chatcontainer.scrollTop = chatcontainer.scrollHeight
    }

}

export default chattomtobottomscroll