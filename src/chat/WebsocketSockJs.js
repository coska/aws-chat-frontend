import { useEffect, useRef, useState } from "react";

import SockJsClient from "react-stomp";

const WebsocketSockJs = ({room, setMessages, setClientRef}) => {

    const [clientRef_, setClientRef_] = useState();
    const [messages_, setMessages_] = useState([]);

    useEffect(() => {
        if (clientRef_) {
            setClientRef(clientRef_);
        }
    }, [clientRef_])

    return (
        <SockJsClient
                    url="http://localhost:8080/aws-chat/"
                    topics={[`/subscribe/room/${room.id}`]}
                    onConnect={() => {
                        console.log("connected");
                    }}
                    onDisconnect={() => {
                        console.log("Disconnected");
                    }}
                    onMessage={(msg) => {
                        console.log("message received");
                        setMessages([...messages_, msg]);
                        setMessages_([...messages_, msg]);
                    }}
                    ref={(client) => {
                        setClientRef_(client);
                    }}
                />
    )
}

export default WebsocketSockJs;