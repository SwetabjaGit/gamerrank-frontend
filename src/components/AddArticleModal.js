import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  IconButton,
  Tooltip,
  Card,
  CardContent,
  TextField,
  Chip,
  Modal,
  Avatar,
  CardMedia,
  Input,
  Paper
} from "@material-ui/core";

// MUI Icons
import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CancelIcon from "@material-ui/icons/Cancel";


const useStyles = makeStyles(theme => ({
  root: {
    width: "70%",
    margin: "0 auto",
    marginTop: 100
  },
  cardContent: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },

  postTop: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 20,
    margin: 5
  },
  avatar: {
    minWidth: 50,
    minHeight: 50
  },
  paper: {
    flexGrow: 1,
    padding: 10,
    marginRight: 15
  },
  input: {
    width: "100%",
    marginLeft: 10
  },
  imageView: {
    borderRadius: 30,
    marginTop: 10,
    margin: "0 auto",
    minWidth: "85%",
    height: 300
  },
  cancelIcon: {
    background: "#fff"
  },

  addTagBox: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  textFields: {
    width: 150,
    marginRight: 10
  },
  chips: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: 5
  },
  flexGrow: {
    flexGrow: 1
  },

  postBottom: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    margin: 5
  },
  fileInput: {
    display: "none"
  },
  fillVoid: {
    flexGrow: 1
  },
  postButton: {
    marginRight: 10,
    padding: 22
  }
}));


const NewArticleModal = props => {
  const {
    className,
    currentUser,
    userImage,
    chips,
    setChips,
    newArticle,
    setNewArticle,
    value,
    postImage,
    handleContentChange,
    handleImageChange,
    handleAttach,
    handlePost,
    removeImage
  } = props;

  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const fileInputRef = useRef(null);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputValue(event.target.value);
  };

  const handleInputKeyup = (event) => {
    event.persist();
    if (event.keyCode === 13 && inputValue) {
      if (!chips.includes(inputValue)) {
        inputValue.toLowerCase();
        setChips(chips => [...chips, inputValue]);
        setInputValue("");
        setNewArticle({
          ...newArticle,
          tagList: [...chips, inputValue]
        });
      }
    }
  };

  const handleChipDelete = chip => {
    setChips(chips => chips.filter(c => chip !== c));
    setNewArticle({
      ...newArticle,
      tagList: chips.filter(c => chip !== c)
    });
  };

  return (
    <div>
      <Tooltip title="Open Dialog">
        <IconButton onClick={handleClickOpen}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        keepMounted
        //TransitionComponent={Transition}
      >
        <Card className={clsx(classes.root, className)}>
          <CardContent className={classes.cardContent}>
            
            <div className={classes.postTop}>
              <Avatar
                className={classes.avatar}
                alt={currentUser}
                src={userImage}
              />
              <Paper className={classes.paper} elevation={0}>
                <Input
                  className={classes.input}
                  disableUnderline
                  onChange={handleContentChange}
                  placeholder={`Whats on your mind?`}
                  multiline
                  value={value}
                  rowsMax="2"
                />
              </Paper>
              {postImage && (
                <CardMedia
                  className={classes.imageView}
                  image={postImage}
                  title="Post Image"
                >
                  <IconButton onClick={removeImage} >
                    <CancelIcon
                      fontSize="large"
                      className={classes.cancelIcon}
                    />
                  </IconButton>
                </CardMedia>
              )}
            </div>

            <div className={classes.addTagBox}>
              <TextField
                className={classes.textFields}
                label="Tags"
                name="tags"
                required
                placeholder="Enter Tags"
                variant="outlined"
                margin="dense"
                onChange={handleInputChange}
                onKeyUp={handleInputKeyup}
                value={inputValue}
              />
              <div className={classes.chips}>
                {chips.map(chip => (
                  <Chip
                    className={classes.chip}
                    deleteIcon={<CloseIcon />}
                    key={chip}
                    label={chip}
                    onDelete={() => handleChipDelete(chip)}
                  />
                ))}
              </div>
            </div>

            <div className={classes.postBottom}>
              <Tooltip title="Photo/Video">
                <IconButton edge="end" onClick={handleAttach}>
                  <AddPhotoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Tag Friends">
                <IconButton edge="end" onClick={handleAttach}>
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Emojis">
                <IconButton color={value.length > 0 ? "secondary" : "default"}>
                  <EmojiEmotionsIcon />
                </IconButton>
              </Tooltip>
              <input
                accept="image/*"
                className={classes.fileInput}
                ref={fileInputRef}
                type="file"
                id="imageInput"
                onChange={handleImageChange}
              />
              <div className={classes.fillVoid} />
              <Chip
                className={classes.postButton}
                label="POST"
                color={value.length > 0 ? "secondary" : "default"}
                onClick={handlePost}
              />
            </div>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

NewArticleModal.propTypes = {
  className: PropTypes.string
};

export default NewArticleModal;
