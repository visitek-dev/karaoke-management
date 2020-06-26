import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "../components/CustomDrawer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
import Skeleton from "@material-ui/lab/Skeleton";

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

export default function UserEdit(props) {
  const classes = useStyles();

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    username: "a",
    email: "b",
    salary: 1,
    is_staff: false,
  });

  const [newSchedules, setNewSchedules] = React.useState([]);

  const { username, email, salary, is_staff } = formData;

  useEffect(() => {
    if (users.error && typeof users.error === "string") {
      setErrorOpen(true);
      setErrorMessage(users.error);
    }
  }, [users.error]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    //console.log();
    dispatch(
      userActions.update(props.match.params.id, {
        ...formData,
        schedules: newSchedules,
      })
    );
  };

  const addNewSchedulesClick = () => {
    setNewSchedules((newSchedules) => [
      ...newSchedules,
      { weekDay: "monday", workingTime: "morning" },
    ]);
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  const handleWeekdaysSelected = (value, index) => {
    if (value) {
      setNewSchedules((state) => {
        let new_schedule = state;
        new_schedule[index].weekDay = value.value;

        return [...new_schedule];
      });
    }
  };

  const weekDayToIndex = (weekDay) => {
    switch (weekDay) {
      case "monday":
        return 0;
      case "tuesday":
        return 1;
      case "wednesday":
        return 2;
      case "thursday":
        return 3;
      case "friday":
        return 4;
      case "saturday":
        return 5;
      case "sunday":
        return 6;
      default:
        return 0;
    }
  };
  const workingTimeToIndex = (workingTime) => {
    switch (workingTime) {
      case "morning":
        return 0;
      case "afternoon":
        return 1;
      case "evening":
        return 2;
      default:
        return 0;
    }
  };

  const handleWorkingTimeSelected = (value, index) => {
    if (value) {
      setNewSchedules((state) => {
        let new_schedule = state;
        new_schedule[index].workingTime = value.value;

        return [...new_schedule];
      });
    }
  };

  const onDelete = (index) => {
    newSchedules.splice(index, 1);

    setNewSchedules([...newSchedules]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    dispatch(userActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    setFormData({ ...users.item });
    //setOnImageChange({ ...formData.image });

    if (users.item !== undefined && users.item !== null) {
      setNewSchedules([...users.item.schedules]);
    }
  }, [users.item]);

  useEffect(() => {
    if (typeof is_staff === "string") {
      if (is_staff === "False") setFormData(((f) => is_staff: false));
      else setFormData(((f) => is_staff: true));
    } else return;
  }, [is_staff]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {users.loading ? (
              <React.Fragment>
                <Grid
                  container
                  direction="row"
                  spacing={5}
                  style={{ marginTop: "45px" }}
                >
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                </Grid>

                <Grid style={{ marginTop: "30px" }} container>
                  <Grid item xs={12} container justify="center">
                    <Skeleton variant="rect" width={200} height={45} />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: "30px" }}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={5}
                  style={{ marginTop: "30px" }}
                  justify="center"
                >
                  <Grid item>
                    <Skeleton variant="rect" width={120} height={45} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rect" width={120} height={45} />
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {formData && (
                  <Container maxWidth="lg" className={classes.container}>
                    <Typography variant="h4" gutterBottom>
                      User edit
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
                      value={username || ""}
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
                      value={email || ""}
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                    <TextField
                      fullWidth
                      style={{ marginTop: "10px" }}
                      label="Salary"
                      id="outlined-salary"
                      variant="outlined"
                      name="salary"
                      type="number"
                      value={salary || 0}
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />

                    <FormGroup>
                      <FormControlLabel
                        className={classes.switch}
                        control={
                          <Switch
                            checked={formData.is_staff || false}
                            onChange={handleChange}
                            name="is_staff"
                          />
                        }
                        label="Admin"
                      />
                    </FormGroup>

                    {/* <Grid
                      style={{ marginTop: "10px" }}
                      container
                      justify="center"
                      spacing={5}
                    >
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={addNewSchedulesClick}
                        >
                          Add new Schedule
                        </Button>
                      </Grid>
                    </Grid>

                    <Grid container>
                      {newSchedules.length > 0 &&
                        newSchedules.map((schedule, index) => (
                          <Grid
                            key={index}
                            style={{ marginTop: "10px" }}
                            item
                            xs={12}
                            container
                            alignItems="center"
                            spacing={3}
                          >
                            <Grid item xs={6}>
                              <Autocomplete
                                options={weekdaysOption}
                                onChange={(e, value) =>
                                  handleWeekdaysSelected(
                                    value,
                                    newSchedules.indexOf(schedule)
                                  )
                                }
                                value={
                                  weekdaysOption[
                                    weekDayToIndex(schedule.weekDay)
                                  ]
                                }
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Weekdays"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={5}>
                              <Autocomplete
                                options={workingTimeOption}
                                onChange={(e, value) =>
                                  handleWorkingTimeSelected(
                                    value,
                                    newSchedules.indexOf(schedule)
                                  )
                                }
                                value={
                                  workingTimeOption[
                                    workingTimeToIndex(schedule.workingTime)
                                  ]
                                }
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Working Time"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={1}>
                              <Button
                                style={{ color: "#b51a02" }}
                                variant="text"
                                onClick={(e) =>
                                  onDelete(newSchedules.indexOf(schedule))
                                }
                              >
                                DEL
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                    </Grid> */}

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
                        <Button
                          component={Link}
                          to="/users"
                          variant="contained"
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Container>
                )}
              </React.Fragment>
            )}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
