import firebase from 'firebase/app'

var config = {
    apiKey: "AIzaSyCx6VNQ3Kf_WSidrr0Db471kLwN8kTV7eQ",
    authDomain: "yellow-class-pinterst.firebaseapp.com",
    databaseURL: "https://yellow-class-pinterst.firebaseio.com",
    projectId: "yellow-class-pinterst",
    storageBucket: "yellow-class-pinterst.appspot.com",
    messagingSenderId: "703672778299",
    appId: "1:703672778299:web:fa5f5f2b079f19cbab261e"
  };


firebase.initializeApp(config);

export {
    firebase
}