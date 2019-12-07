import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ArticleItem from '../../components/ArticleItem';


const GlobalFeed = () => {

  const [screams, setScreams] = useState(null);
  
  const fetchScreams = () => {
    axios.get('/screams')
      .then(res => {
        console.log(res.data);
        setScreams(res.data)
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchScreams();
  }, []);

  const screamsList = screams ? (
    screams.map(scream => <ArticleItem key={scream.screamId} scream={scream} ></ArticleItem>)
  ) : <p>Loading...</p>;

  return (
    <div>
      {screamsList}
    </div>
  );

};



export default GlobalFeed;