//After the user has added a reminder, in case the user forgets to finish the task this todo functionality comes in handy 
//when the user needs to put a reminder in the todo dialog box and its features to update or delete 
//the task yet to be done, and the task finished, respectively.


import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
  } from "@material-ui/core";
  import { Button, List } from "@material-ui/core";
  import "./style.css";
  import React, { useState } from "react";
  import db from "../../lib/firebase";
  import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
  
  import { makeStyles } from "@material-ui/core/styles";

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  //the update function updates the task whenever the user edits their old task
  function Update(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
  
    //this updateTodo function will update the task in firebase in realtime 
    const updateTodo = () => {
      if (props.firebaseUser) {
        db.collection(props.firebaseUser).doc(props.passedTodo.id).set(
          {
            todo: input,
          },
          { merge: true }
        );
        setOpen(false);
      }
    };
  

    //the delete event will be triggered when the user finishes his task
    const deleteMe = (event) => {
      if (props.firebaseUser) {
        db.collection(props.firebaseUser).doc(props.passedTodo.id).delete();
      }
    };
  
    return (
      <>
        <Modal open={open} onClose={(e) => setOpen(false)}>
          <div className={classes.paper}>
            <h1>Edit Task</h1>
            <input
              placeholder={props.passedTodo.todo}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button onClick={updateTodo}>Update Todo</Button>
          </div>
        </Modal>
        <List className="todo__list">
          <ListItem>
            <ListItemAvatar></ListItemAvatar>
            <ListItemText
              primary={props.passedTodo.todo}
              secondary={`Task ${props.index + 1}`}
            />
          </ListItem>
          <Button onClick={(e) => setOpen(true)}>EDIT</Button>
          <DeleteForeverIcon onClick={deleteMe}>DELELTE ME</DeleteForeverIcon>
        </List>
      </>
    );
  }
  
  export default Update;