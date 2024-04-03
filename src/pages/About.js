import React from 'react';

function About() {
  return (
    <div style={{marginTop: "100px", textAlign: "left", padding: "0 300px"}}>
        <h3 style={{fontSize: "27px"}}>About This CRUD Application : </h3>
        <p style={{fontSize: "18px", letterSpacing: "1px"}}>This is a basic CRUD application website made with react js with routing to Firebase Realtime Database . The functionalities of this website are : 
          <br />
          <br />
          1. User can add New contacts
          <br />
          <br />
          2. User can update the existing contacts
          <br />
          <br />
          3. User can delete any existing contact
          <br />
          <br />
          4. User can view the detailed contact
        </p>
    </div>
  )
}

export default About
