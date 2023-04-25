import { useEffect, useRef, useState } from "react";
import * as React from "react";

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

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
    const [homeRoom, setHomeRoom] = React.useState({ roomName: "Home" });
    const [rooms, setRooms] = React.useState();
    const [currentRoom, setCurrentRoom] = React.useState();
    const [newRoomName, setNewRoomName] = React.useState();
    const [openAlert, setOpenAlert] = React.useState();

    const [anchorEl, setAnchorEl] = React.useState(false);
    const open = Boolean(anchorEl);
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
                id: newRoomName,
                title: newRoomName,
            }),
        };
        const response = await fetch(`/v1/chat/rooms`, requestOptions);

        if (response.status === 200) {
            setNewRoomName("");
        }
    };

    const serverURL = "http://localhost:8080";
    const divRefs = useRef([]);

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
                            key={room}
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
                                <ListItemText primary={room} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
            {/* <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem key={text} disablePadding dense={true}>
                        <ListItemButton>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </div>
    );

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {setOpenAlert(false)}}
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
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div className="text-center">
                        <h4 style={{ marginTop: "0px", marginBottom: "5px", fontWeight: "bold" }}>
                            CHAT ROOM ( Room : <span style={{ color: "red" }}>{currentRoom} </span>)
                        </h4>
                    </div>
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
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => { setOpenAlert(false) }} message="New Room Created" action={action} />
        </React.Fragment>
    );
};

export default Rooms;
