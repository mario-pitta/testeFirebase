import { Injectable } from '@angular/core';
declare var require;
const firebase = require("firebase");
// Required for side-effects
 require("firebase/firestore");

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseConfig = {
    apiKey: "AIzaSyCo8gV0YkMjDWbJgHKdRhGx6UuvJyrnClo",
    authDomain: "myapp-6ee00.firebaseapp.com",
    databaseURL: "https://myapp-6ee00.firebaseio.com",
    projectId: "myapp-6ee00",
    storageBucket: "myapp-6ee00.appspot.com",
    messagingSenderId: "922591518299",
    appId: "1:922591518299:web:c0e846a8838e8a70"
  };

  db;



  constructor() { 
    firebase.initializeApp({
      apiKey: this.firebaseConfig.apiKey,
      authDomain: this.firebaseConfig.authDomain,
      projectId: this.firebaseConfig.projectId
    });
    
    this.db = firebase.firestore();
  
  }

  create(collectionName, object){
    this.db.collection(collectionName).add(
      object
  )
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);

  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  
    }

  remove(collectionName, id){
    var deleteDoc = this.db.collection(collectionName).doc(id).delete();
    
  }

  update(collectionName, doc){
    console.log(doc)
    var updateDoc = this.db.collection(collectionName).doc(doc.id).set(doc);
  }
  
  list(collectionName): Promise<any> {
    return this.db.collection(collectionName).get()
  }
  
}
