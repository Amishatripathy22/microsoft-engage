//the header component contains a plus menu icon which has the functionality of 
//joining the class created by the creator

import React, { useState } from "react";
import { Avatar, Button, Dialog, Slide, TextField } from "@material-ui/core";
import { useLocalContext } from "../../context/context";
import { Close } from "@material-ui/icons";
import "./style.css";
import db from "../../lib/firebase";

const Transition = React.forwardRef(function Transition(props, ref){
    return <Slide directon="up" ref={ref} {...props} />
});

//this function opens up the dialog box with some information about the loggedin person
//the dialog box take 2 inputs, class code and class creator's email to join the class and then render the inputs
//the firebase then store the email of the new person who joined the class 
//the class is only accessible when the person is loggedIn

const JoinClass = () => {
    const {joinClassDialog, setJoinClassDialog, loggedInUser} = useLocalContext();
    const [classCode, setClassCode] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState();
  const [joinedData, setJoinedData] = useState();
  const [classExists, setClassExists] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("CreatedClasses")
      .doc(email)
      .collection("classes")
      .doc(classCode)
      .get()
      .then((doc) => {
        if (doc.exists && doc.owner !== loggedInUser.email) {
          setClassExists(true);
          setJoinedData(doc.data()); 
          setError(false);
        } else {
          setError(true);
          setClassExists(false);
          return;
        }
      });

    if (classExists === true) {
      db.collection("JoinedClasses")
        .doc(loggedInUser.email)
        .collection("classes")
        .doc(classCode)
        .set({
          joinedData,
        })
        .then(() => {
          setJoinClassDialog(false);
        });
    }
  };

    return(
        <div>
            <Dialog
                fullScreen
                open={joinClassDialog}
                onClose={() => setJoinClassDialog(false)}
                TransitionComponent={Transition}
            >
            <div className="joinClass">
          <div className="joinClass__wrapper">
            <div
              className="joinClass__wraper2"
              onClick={() => setJoinClassDialog(false)}
            >
              <Close className="joinClass__svg" />
              <div className="joinClass__topHead">Join Club</div>
            </div>
            <Button
              className="joinClass__btn"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Join
            </Button>
          </div>
          <div className="joinClass__form">
            <p className="joinClass__formText">
              You're currently signed in as {loggedInUser?.email}
            </p>
            <div className="joinClass__loginInfo">
              <div className="joinClass__classLeft">
                <Avatar src={loggedInUser?.photoURL} />
                <div className="joinClaoginss__lText">
                  <div className="joinClass__loginName">
                    {loggedInUser?.displayName}
                  </div>
                  <div className="joinClass__loginEmail">
                    {loggedInUser?.email}
                  </div>
                </div>
              </div>
              <Button variant="outlined" color="primary">
                Logout
              </Button>
            </div>
          </div>
          <div className="joinClass__form">
            <div
              style={{ fontSize: "1.25rem", color: "#3c4043" }}
              className="joinClass__formText"
            >
              Club Code
            </div>
            <div
              style={{ color: "#3c4043", marginTop: "-5px" }}
              className="joinClass__formText"
            >
              Ask your club's admin for the class code, then enter it here.
            </div>
            <div className="joinClass__loginInfo">
              <TextField
                id="outlined-basic"
                label="Class Code"
                variant="outlined"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                error={error}
                helperText={error && "No class was found"}
              />
              <TextField
                id="outlined-basic"
                label="Owner's email"
                variant="outlined"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default JoinClass;
