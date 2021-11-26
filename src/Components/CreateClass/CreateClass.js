//the create class component allows the creator to create the class on thier own
//the creator can set the title, section, subject, and the number of students that can joined the class
//
//every class has its own class code that the creator can share with its student, along with their email-id


import React, { useState } from 'react';
import { useLocalContext } from "../../context/context";
import { Button, Checkbox, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import Form from "./Form";
import './style.css'

//the create class function first opens a small dialog box that allows the user to accept the terms and conditions
//post that the user can create any class

const CreateClass = () => {
    const { createClassDialog, setCreateClassDialog } = useLocalContext();
    const [check, setChecked] = useState(false);
    const [showForm, setShowForm] = useState(false);
    return (
        <div>
            <Dialog
            onClose={()=>setCreateClassDialog(false)}
            aria-labelledby="customized-dialog-title"
            open = {createClassDialog}
            maxWidth = {showForm ? "lg" : "xs"}
            className="form__dialog"
        >
        {showForm ? (
          <Form />
        ) : (
          <>
            <div className="class__title">
                Using Microsoft for schools?
            </div>
            <DialogContent className='class__content'>
            <p className="class__text">
                <p>If so, your school must sign up for a free Microsoft for Education
                account before you can use the Software.
              </p>
            </p>
              <p>
                Microsoft for Education lets schools decide which services
                their students can use, and provides additional privacy and security
                protections that are important in a school setting. Students
                cannot use this software at a school with personal accounts.
              </p>

              <div className = "class_checkboxWrapper">
                  <Checkbox color = 'primary' onChange={() => setChecked(!check)} />
                  <p>
                  I've read and understand the above notice.
                  </p>
              </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => setCreateClassDialog(false)}>
                   close
                </Button>

                <Button autoFocus 
                color = 'primary' 
                disabled={!check}
                onClick={() => setShowForm(true)}
                >
                    Continue
                </Button>
            </DialogActions>
           </>
        )}
            </Dialog>
            </div>
        );
};

export default CreateClass;
