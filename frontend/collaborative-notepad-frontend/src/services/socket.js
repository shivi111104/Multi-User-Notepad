let sock;

export const socket = (documentId, onMessage) => {
  sock = new Websock(`ws://localhost:8080/ws/${documentId}`);

  sock.onopen = () => {
    console.log("Connected to Websock");
  };

  sock.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  sock.onerror = (error) => {
    console.error("Websock error:", error);
  };

  sock.onclose = () => {
    console.log("Websock closed");
  };
};

export const sendMessage = (message) => {
  if (sock && sock.readyState === Websock.OPEN) {
    sock.send(JSON.stringify(message));
  }
};

export const disconnectWebsock = () => {
  if (sock) sock.close();
};
