import React, { useEffect, useState } from "react";
import { Drawer, JoinedClasses, Login, Main } from "./Components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./routes/Routes";
import { useLocalContext } from "./context/context";
import db from "./lib/firebase";

//this is the main funcion of the whole react app where we will import different components
//and redirect the user to different pages according to their activity
function App() {
  const {loggedInMail } = useLocalContext();

  const [createdClasses, setCreatedClasses] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);

  //the first event will be trigger when the user will login to the app

  //this event will store the email-id of the user who will create the app inside the create classes directory of firebase
  //and likewise store all the classes created by that particular user only if the user is loggedin
  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db
        .collection("CreatedClasses")
        .doc(loggedInMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setCreatedClasses(snapshot.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [loggedInMail]);

  //this event will store the email-id of the user who will join the class inside the joined classes directory of the firebase
  //and likewise store all the classes joined by that particular user only if the user is loggedin 
  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db
        .collection("JoinedClasses")
        .doc(loggedInMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setJoinedClasses(snapshot.docs.map((doc) => doc.data().joinedData));
        });

      return () => unsubscribe();
    }
  }, [loggedInMail]);

  return (
    <Router>
      <Switch>
      {createdClasses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        {joinedClasses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        <IsUserRedirect
        user ={loggedInMail}
        loggedInPath='/'
        path='/signin'exact>
          <Login/>
        </IsUserRedirect>

        <ProtectedRoute user={loggedInMail} path="/" exact>
          <Drawer />
          <ol className="joined">
            {createdClasses.map((item) => (
              <JoinedClasses classData={item} />
            ))}

            {joinedClasses.map((item) => (
              <JoinedClasses classData={item} />
            ))}
          </ol>
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
