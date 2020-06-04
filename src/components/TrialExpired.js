import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import colors from '@material-ui/core/colors';
import LockIcon from '@material-ui/icons/LockOutlined';


const useStyles = makeStyles(theme => ({
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
}))

const TrialExpired = () => {

  const classes = useStyles();
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const handlePricingOpen = () => {
    setPricingModalOpen(true);
  };
  

  return (
    <Button
      className={classes.trialButton}
      onClick={handlePricingOpen}
      variant="contained"
    >
      <LockIcon className={classes.trialIcon} />
      Trial expired
    </Button>
  );
};

export default TrialExpired;