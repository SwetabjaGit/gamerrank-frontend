import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Chip,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Input,
  Paper,
  Tooltip
} from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CancelIcon from "@material-ui/icons/Cancel";
//import AttachFileIcon from '@material-ui/icons/AttachFile';
//import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// Components
import ModalButton from "./AddArticleModal";

//Redux Stuff
import { connect } from 'react-redux';
import { postArticle } from '../redux/actions/screams';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
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
    borderRadius: 20,
    marginTop: 10,
    margin: "0 auto",
    minWidth: "85%",
    height: 370
  },
  cancelIcon: {
    background: "#fff"
  },
  divider: {
    width: 1,
    height: 24
  },
  fillVoid: {
    flexGrow: 1
  },
  fileInput: {
    display: "none"
  },
  postButton: {
    padding: 22
  }
}));

const AddArticle = (props) => {

  const { className, currentUser, userImage } = props;

  const classes = useStyles();
  const fileInputRef = useRef(null);
  const [value, setValue] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [chips, setChips] = useState(["android", "ios", "react"]);
  const [newArticle, setNewArticle] = useState({});


  const handleContentChange = (event) => {
    event.persist();
    setValue(event.target.value);
    setNewArticle({
      ...newArticle,
      body: event.target.value
    });
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const imageFileName = URL.createObjectURL(event.target.files[0]);
    setImageFile(image);
    setPostImage(imageFileName);
    setNewArticle({
      ...newArticle,
      localImage: imageFileName
    });
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    formData.set('body', value);
    formData.set('tagList', chips);
    formData.set('localImage', postImage);
    props.postArticle(formData);
    resetValuesAfterSubmit();
  };

  const resetValuesAfterSubmit = () => {
    setValue("");
    setChips(['default']);
    setPostImage(null);
  };

  const removeImage = () => {
    setPostImage(null);
  };


  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
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
              placeholder={`What's on your mind?`}
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

        {value.length > 0 && (
          <ModalButton
            currentUser={currentUser}
            userImage={userImage}
            chips={chips}
            setChips={setChips}
            newArticle={newArticle}
            setNewArticle={setNewArticle}
            value={value}
            setValue={setValue}
            postImage={postImage}
            setPostImage={setPostImage}
            handleContentChange={handleContentChange}
            handleImageChange={handleImageChange}
            handleAttach={handleAttach}
            handleSubmit={handleSubmit}
            removeImage={removeImage}
          />
        )}

        <Chip
          className={classes.postButton}
          label="POST"
          color={value.length > 0 ? "secondary" : "default"}
          onClick={handleSubmit}
        />
      </CardContent>
    </Card>
  );
};

AddArticle.propTypes = {
  className: PropTypes.string,
  postArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
  postArticle
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddArticle);
