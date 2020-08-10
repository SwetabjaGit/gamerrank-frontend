import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
const red = colors.red[600];
const blue = '#2076e6'

const twitterGreen = '#16AC59';
const twitterYellow = '#E69C1C';
const twitterViolet = '#794BC4';
const twitterSkyblue = '#1991DA';
const twitterPink = '#CA2056';
const twitterOrange = '#DC5520';
const twitterNavyblue = '#1e6bb8'

const muiSuccess = '#4CAF50';
const muiInfo = '#2196F3';
const muiWarning = '#FB9701';
const muiDanger = '#F44336';


export default {
  black,
  white,
  red,
  blue,
  twitterGreen,
  twitterYellow,
  twitterViolet,
  twitterSkyblue,
  twitterPink,
  twitterOrange,
  twitterNavyblue,
  muiSuccess,
  muiInfo,
  muiWarning,
  muiDanger,
  primary: {
    contrastText: white,
    dark: twitterGreen,
    main: twitterGreen,
    light: twitterGreen
  },
  secondary: {
    contrastText: white,
    dark: twitterYellow,
    main: twitterYellow,
    light: twitterYellow
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#F4F6F8',
    paper: white
  },
  divider: colors.grey[200]
};
