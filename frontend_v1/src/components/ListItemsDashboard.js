import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ScheduleIcon from "@material-ui/icons/Schedule";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { Link } from "react-router-dom";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ReceiptIcon from "@material-ui/icons/Receipt";

// component
//import DashBoard from "./Dashboard";
export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component={Link} to="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>

    <ListItem button component={Link} to="/schedules">
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="Schedules" />
    </ListItem>
    <ListItem button component={Link} to="/rooms">
      <ListItemIcon>
        <MeetingRoomIcon />
      </ListItemIcon>
      <ListItemText primary="Rooms" />
    </ListItem>
    <ListItem button component={Link} to="/products">
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
    <ListItem button component={Link} to="/receipts">
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Receipts" />
    </ListItem>
  </div>
);
