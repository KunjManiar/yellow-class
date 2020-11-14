import axios from 'axios';

export const fetchImages = async (count = 10) => {
  const apiRoot = "https://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;

  const res = await axios.get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
    // .then(res => {
    //   console.log(res.data)
    //   return res.data
    // })
    return res.data
}

