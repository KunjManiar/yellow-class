import React, { useState } from 'react';
import styled from 'styled-components';
import './Header.css'

// import { submit } from '../Widgets/Alert/alert'

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignIn/SignUp'

import ReactDom from 'react-dom'

const Header = styled.header`
  // max-width: 70rem;
  // margin: 2rem auto;
  text-align: center;
  margin: 10px
`;



// const H1 = styled.h1`
//   font-family: 'Oswald', sans-serif;
//   // margin-bottom: 1em;
// `;

// const Input = styled.input`
//   height: 2.5rem;
//   width: 20rem;
//   margin-top: 1em;
//   outline: none;
//   text-indent: 1em;
//   font-size: 1em;

//   ::placeholder {
//     font-size: .8em;
//   }
// `;

// const Button = styled.button`
//   height: 2.5rem;
//   padding: 0 1em;
//   outline: none;
//   cursor: pointer;
//   background: #222;
//   border: none;
//   color: #fff;
//   font-size: 1em;
// `;

export const Heading = ({ props, blurBackgroundFunction }) => {

  const [showModalSignIn, setShowModalSignIn] = useState(false)
  const [showModalSignUp, setShowModalSignUp] = useState(false)

  const toggleModal = (e, type) => {
    console.log(type)
    if (e && e.currentTarget.hasError) return
    type === 'signIn' ? setShowModalSignIn(!showModalSignIn) : setShowModalSignUp(!showModalSignUp)
    blurBackgroundFunction()
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  const showSignIn = window.innerWidth > 450 ?
    (
      <div className="flexRow" >
        <div className="buttonHeader" style={{}} onClick={(e) => toggleModal(e, 'signIn')}>
          <button className="buttonText" style={{ color: '#ffffff', background: '#E60023', borderWidth: 0 }}>Login</button>
        </div>
        <div className="buttonHeader" style={{ backgroundColor: '#efefef' }} onClick={(e) => toggleModal(e, 'signUp')}>
          <button className="buttonText" style={{ backgroundColor: '#efefef', borderWidth: 0, borderRadius: 'inherit' }} >Sign Up</button>
        </div>
      </div>
    ) : null
    
    // (
    //   <div className="flexRow" >
    //     <div className="buttonHeader" style={{}} onClick={(e) => toggleModal(e, 'signIn')}>
    //       <button className="buttonText" style={{ color: '#ffffff', background: '#E60023', borderWidth: 0 }}>Login</button>
    //     </div>
    //     <div className="buttonHeader" style={{ backgroundColor: '#efefef' }} onClick={(e) => toggleModal(e, 'signUp')}>
    //       <button className="buttonText" style={{ backgroundColor: '#efefef', borderWidth: 0, borderRadius: 'inherit' }} >Sign Up</button>
    //     </div>
    //   </div>
    // )

  const rowVsColumn = window.innerWidth > 450 ?
    (
      <div className="flexRow" >
        <span style={{ fontSize: 40 }}>
          <i className="fab fa-pinterest" style={{ color: '#E60023' }}></i>
        </span>
        <p style={{ color: '#E60023', marginLeft: 5, fontFamily: 'Oswald', letterSpacing: 0.8, fontSize: 25 }}>Pinterest</p>
        <div style={{ paddingTop: 10, paddingLeft: 9 }}>
          <p style={{ color: '#E60023', fontFamily: 'Oswald', letterSpacing: 0.4 }}> clone by Kunj Maniar</p>
        </div>
      </div>
    ) : (
      <div className="flexRow" >
        <span style={{ fontSize: 40 }}>
          <i className="fab fa-pinterest" style={{ color: '#E60023' }}></i>
        </span>
        <p style={{ color: '#E60023', marginLeft: 5, fontFamily: 'Oswald', letterSpacing: 0.8, fontSize: 25 }}>Pinterest</p>
        <div style={{ paddingTop: 10, paddingLeft: 9 }}>
          <p style={{ color: '#E60023', fontFamily: 'Oswald', letterSpacing: 0.4 }}> clone by Kunj Maniar</p>
        </div>
      </div>
    )
    
    // (
    //   <div className="flexColumn" >
        
    //     <div className="flexRow">
    //     <span style={{ fontSize: 40 }}>
    //       <i className="fab fa-pinterest" style={{ color: '#E60023' }}></i>
    //     </span>
    //     <p style={{ color: '#E60023', marginLeft: 5, fontFamily: 'Oswald', letterSpacing: 0.8, fontSize: 25 }}>Pinterest</p>
    //     </div>
    //     <div style={{ paddingLeft: 46 }}>
    //       <p style={{ color: '#E60023', fontFamily: 'Oswald', letterSpacing: 0.4, fontSize: 11.8 }}> clone by Kunj Maniar</p>
    //     </div>
    //   </div>
    // )

  return (
    <Header>
      {/* <div class="top-container">
        <H1>Pinterest Clone by Kunj Maniar</H1>
        <p>Images from Usplash The internet’s source of freely usable images.</p>
      </div> */}
      <div className="header flexRow" id="myHeader" style={{ justifyContent: 'space-between' }}>
        {rowVsColumn}
        {showSignIn}
      </div>

      {/* <p>Powered by Kunj Maniar.</p> */}
      {/* <form>
        <Input type="text" placeholder="Search photos" />
        <Button>Search</Button>
      </form> */}
      {(showModalSignIn || showModalSignUp) && ReactDom.createPortal(
        <div
          className="fixed p1 flex flex-column justify-center items-center trbl0 bg-fff-o overflow-auto overscroll-contain"
          onClick={e => {
            // console.log(e.currentTarget)
            toggleModal(e, showModalSignIn ? 'signIn' : 'signUp')
          }}
        >
          {showModalSignIn ? (<SignIn />) : <SignUp />}
        </div>
        ,
        document.getElementById('root2'))
      }
    </Header>

  )
}
