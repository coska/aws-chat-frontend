import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import * as React from "react";

import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";

const Rooms = () => {
    const [rooms, setRooms] = React.useState(["Home"]);
    const [currentRoom, setCurrentRoom] = React.useState();

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {rooms &&
                    rooms.map((room, index) => (
                        <ListItem key={room} disablePadding dense={true} onClick={() => { setCurrentRoom(room) }}>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
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
            {currentRoom &&
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div className="text-center">
                        <h4 style={{ marginTop: "0px", marginBottom: "5px", fontWeight: "bold" }}>
                            CHAT ROOM ( Room : <span style={{ color: "red" }}>{currentRoom} </span>)
                        </h4>
                    </div>
                </Box>
            }
        </React.Fragment>
    );
}

export default Rooms;
