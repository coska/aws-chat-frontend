import { useState } from "react";
import SockJsClient from "react-stomp";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./MessageStyle.css";
import NameComponent from "./NameComponent";
import { Grid } from "@material-ui/core";

const SocketComponent2 = () => {

    const [messages, setMessages] = useState([]);
    const [typedMessage, setTypedMessage] = useState("");
    const [name, setName] = useState("");
    const [clientRef, setClientRef] = useState();


    const sendMessage = () => {
        clientRef.sendMessage(
            "/app/user-all",
            JSON.stringify({
                name: name,
                message: typedMessage,
            })
        );
    };

    const displayMessages = () => {
        return (
            <div>
                {messages.map((msg, index) => {
                    return (
                        <div key={index}>
                            {name === msg.name ? (
                                <div>
                                    <div className="title1">{msg.name} ({msg.time}) </div>
                                    <div style={{ paddingLeft: "10px" }}>{msg.message}</div>
                                </div>
                            ) : (
                                <div>
                                    <div className="title2">{msg.name} ({msg.time}) </div>
                                    <div style={{ paddingLeft: "10px" }}>{msg.message}</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            <NameComponent setName={setName} />
            <div className="align-center">
                <h2 style={{ marginBottom: "5px", fontWeight: "bold" }}>COSKA CHAT ROOM (
                    User : <span style={{ color: "red" }}>{name} </span>
                    )
                </h2>
            </div>

            <Grid container spacing={2}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        label="Enter Message to Send"
                        variant="outlined"
                        onChange={(event) => {
                            setTypedMessage(event.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" color="primary" onClick={sendMessage}>
                        Send
                    </Button>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    {displayMessages()}
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
            <SockJsClient
                url="http://localhost:8080/aws-chat-websocket/"
                topics={["/topic/user"]}
                onConnect={() => {
                    console.log("connected");
                }}
                onDisconnect={() => {
                    console.log("Disconnected");
                }}
                onMessage={(msg) => {
                    setMessages([...messages, msg]);
                }}
                ref={(client) => {
                    setClientRef(client);
                }}
            />
        </div>
    );
}

export default SocketComponent2;