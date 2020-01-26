import { colors } from '@material-ui/core';

const AuthTheme = (theme) => ({
  root: {
    width: theme.breakpoints.values.sm,
    margin: '0 auto',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  },
  textFields: {
    margin: 10
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column'
  },
  flexGrow: {
    flexGrow: 1
  },
  saveButton: {
    color: '#fff',
    margin: 10,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  form: {
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '20px auto 20px auto'
  },
  button: {
    margin: 30
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem'
  },
  progress: {
    margin: theme.spacing(2),
  }
});

export default AuthTheme;