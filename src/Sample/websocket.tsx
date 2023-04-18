import { useEffect, useRef, useState } from "react";
import { webSocket } from 'rxjs/webSocket';

const useWebSocket: () => [string[], (msg: string) => void] = () => {
    const subject = useRef<any>();
    const [messages, setMessages] = useState<string []>([]);
    const appendMessage = useRef((msg: string) => { });

    appendMessage.current = (msg) => {
        console.log('===', { msg, messages });
        setMessages(messages.concat([msg]));
    };

    useEffect(() => {
        // subject.current = webSocket('wss://ws.postman-echo.com/raw');
        subject.current = webSocket('ws://localhost:8080/aws-chat-websocket');

        subject.current.subscribe({
            next: (msg: { message: string }) => {
                console.log('new msg', { msg, messages });
                appendMessage.current?.(msg.message);
            },
            error: (err: { message: string }) => {
                console.log(err);
                appendMessage.current?.(err.message);
            },
            complete: () => {
                console.log('complete');
                appendMessage.current?.('complete');
            }
        });

        return () => {
            console.log('unsubscribed');
            subject.current?.unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendMessage = (msg: string) => {
        subject.current?.next({ message: msg });
    };

    return [ messages, sendMessage ];
};

const SocketComponent = () => {
    
    const [text, setText] = useState('');
    const [ messages, sendMessage ] = useWebSocket();

    return (
        <div>
            <input value={text} onChange={(evt) => setText(evt.target.value)} />
            <button onClick={() => {
                sendMessage(text);
                setText('');
            }}>Send</button>
            <ul>
                {
                    messages.map((msg: string, idx: number) => <li key={idx}>{msg}</li>)
                }
            </ul>
        </div>
    )
};

export default SocketComponent;