import { useEffect, useRef, useState } from "react";
import * as React from "react";

import SockJsClient from "react-stomp";

import { styled, alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";

import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import SendIcon from "@mui/icons-material/Send";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import WebsocketSockJs from "./WebsocketSockJs";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
        boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));

const Rooms = () => {
    
    const [rooms, setRooms] = React.useState();
    const [currentRoom, setCurrentRoom] = React.useState();
    const [newRoomName, setNewRoomName] = React.useState();
    const [openAlert, setOpenAlert] = React.useState();

    const [anchorEl, setAnchorEl] = React.useState(false);
    const open = Boolean(anchorEl);

    const [messages, setMessages] = useState([]);
    const [typedMessage, setTypedMessage] = useState("");
    const [clientRef, setClientRef] = useState();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };

    const [openNewRoomDialog, setOpenNewRoomDialog] = React.useState(false);

    const createRoom = () => {
        setAnchorEl(false);
        setOpenNewRoomDialog(true);
    };

    const handleNewRoomName = (e) => {
        setNewRoomName(e.target.value);
    };

    const saveNewRoom = async () => {
        setOpenNewRoomDialog(false);

        const requestOptions = {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: newRoomName,
            }),
        };
        const response = await fetch(`/v1/chat/rooms`, requestOptions);

        if (response.status === 200) {
            setNewRoomName("");
        }
    };

    const handleMessageKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const sendMessage = () => {
        clientRef.sendMessage(
            "/publish/message",
            JSON.stringify({
                roomId: currentRoom.id,
                senderId: "jerry",
                senderName: "Jerry Awesome",
                payload: typedMessage,
                type: "",
            })
        );
        setTypedMessage("");
    };

    const serverURL = "http://localhost:8080";

    useEffect(() => {
        const sseForUsers = new EventSource(`${serverURL}/v1/chat/sse/rooms`, {
            withCredentials: true,
        });

        sseForUsers.onopen = (e) => {
            console.log("SSE Room Connected !");
        };

        sseForUsers.addEventListener("room-list-event", (event) => {
            let jsonData = JSON.parse(event.data);
            if (rooms && jsonData && rooms.length !== jsonData.length) {
                setOpenAlert(true);
            }
            setRooms(jsonData);
        });

        sseForUsers.onerror = (error) => {
            console.log("SSE For Rooms error", error);
            sseForUsers.close();
        };

        return () => {
            sseForUsers.close();
        };
    }, [rooms]);

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Stack direction="column" alignItems="center" gap={1}>
                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? "demo-customized-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        variant="text"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Rooms
                    </Button>
                </Stack>
                <Divider />
                {rooms &&
                    rooms.map((room, index) => (
                        <ListItem
                            key={room.id}
                            disablePadding
                            dense={true}
                            onClick={() => {
                                setCurrentRoom(room);
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary={room.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </div>
    );

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    setOpenAlert(false);
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
                }}
            >
                {drawer}
            </Drawer>
            {currentRoom && (
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ m: 0, p: 1, mt: 9, borderBottom: 1, borderColor: "grey.300" }}>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Typography fontWeight="fontWeightMedium">
                            CHAT ROOM
                            </Typography>
                            <Typography fontWeight="fontWeightMedium" color="red">
                                {currentRoom.title}
                            </Typography>
                        </Stack>
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Container sx={{ m: 0, p: 0 }} maxWidth="100vh">
                            <Box sx={{ m: 0, p: 0 }}>
                                {messages &&
                                    messages.map((msg, index) => (
                                        <Box key={index} sx={{borderBottom: 1, borderColor: "grey.50"}}>
                                            <Stack direction="row" alignItems="center" gap={1}>
                                                <Typography fontWeight="fontWeightMedium" color="inherit">
                                                    {msg.senderName}
                                                </Typography>
                                                <Typography color="grey" fontSize="12px">
                                                    {msg.timestamp}
                                                </Typography>
                                            </Stack>
                                            <Typography fontSize="13px" color="inherit">{msg.payload}</Typography>
                                        </Box>
                                    ))}
                            </Box>
                        </Container>
                    </Box>
                    <Box
                        component="footer"
                        sx={{
                            py: 3,
                            px: 2,
                            mt: "auto",
                        }}
                    >
                        <Container maxWidth="100vh">
                            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }} fullWidth>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder={"Message #" + currentRoom.title}
                                    value={typedMessage}
                                    onChange={(event) => {
                                        setTypedMessage(event.target.value);
                                    }}
                                    onKeyDown={handleMessageKeyDown}
                                />
                                {/* <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                                    <SearchIcon />
                                </IconButton> */}
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions" onClick={sendMessage}>
                                    <SendIcon />
                                </IconButton>
                            </Paper>
                        </Container>
                    </Box>
                </Box>
            )}

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={createRoom} disableRipple>
                    <EditIcon />
                    Create room
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <MoreHorizIcon />
                    More
                </MenuItem>
            </StyledMenu>

            <Dialog
                open={openNewRoomDialog}
                onClose={() => {
                    setOpenNewRoomDialog(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Create a Room</DialogTitle>
                <DialogContent>
                    <TextField fullWidth id="outlined-basic" label="Room Name" variant="outlined" sx={{ mt: 1, mb: 1 }} value={newRoomName || ""} onChange={handleNewRoomName} />
                    <Typography variant="body2" gutterBottom>
                        Rooms are where conversations happen around a topic. Use a name that is easy to find and understand.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenNewRoomDialog(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={saveNewRoom} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={() => {
                    setOpenAlert(false);
                }}
                message="New Room Created"
                action={action}
            />
            {currentRoom && (
                
                <WebsocketSockJs room={currentRoom} setMessages={setMessages} setClientRef={setClientRef} />
            )}
        </React.Fragment>
    );
};

export default Rooms;
