import { useEffect, useRef, useState } from "react";
import SockJsClient from "react-stomp";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";

const SockJSWebsocket = () => {
    const [roomId, setRoomId] = useState("5");
    const [messages, setMessages] = useState([]);
    const [typedMessage, setTypedMessage] = useState("");
    const [name, setName] = useState("");
    const [tempName, setTempName] = useState("");
    const [clientRef, setClientRef] = useState();

    const handleUsernameKeyDown = (event) => {
        if (event.key === 'Enter') {
            setName(tempName);
        }
    };


    const handleMessageKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const sendMessage = () => {
        clientRef.sendMessage(
            "/publish/message",
            JSON.stringify({
                roomId,
                name,
                message: typedMessage,
            })
        );
        setTypedMessage("");
    };

    const setUser = async (name) => {
        const requestOptions = {
            method: "POST",
        };
        const response = await fetch(`http://localhost:8080/sse/rooms/${roomId}/users/${name}`, requestOptions);

        if (response.status === 200) {
            setName(name);
        }
    }

    const displayMessages = () => {
        return (
            <div>
                {messages.map((msg, index) => {
                    return (
                        <div key={index}>
                            {name === msg.name ? (
                                <div>
                                    <div className="font-12 fw-bold fst-italic text-primary">
                                        {msg.name} ({msg.time}){" "}
                                    </div>
                                    <div style={{ paddingLeft: "10px" }}>{msg.message}</div>
                                </div>
                            ) : (
                                <div>
                                    <div className="font-12 fw-bold fst-italic text-warning">
                                        {msg.name} ({msg.time}){" "}
                                    </div>
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
        <div className="container">
            <div className="text-center" style={{ marginTop: "90px" }}>
                <h4 style={{ marginTop: "0px", marginBottom: "5px", fontWeight: "bold" }}>
                    CHAT ROOM ( User : <span style={{ color: "red" }}>{name} </span>)
                </h4>
            </div>

            <Row className="justify-content-md-center">
                <Col md={10} sm={12}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">
                            Message
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={(event) => {
                                setTypedMessage(event.target.value);
                            }}
                            value={typedMessage}
                            onKeyDown={handleMessageKeyDown}
                        />
                        <Button variant="primary" size="md" onClick={sendMessage}>
                            Send
                        </Button>
                    </div>
                    {/* <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        label="Enter Message to Send"
                        variant="outlined"
                        onChange={(event) => {
                            setTypedMessage(event.target.value);
                        }}
                    /> */}
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={10} sm={12}>{displayMessages()}</Col>
            </Row>
            <SockJsClient
                url="http://localhost:8080/aws-chat/"
                topics={[`/subscribe/room/${roomId}`]}
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
            <div className="modal show" style={{ display: "block", position: "initial" }}>
                <Modal
                    show={name === ""}
                    centered
                    onHide={() => {
                        setName("Temp User");
                    }}
                >
                    <Modal.Header closeButton>
                        <h5 className="m-0">Set User Name</h5>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Control
                            id="username"
                            type="text"
                            placeholder="Enter your name"
                            onChange={(event) => {
                                setTempName(event.target.value);
                            }}
                            onKeyDown={handleUsernameKeyDown}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setUser("Temp User");
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setUser(tempName);
                            }}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default SockJSWebsocket;
