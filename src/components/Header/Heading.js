import React from 'react';
import styled from 'styled-components';
import './Header.css'

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

export const Heading = () => {


  const showSignIn = window.innerWidth > 450 ?
    (
      <div className="flexRow" >
        <div className="buttonHeader" style={{}}>
          <p className="buttonText" style={{ color: '#ffffff' }}>Login</p>
        </div>
        <div className="buttonHeader" style={{ backgroundColor: '#efefef' }}>
          <p className="buttonText" style={{}}>Sign Up</p>
        </div>
      </div>
    ) : null
    
  return (
    <Header className>
      {/* <div class="top-container">
        <H1>Pinterest Clone by Kunj Maniar</H1>
        <p>Images from Usplash The internet’s source of freely usable images.</p>
      </div> */}
      <div className="header flexRow" id="myHeader" style={{ justifyContent: 'space-between' }}>
        <div className="flexRow" >
          <span style={{ fontSize: 40 }}>
            <i className="fab fa-pinterest" style={{ color: '#E60023' }}></i>
          </span>
          <p style={{ color: '#E60023', marginLeft: 5, fontFamily: 'Oswald', letterSpacing: 0.8, fontSize: 25 }}>Pinterest</p>
          <div style={{ paddingTop: 10, paddingLeft: 9 }}>
            <p style={{ color: '#E60023', fontFamily: 'Oswald', letterSpacing: 0.4 }}> clone by Kunj Maniar</p>
          </div>
        </div>
        {showSignIn}
      </div>

      {/* <p>Powered by Kunj Maniar.</p> */}
      {/* <form>
        <Input type="text" placeholder="Search photos" />
        <Button>Search</Button>
      </form> */}
    </Header>
  )
}
