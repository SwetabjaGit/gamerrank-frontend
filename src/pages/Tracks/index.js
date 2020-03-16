import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
  Input,
  Popper,
  ClickAwayListener,
  Paper,
  List,
  ListItem,
  ListItemIcon
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';

// Components
import GridCard from './GridCard';
import Header from '../../components/Header';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchTracks, clearTracks } from '../../redux/actions/dataActions';



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: '0 auto',
    paddingBottom: 10,
    backgroundColor: '#F4F6F8'
  },
  search: {
    backgroundColor: '#FFF',
    minWidth:400,
    borderRadius: 4,
    flexBasis: 300,
    height: 50,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  header: {
    width: '70%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: theme.spacing(4, 0, 4, 0)
  },
  trackData: {
    width: '70%',
    margin: '0 auto',
  },
  title: {
    position: 'relative',
    fontWeight: 'bold',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 80,
      backgroundColor: theme.palette.primary.main
    }
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  sortButton: {
    backgroundColor: '#FFF',
    textTransform: 'none',
    letterSpacing: 0,
    width: 150,
    height: 50,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 30,
    zoom: 1.5
  },
}));

const Tracks = props => {
  const { 
    className, staticContext,
    tracks, nextHref, hasMoreItems,
    fetchTracks, clearTracks, ...rest
  } = props;

  const classes = useStyles();
  const sortRef = useRef(null);
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Most popular');
  const [mode, setMode] = useState('grid');


  const sortOptions = [
    'Most recent',
    'Popular',
    'Price high',
    'Price low',
    'On sale'
  ];

  const popularSearches = [
    'Devias React Dashboard',
    'Devias',
    'Admin Pannel',
    'Project',
    'Pages'
  ];

  useEffect(() => {
    window.onpopstate = () => {
      clearTracks();
    };
  }, [clearTracks]);

  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortSelect = value => {
    setSelectedSort(value);
    setOpenSort(false);
  };

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  const handleSearchChange = event => {
    setSearchValue(event.target.value);
    
    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };

  const api = {
    baseUrl: 'https://api.soundcloud.com',
    user_id: '94957189',
    client_id: 'sttWEuQHjL9Wqu5vwNb0iNf52zXFtQvs',
    page_size: '12'
  };

  const fetchMoreData = () => {
    var url = api.baseUrl + 
      '/users/' + api.user_id + '/favorites' +
      '?client_id=' + api.client_id +
      '&linked_partitioning=1&page_size=' + api.page_size;
    
    if(nextHref){
      url = nextHref;
    }

    fetchTracks(url);
  };

  const loader = <CircularProgress className={classes.progress} color="secondary" style={{ color: '#D41' }} />

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Header
        title="CONDUIT"
        description="A place to share your knowledge"
      />

      <div className={classes.header}>
        <Typography
          className={classes.title}
          variant="h1"
        >
          Showing {tracks.length} tracks
        </Typography>

        <div className={classes.actions}>
          <div
            className={classes.search}
            ref={searchRef}
          >
            <Input
              className={classes.searchInput}
              disableUnderline
              onChange={handleSearchChange}
              placeholder="Search for audio tracks"
              value={searchValue}
            />
            <SearchIcon className={classes.searchIcon} />
          </div>
          <Popper
            anchorEl={searchRef.current}
            className={classes.searchPopper}
            open={openSearchPopover}
            transition
          >
            <ClickAwayListener onClickAway={handleSearchPopverClose}>
              <Paper
                className={classes.searchPopperContent}
                elevation={3}
              >
                <List>
                  {popularSearches.map(search => (
                    <ListItem
                      button
                      key={search}
                      onClick={handleSearchPopverClose}
                    >
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary={search} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
          <Button
            className={classes.sortButton}
            onClick={handleSortOpen}
            ref={sortRef}
          >
            {selectedSort}
            <ArrowDropDownIcon />
          </Button>
          <ToggleButtonGroup
            exclusive
            onChange={handleModeChange}
            size="small"
            value={mode}
          >
            <ToggleButton value="grid">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <div className={classes.trackData}>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchMoreData}
          hasMore={hasMoreItems}
          loader={loader}
        >
          <Grid
            container
            spacing={2}
          >
            {tracks.map((track, i) => (
              <Grid
                item
                key={track.id}
                xl={mode === 'grid' ? 3 : 12}
                lg={mode === 'grid' ? 4 : 12}
                md={mode === 'grid' ? 6 : 12}
                sm={12}
                xs={12}
              >
                <GridCard key={track.id} track={track} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </div>

      <Menu
        anchorEl={sortRef.current}
        className={classes.menu}
        onClose={handleSortClose}
        open={openSort}
      >
        {sortOptions.map(
          option => (
            <MenuItem
              className={classes.menuItem}
              key={option}
              onClick={() => handleSortSelect(option)}
            >
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
};

Tracks.propTypes = {
  className: PropTypes.string,
  tracks: PropTypes.array.isRequired,
  hasMoreItems: PropTypes.bool.isRequired,
  fetchTracks: PropTypes.func.isRequired,
  clearTracks: PropTypes.func.isRequired,
  nextHref: PropTypes.string,
};

const mapStateToProps = (state) => ({
  tracks: state.data.tracks,
  nextHref: state.data.nextHref,
  hasMoreItems: state.data.hasMoreItems
});

const mapActionsToProps = {
  fetchTracks,
  clearTracks
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Tracks);
