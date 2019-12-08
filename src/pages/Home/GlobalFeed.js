import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleItem from '../../components/ArticleItem';
import Paginate from '../../components/Paginate';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  paginateBox: {
    width: '100%',
    alignContent: 'center',
    margin: 15
  }
}));

const GlobalFeed = () => {
  
  const classes = useStyles();
  const [screams, setScreams] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  
  const fetchScreams = async () => {
    await axios.get('/screams')
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
    screams.map(scream => <ArticleItem key={scream.screamId} scream={scream}></ArticleItem>)
  ) : <p>Loading...</p>;

  let pagesCount = screamsList.length > 0 ? Math.ceil(screamsList.length / itemsPerPage) : 6;

  const paginatedList = screamsList.length > 0 ? 
    screamsList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : screamsList;

  return (
    <div>
      {paginatedList}
      <div className={classes.paginateBox}>
        <Paginate
          itemsPerPage={itemsPerPage}
          pagesCount={pagesCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};



export default GlobalFeed;