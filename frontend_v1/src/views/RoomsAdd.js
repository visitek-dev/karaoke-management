import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  uploadRoot: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  img: {
    height: "100px",
    width: "100px",
  },
  gridList: {
    height: "60vh",
  },
}));

export default function RoomAddModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const rooms = useSelector((state) => state.rooms);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    roomId: "",
    price: "",
  });

  const { roomId, price } = formData;

  useEffect(() => {
    if (rooms.error && typeof rooms.error === "string") {
      setErrorOpen(true);
      setErrorMessage(rooms.error);
    } else handleClose();
  }, [rooms.error]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    dispatch(roomActions.add(formData));
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  return (
    <div>
      <Tooltip title="Add new">
        <IconButton aria-label="add-new" onClick={handleOpen}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container maxWidth="md" className={classes.container}>
              <Typography variant="h4" gutterBottom>
                Add new Room
              </Typography>

              <Collapse className={classes.alertContainer} in={errorOpen}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setErrorOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>Error</AlertTitle>
                  {errorMessage}
                </Alert>
              </Collapse>

              <TextField
                fullWidth
                style={{ marginTop: "10px" }}
                label="Room ID"
                id="outlined-id"
                variant="outlined"
                name="roomId"
                value={roomId}
                onChange={(e) => onChange(e)}
                onKeyPress={(e) => keyPressed(e)}
              />
              <TextField
                fullWidth
                style={{ marginTop: "10px" }}
                label="Price"
                id="outlined-price"
                variant="outlined"
                name="price"
                value={price}
                onChange={(e) => onChange(e)}
                onKeyPress={(e) => keyPressed(e)}
              />
              <Grid
                style={{ marginTop: "10px" }}
                container
                justify="center"
                spacing={5}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => onSubmit(e)}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
