import React, { useState, useEffect } from 'react';
import { Heading } from './components/Heading';
import { Loader } from './components/Loader';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactDom from 'react-dom'

// import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import './App.css'
import './styles/test.css'
// import './styles/index.css'

import Masonry from 'react-masonry-css';

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }
  .content {
    padding: 16px;
  }
  
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }
  
  .sticky + .content {
    padding-top: 102px;
  }
`;

// const WrapperImages = styled.section`
//   max-width: 70rem;
//   margin: 4rem auto;
//   display: grid;
//   grid-gap: 1em;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   grid-auto-rows: 300px;
// `;

function App() {
  const [images, setImage] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageNo, setCurrentImageNo] = useState(-1)

  useEffect(() => {
    fetchImages();
  }, [])

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then(res => {
        setImage([...images, ...res.data]);
      })
  }



  const toggleModal = (e, image, i) => {

    // console.log("In toggle")
    if (e && e.currentTarget.hasError) return
    // if (!e) var e = window.event;
    // e.cancelBubble = true;
    // if (e.stopPropagation) e.stopPropagation();
    setShowModal(!showModal)
    // setUrl(url)
    // setDescription(description)
    setCurrentImage(image)
    setCurrentImageNo(i)
    // console.log(images[i])
  }

  const leftButtonFunction = (e) => {

    if (e && e.currentTarget.hasError) return
    if(currentImageNo>0){
      setCurrentImage(images[currentImageNo - 1]);
      setCurrentImageNo(currentImageNo - 1);
      if (!e) e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    }
  }

  const rightButtonFunction = (e) => {

    if (e && e.currentTarget.hasError) return
    if(currentImageNo<images.length-2 ){
      setCurrentImage(images[currentImageNo + 1]);
      setCurrentImageNo(currentImageNo + 1);
      if (!e) e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    }
  }

  const childElements = images.map(function (element, i) {
    return (
      <div key={i}>
        <img
          style={{borderRadius: 16}}
          src={element.urls.regular}
          width={230}
          onClick={(e) => toggleModal(e, element, i)}
          alt={"Not found"}
        />
      </div>
    );
  });

  return (
    <div>
      <Heading />
      <GlobalStyle />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        {/* <WrapperImages>
          {images.map(image => (
            <UnsplashImage url={image.urls.full} key={image.id} />
          ))}
        </WrapperImages> */}
        <Masonry

          breakpointCols={5}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        // style={style}
        >
          {childElements}
        </Masonry>

      </InfiniteScroll>
      {showModal && ReactDom.createPortal(
        <div
          className="fixed p1 flex flex-column justify-center items-center trbl0 bg-fff-o overflow-auto overscroll-contain"
          onClick={e => {
            console.log(e.currentTarget)
            toggleModal(e, null)
          }}
        >
          <div className="fixed p1" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
          <div onClick={(e) => { leftButtonFunction(e) }}>
              <span style={{ fontSize: 40 }}>
                <i class="fas fa-chevron-left" style={{ color: '#E60023' }}></i>
              </span>
            </div>
            <img
              src={currentImage.urls.full}
              style={{ width: '35%', padding: 20 }}
              className="fit pointer"
              alt={"Not found"}
            />
            {/* <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h4>{currentImage.user.name}</h4>
              <p>{currentImage.description}</p>
            </div> */}
            <div onClick={(e) => { rightButtonFunction(e) }}>
              <span style={{ fontSize: 40 }}>
                <i class="fas fa-chevron-right" style={{ color: '#E60023' }}></i>
              </span>
            </div>
          </div>
          {/* <span>{title}</span> */}
          {/* <span>{description}</span> */}
        </div>,
        document.getElementById('root2')
      )}
    </div>
  );
}

export default App;
