import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
//import './stylesheet.css';


const useStyles = makeStyles(() => ({
  progress: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 30,
    zoom: 1.5
  }
}));

const InfiniteScrollTest = () => {

  const classes = useStyles();
  const [tracks, setTracks] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [nextHref, setNextHref] = useState(null);

  const api = {
    baseUrl: 'https://api.soundcloud.com',
    user_id: '94957189',
    client_id: 'caf73ef1e709f839664ab82bef40fa96'
  };

  const fetchMoreData = () => {
    var url = api.baseUrl + 
      '/users/' + api.user_id + '/favorites' +
      '?client_id=' + api.client_id +
      '&linked_partitioning=1&page_size=20';
    
    if(nextHref){
      url = nextHref;
    }

    axios.get(url)
      .then(res => {
        if(res) {
          console.log(res.data.next_href);
          var trackss = tracks;
          res.data.collection.map(track => {
            if(track.artwork_url == null) {
              track.artwork_url = track.user.avatar_url;
            }
            trackss.push(track);
            return track;
          });

          if(res.data.next_href) {
            setTracks(trackss);
            setNextHref(res.data.next_href);
          } else {
            setHasMoreItems(false);
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const loader = <CircularProgress className={classes.progress} color="secondary" style={{ color: '#D41' }} />

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={hasMoreItems}
        loader={loader}
      >
        <div className="tracks" >
          {tracks.map((track, i) => (
            <div key={track.id} className="track">
              <a href={track.permalink_url}>
                <img alt="NoImage" src={track.artwork_url} width="150" height="150" />
                <p className="title">{track.title}</p>
              </a>
            </div> 
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollTest;