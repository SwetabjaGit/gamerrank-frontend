import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
const danger = colors.red[600];
const primary = '#16AC59';
const secondary = '#E69C1C';
const tertiary = '#794BC4';
const fourthColor = '#1991DA';
const fifthColor = '#CA2056';
const sixthColor = '#DC5520';


export default {
  black,
  white,
  danger,
  primary: {
    contrastText: white,
    dark: primary,
    main: primary,
    light: primary
  },
  secondary: {
    contrastText: white,
    dark: secondary,
    main: secondary,
    light: secondary
  },
  tertiary: {
    contrastText: white,
    dark: tertiary,
    main: tertiary,
    light: tertiary
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
