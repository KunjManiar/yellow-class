// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import {firebase} from  './firebase'
import 'firebase/auth'

import Routes from './Routes'

const App = (props) => {
    return(
        <BrowserRouter>
            <Routes {...props}/>
        </BrowserRouter>
    )
}

firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})

// ReactDOM.render(<App />, document.getElementById('root'));

