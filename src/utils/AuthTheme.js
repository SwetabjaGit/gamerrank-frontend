module.exports = {
  AuthTheme: (theme) => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
      },
      dense: {
        marginTop: 19,
      },
      menu: {
        width: 200,
      },
      form: {
          textAlign: 'center'
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
  })
}