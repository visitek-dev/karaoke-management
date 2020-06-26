import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

const statusOption = [
  { title: "Available", value: "available" },
  { title: "Unavailable", value: "notAvailable" },
];

export default function RoomEditModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);

  const [formData, setFormData] = useState({
    roomId: "a",
    price: "1",
    status: "available",
  });

  const { roomId, price } = formData;

  useEffect(() => {
    if (rooms.error && typeof rooms.error === "string") {
      setErrorOpen(true);
      setErrorMessage(rooms.error);
    } else {
      handleClose();
      setErrorOpen(false);
    }
  }, [rooms.error]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    dispatch(roomActions.getById(props.id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    dispatch(roomActions.update(props.id, formData));
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  useEffect(() => {
    setFormData({ ...rooms.item });
  }, [rooms.item]);

  const statusToIndex = (status) => {
    switch (status) {
      case "available":
        return 0;
      case "notAvailable":
        return 1;
      default:
        return 0;
    }
  };

  const handleStatusSelected = (value) => {
    if (value) {
      setFormData({ ...formData, status: value.value });
    }
  };

  return (
    <div>
      <Tooltip title="Modify">
        <IconButton aria-label="modify" onClick={handleOpen}>
          <CreateIcon />
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
            {formData && (
              <Container maxWidth="md" className={classes.container}>
                <Typography variant="h4" gutterBottom>
                  Room edit
                </Typography>
                {/* Error warning */}
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
                {/* Content */}
                <TextField
                  fullWidth
                  style={{ marginTop: "10px" }}
                  label="Room ID"
                  id="outlined-id"
                  variant="outlined"
                  name="roomId"
                  value={roomId || ""}
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
                  value={price || ""}
                  onChange={(e) => onChange(e)}
                  onKeyPress={(e) => keyPressed(e)}
                />
                <Autocomplete
                  style={{ marginTop: "10px" }}
                  options={statusOption}
                  onChange={(e, value) => handleStatusSelected(value)}
                  value={
                    rooms.item
                      ? statusOption[statusToIndex(rooms.item.status)]
                      : ""
                  }
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" variant="outlined" />
                  )}
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
                      Update
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
