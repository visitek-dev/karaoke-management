import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "../components/CustomDrawer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  uploadRoot: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  gridList: {
    height: "60vh",
  },
  switch: {
    margin: "auto",
    marginTop: theme.spacing(2),
  },
}));

export default function UserAdd(props) {
  const classes = useStyles();
  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (users.error && typeof users.error === "string") {
      setErrorOpen(true);
      setErrorMessage(users.error);
    }
  }, [users.error]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    is_staff: false,
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const onSubmit = async () => {
    dispatch(userActions.add(formData));
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Add new User
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
              label="User name"
              id="outlined-name"
              variant="outlined"
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
              onKeyPress={(e) => keyPressed(e)}
            />
            <TextField
              fullWidth
              style={{ marginTop: "10px" }}
              label="User email"
              id="outlined-email"
              variant="outlined"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              onKeyPress={(e) => keyPressed(e)}
            />
            <TextField
              fullWidth
              style={{ marginTop: "10px" }}
              label="Password"
              id="outlined-password"
              variant="outlined"
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              onKeyPress={(e) => keyPressed(e)}
            />
            <FormGroup>
              <FormControlLabel
                className={classes.switch}
                control={
                  <Switch
                    checked={formData.is_staff}
                    onChange={handleChange}
                    name="is_staff"
                  />
                }
                label="Admin"
              />
            </FormGroup>
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
                <Button component={Link} to="/users" variant="contained">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
