import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleItem from '../../components/ArticleItem';
import Paginate from '../../components/Paginate';
import { makeStyles } from '@material-ui/styles';

//Components
import ScreamSkeleton from '../../utils/ScreamSkeleton';

const useStyles = makeStyles(() => ({
  paginateBox: {
    width: '100%',
    alignContent: 'center',
    margin: 15
  }
}));

const FavoritedArticles = (props) => {
  
  const { screams } = props;
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;


  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    //fetchScreams(source);

    return () => {
      source.cancel();
    };
  }, []);

  const screamsList = screams ? (
    screams.map(scream => <ArticleItem key={scream.screamId} scream={scream}></ArticleItem>)
  ) : (
    <ScreamSkeleton />
  );

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



export default FavoritedArticles;