//This component is specially for submission process for both creator and students
//the creator or student can post the document in any format(doc,pdf,jpg)
//the document is accessible to both creator and the students in the group
//the document will then be uploaded to firebase

import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "../../lib/firebase";
import "./style.css";
import PdfIcon from "../../Assets/pdf-icon.png";

//here classdata i.e the document is passed to the function to upload it on firebase
//then it is posted in the class which can be accessed by clicking on the pdf icon
const Announcment = ({ classData }) => {
  const [announcment, setAnnouncment] = useState([]);

  useEffect(() => {
    if (classData) {
      let unsubscribe = db
        .collection("announcments")
        .doc("classes")
        .collection(classData.id)
        .onSnapshot((snap) => {
          setAnnouncment(snap.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [classData]);
  console.log(announcment);
  return (
    <div>
      {announcment.map((item) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <div>{item.sender}</div>
            </div>
            <p className="amt__txt">{item.text}</p>
              <img className="amt__img" src={PdfIcon} alt={item.text} onClick={()=> window.open(item.imageUrl, "_blank")} />

          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcment;
