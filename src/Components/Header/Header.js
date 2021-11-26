//On successfull login the person will get redirected to an empty page with just a header
//The following function will create a header at the top of the page with a '+' icon
//to join, create class or todo

import React from "react";
import { useStyles } from "./style";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useLocalContext } from "../../context/context";
import logo from "../../Assets/logo.png";
import { CreateClass, JoinClass, Todo } from "..";

//this function handles the outlook of the header component of the page
//and renders the drawer and plus menu icon for joining and creating the class and todo

const Header = ({ children }) => {
  const classes = useStyles();
  const { setCreateClassDialog, setJoinClassDialog, setTodoClassDialog, loggedInUser, logout } = useLocalContext();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);


  const handleCreate = () => {
    handleClose();
    setCreateClassDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    setJoinClassDialog(true);
  };

  const handletodo = () => {
    handleClose();
    setTodoClassDialog(true);
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            {children}
            <img src={logo} alt="Microsoft" />
            <Typography variant="h6" className={classes.title}>
              Hub
            </Typography>
          </div>
          <div className={classes.header__wrapper__right}>
            <Add onClick={handleClick} className={classes.icon} />
            
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
              <MenuItem onClick={handletodo}> To-Do </MenuItem>
            </Menu>
            <div>
              <Avatar
                onClick={() => logout()}
                src={loggedInUser?.photoURL}
                className={classes.icon}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Todo />
      <CreateClass />
      <JoinClass />
    </div>
  );
};

export default Header;