import React from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

exports.connectionButtons = (
    classes, 
    handleAddConnection, 
    handleWithdrawRequest,
    handleAcceptRequest,
    handleDisconnect
  ) => {

  const buttonAddConnection = (
    <Button
      className={classes.addButton}
      color="primary"
      onClick={handleAddConnection}
      variant="outlined"
    >
      <PersonAddIcon className={classes.personAddIcon}/>
      Add
    </Button>
  );

  const buttonPendingConnection = (
    <Button
      className={classes.pendingButton}
      onClick={handleWithdrawRequest}
      variant="outlined"
    >
      <PersonAddIcon className={classes.personAddIcon}/>
      Pending
    </Button>
  );

  const buttonAcceptRequest = (
    <Button
      variant="outlined"
      color="primary"
      className={classes.acceptButton}
      onClick={handleAcceptRequest}
    >
      <PersonAddIcon className={classes.personAddIcon}/>
      Accept
    </Button>
  );

  const buttonConnected = (
    <Button
      variant="outlined"
      color="primary"
      className={classes.connectedButton}
      onClick={handleAcceptRequest}
    >
      <PersonAddIcon className={classes.personAddIcon}/>
      Connected
    </Button>
  );

  const buttonDisconnect = (
    <Button
      variant="outlined"
      color="primary"
      className={classes.disconnectButton}
      onClick={handleDisconnect}
    >
      <PersonAddIcon className={classes.personAddIcon}/>
      Disconnect
    </Button>
  );

  return {
    buttonAddConnection,
    buttonPendingConnection,
    buttonAcceptRequest,
    buttonConnected,
    buttonDisconnect
  }
}


exports.handleImageChange = (event) => {
  const image = event.target.files[0];
  const formData = new FormData();
  formData.append('image', image, image.name);
};

exports.handleEditPicture = (document) => {
  const fileInput = document.getElementById('imageInput');
  fileInput.click();
};