import { useEffect, useRef, useState } from "react";

const ServerSentEvents2 = () => {
    const serverURL = "http://localhost:8080";

    const [user, setUser] = useState("");
    const [nameInputValue, setNameInputValue] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState();
    const [users, setUsers] = useState();
    const [roomId, setRoomId] = useState("5");


    useEffect(() => {


        const sseForUsers = new EventSource(`${serverURL}/sse/rooms/${roomId}/users`, {
            withCredentials: true,
        });

        sseForUsers.onopen = (e) => {
            console.log("SSE 3 Connected !");
        };


        sseForUsers.addEventListener("user-list-event", (event) => {
            let jsonData = JSON.parse(event.data);
            setUsers(jsonData);
        });

        sseForUsers.onerror = (error) => {
            console.log("SSE For Users error", error);
            sseForUsers.close();
        };

        return () => {
            sseForUsers.close();
        };
    }, [roomId, user, newMessage]);

    const handleChange = (event) => {
        setNameInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (nameInputValue && nameInputValue.trim() !== "") {
            const requestOptions = {
                method: "POST",
            };

            const response = await fetch(`${serverURL}/sse/rooms/${roomId}/users/${nameInputValue}`, requestOptions);

            if (response.status === 200) {
                setUser(nameInputValue.trim());
                setNewMessage("");
            }
        }
    };

    return (
        <div className="App" style={{ marginTop: "100px" }}>
            {user ? (
                <div className="entered-name-div">
                    Your name: <b>{user}</b>
                </div>
            ) : (
                <div className="name-form-div">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="segment">
                            <h1>Let's get started !</h1>
                        </div>
                        <label>
                            <input type="text" placeholder="Name" value={nameInputValue} onChange={handleChange} />
                        </label>
                        <button className="submit-name" type="submit">
                            OK
                        </button>
                    </form>
                </div>
            )}

            {users && users.map((user) => (<div>{user}</div>))}
        </div>
    );
};

export default ServerSentEvents2;
