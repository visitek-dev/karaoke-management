import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CustomDrawer from "../components/CustomDrawer";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import { useDispatch, useSelector } from "react-redux";
import { userActions, scheduleActions } from "../actions";

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
  marginBox: {
    margin: theme.spacing(2),
  },
}));

const weekdaysOption = [
  { title: "Monday", value: "monday" },
  { title: "Tuesday", value: "tuesday" },
  { title: "Wednesday", value: "wednesday" },
  { title: "Thursday", value: "thursday" },
  { title: "Friday", value: "friday" },
  { title: "Saturday", value: "saturday" },
  { title: "Sunday", value: "sunday" },
];

const workingTimeOption = [
  { title: "Morning", value: "morning" },
  { title: "Afternoon", value: "afternoon" },
  { title: "Evening", value: "evening" },
];

export default function ScheduleAdd(props) {
  const classes = useStyles();

  //   const [image, setImage] = React.useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const schedules = useSelector((state) => state.schedules);

  const [formData, setFormData] = React.useState({
    weekDay: null,
    workingTime: null,
    staff: null,
  });

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    dispatch(userActions.getAllNonPagination());
  }, [dispatch]);

  useEffect(() => {
    if (schedules.error && typeof schedules.error === "string") {
      setErrorOpen(true);
      setErrorMessage(schedules.error);
    }
  }, [schedules.error]);

  const handleWeekdaySelected = (value) => {
    if (value) {
      setFormData({ ...formData, weekDay: value.value });
    }
  };

  const handleWorkingtimeSelected = (value) => {
    if (value) {
      setFormData({ ...formData, workingTime: value.value });
    }
  };

  const handleUserSelected = (value) => {
    if (value) {
      setFormData({ ...formData, staff: value.id });
    }
  };

  const onSubmit = () => {
    dispatch(scheduleActions.add(formData));
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Add new Schedule
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
            <Autocomplete
              id="weekDay-cb"
              className={classes.marginBox}
              options={weekdaysOption}
              getOptionLabel={(options) => options.title}
              onChange={(e, value) => handleWeekdaySelected(value)}
              renderInput={(params) => (
                <TextField {...params} label="Day of week" variant="outlined" />
              )}
            />

            <Autocomplete
              id="workingTime-cb"
              className={classes.marginBox}
              options={workingTimeOption}
              getOptionLabel={(options) => options.title}
              onChange={(e, value) => handleWorkingtimeSelected(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Working Time"
                  variant="outlined"
                />
              )}
            />

            <Autocomplete
              className={classes.marginBox}
              options={users.items}
              onChange={(e, value) => handleUserSelected(value)}
              getOptionLabel={(option) => option.username}
              renderInput={(params) => (
                <TextField {...params} label="User" variant="outlined" />
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
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/schedules" variant="contained">
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
