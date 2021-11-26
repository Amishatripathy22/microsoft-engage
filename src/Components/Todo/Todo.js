//todo feature helps the students to set their daily task and reminders
//easy to use ui enables them to use CRUD operations efficiently
//the task gets uploaded, updated, and deleted on the firebase storage in real-time 
//data privacy is utmost important, so the task are visible only to the associated loggedin user

import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, Input, InputLabel, Dialog, Slide } from "@material-ui/core";
import "./Todo.css";
import db from "../../lib/firebase";
import firebase from "firebase";
import { useLocalContext } from "../../context/context";
import { Close } from "@material-ui/icons";
import { UpdateTodo } from ".."

//transition function for the dialog box
const Transition = React.forwardRef(function Transition(props, ref){
    return <Slide directon="up" ref={ref} {...props} />
});


//App function will render the CRUD operations of the user using a simple Todo UI
const App = () => {
    const {todoClassDialog, setTodoClassDialog, loggedInUser, loggedInMail} = useLocalContext();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
 
  //this event will be triggered whenever the user will create new task
  useEffect(() => {
    if (loggedInMail) {
      db.collection(loggedInMail)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setTodos(
            snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
          );
        });
    }
  }, [loggedInMail]);


  console.log("isuser", loggedInMail);

  const addTodo = (event) => {
    event.preventDefault();
    if (loggedInUser.email) {
      db.collection(loggedInUser.email).add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setInput("");
    }
  };

  
  return (
        <div className="body">
        <Dialog
                SimpleDialog
                open={todoClassDialog}
                maxWidth= 'lg'
                onClose={() => setTodoClassDialog(false)}
                TransitionComponent={Transition}
            >
            <div className="joinClass__wrapper">
            <div
              className="joinClass__wraper2"
              onClick={() => setTodoClassDialog(false)}
            >
              <Close className="joinClass__svg" />
              <div className="joinClass__topHead">To-Do</div>
            </div>
          </div>

          <Box textAlign='center' >
          
            {loggedInUser && (
                <h4>
                
                <div>

                </div>
                </h4>
              )}

              <h1>Your To-Do List </h1>
              <h4>    
              
              </h4>
              <form>
                <FormControl>
                <h4> </h4>
                  <InputLabel>✅ Write A To-do</InputLabel>
                  <Input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                  />
                  <Button
                  disabled={!input}
                  type="submit"
                  onClick={addTodo}
                  variant="contained"
                  color="primary"
                >
                  Add Todo
                </Button>
                </FormControl>
              </form>
              </Box>


               <ul>
                {todos.map((todo, index) => (
                  <UpdateTodo
                    passedTodo={todo}
                    index={index}
                    firebaseUser={loggedInUser.email}
                    key={index}
                  />
                ))}
              </ul>
              </Dialog>
            </div>
  );
}

export default App;