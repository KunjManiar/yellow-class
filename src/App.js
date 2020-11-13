import React, { useState, useEffect } from 'react';
import { Heading } from './components/Heading';
import { UnsplashImage } from './components/UnsplashImage';
import { Loader } from './components/Loader';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import './App.css'

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
`;

const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function App() {
  const [images, setImage] = useState([]);

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

  const childElements = images.map(function (element) {
    return (
      <div>
        <img src={element.urls.regular}  width={250}/>
        </div>
    );
  });
  const masonryOptions = {
    transitionDuration: 0
  };
  const style = {
    backgroundColor: 'tomato'
  };

  const imagesLoadedOptions = { background: '.my-bg-image-el' }


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
    </div>
  );
}

export default App;
