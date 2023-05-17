const wsUrl = 'wss://echo-ws-service.herokuapp.com';

const input = document.querySelector('.input');
const chat = document.querySelector('.messagefield');
const btnSend = document.querySelector('.btn-send__task-three');
const btnGeo = document.querySelector('.btn-geo__task-three');

let webSocket = new WebSocket(wsUrl);

webSocket.onopen = () => {
    console.log('Соединение установлено!');
};

webSocket.onclose = () => {
    console.log('Соединение разорвано!');
};

webSocket.onmessage = ({ data }) => {
    innerChat(data, true);
    chat.scrollTop = chat.scrollHeight;
};

webSocket.onerror = () => {
    console.log('Ошибка соединения с сервером...');
};

btnSend.addEventListener('click', () => {
    const message = input.value.trim();
    if (!message || webSocket.readyState !== WebSocket.OPEN) return;
    sendMessage(message);
    input.value = '';
});

input.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const message = input.value.trim();
      if (!message || webSocket.readyState !== WebSocket.OPEN) return;
      sendMessage(message);
      input.value = '';
    }
});

function sendMessage(message) {
    webSocket.send(message);
    innerChat(message, false);
};

function innerChat(message, isReceived) {
    const messageElement = document.createElement('p');
    messageElement.classList.add(isReceived ? 'received' : 'send');
    messageElement.innerHTML = message;
    chat.appendChild(messageElement);
};

btnGeo.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const link = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
                const message = `<a class="geo__info" href="${link}" target="_blank">Геолокация</a>`;
                innerChat(message, false);
                chat.scrollTop = chat.scrollHeight;
            },
            ({ message }) => {
                console.error(`Ошибка геолокации: ${message}`);
                const errorMessage = 'Не удалось определить местоположение';
                innerChat(errorMessage, false);
                chat.scrollTop = chat.scrollHeight;
            }
        )
    }
})