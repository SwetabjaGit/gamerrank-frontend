import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";

//Components
import ArticleItem from "../../components/ArticleItem";
import Paginate from "../../components/Paginate";
import ScreamSkeleton from "../../utils/ScreamSkeleton";
import { profile } from "../../config/constants";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  paginateBox: {
    width: "100%",
    alignContent: "center",
    margin: 15,
  },
}));

const MyFeed = (props) => {
  const { screams } = props;
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = profile.FEED_PAGE_SIZE;

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    //fetchScreams(source);
    return () => {
      source.cancel();
    };
  }, []);

  const screamsList = screams ? (
    screams.map((scream) => (
      <ArticleItem key={scream.screamId} scream={scream} />
    ))
  ) : (
    <ScreamSkeleton />
  );

  let pagesCount =
    screamsList.length > 0 
    ? Math.ceil(screamsList.length / itemsPerPage) 
    : 6;

  const paginatedList =
    screamsList.length > 0
      ? screamsList.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage
      ) : screamsList;

  return (
    <div className={classes.root}>
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

export default MyFeed;
