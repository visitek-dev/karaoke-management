import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomDrawer from "../components/CustomDrawer";
import { useDispatch, useSelector } from "react-redux";
import {
  scheduleActions,
  userActions,
  weeklyScheduleActions,
} from "../actions";
import { history } from "../store";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Skeleton from "@material-ui/lab/Skeleton";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { DatePicker } from "@material-ui/pickers";
import Modal from "@material-ui/core/Modal";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
  mainContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 750,
  },
  tableContainer: {
    maxHeight: "60vh",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  img: {
    maxHeight: 50,
    maxWidth: 100,
  },
  linearLoading: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    height: 10,
  },
  tableRow: {
    "& .MuiTableCell-root": {
      padding: 0,
    },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.focus,
    },
  },
  chipRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  menuItem: {
    ".MuiSelect-root": {
      maxHeight: "100px",
    },
  },
  dateModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperDateModal: {
    width: 400,
    backgroundColor: theme.palette.background.paper,

    padding: theme.spacing(2, 4, 3),
  },
  alertContainer: {
    marginBottom: theme.spacing(1),
  },
}));

const weekDay = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const SelectProps = {
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: "30vh",
      },
    },
  },
};

export default function Schedules(props) {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertMessage, setOpenAlertMessage] = React.useState("");

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [dateModalOpen, setDateModalOpen] = React.useState(false);

  const [selectedDate, handleDateChange] = React.useState(new Date());

  const [selectedWeeklySchedule, setSelectedWeeklySchedule] = React.useState();

  const [validate, setValidate] = React.useState(true);

  const schedules = useSelector((state) => state.schedules);
  const users = useSelector((state) => state.users);
  const weeklySchedules = useSelector((state) => state.weeklySchedules);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAllNonPagination());
    dispatch(weeklyScheduleActions.getAllNonPagination());
  }, [dispatch]);

  useEffect(() => {
    if (weeklySchedules.items) {
      setSelectedWeeklySchedule(weeklySchedules.items[0]);
    }
  }, [weeklySchedules.items]);

  useEffect(() => {
    if (selectedWeeklySchedule) {
      dispatch(
        scheduleActions.getByWeeklyScheduleId(selectedWeeklySchedule.id)
      );
      var weeklyScheduleStart = new Date(selectedWeeklySchedule.start);
      var curr = new Date();
      var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));

      if (weeklyScheduleStart.getDate() < firstday.getDate())
        setValidate(false);
      else setValidate(true);
    }
  }, [selectedWeeklySchedule, dispatch]);

  useEffect(() => {
    switch (history.location.state) {
      case 201:
        setOpenAlert(true);
        setOpenAlertMessage("Add successful!");
        break;
      case 202:
        setOpenAlert(true);
        setOpenAlertMessage("Update successful!");
        break;
      case 203:
        setOpenAlert(true);
        setOpenAlertMessage("Delete successful!");
        break;
      default:
        break;
    }
  }, [schedules.items]);

  useEffect(() => {
    if (schedules.error && typeof schedules.error === "string") {
      setErrorOpen(true);
      setErrorMessage(schedules.error);
    }
  }, [schedules.error]);

  useEffect(() => {
    if (weeklySchedules.error && typeof weeklySchedules.error === "string") {
      setErrorOpen(true);
      setErrorMessage(weeklySchedules.error);
    }
  }, [weeklySchedules.error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleSelect = (e, dayOfWeek, workingTime, weeklyScheduleId) => {
    dispatch(
      scheduleActions.add({
        staff: e.target.value,
        weekDay: dayOfWeek,
        workingTime: workingTime,
        weeklySchedule: weeklyScheduleId,
      })
    );
  };

  const handleDelete = (chipToDelete) => () => {
    console.log(chipToDelete);
    dispatch(
      scheduleActions.delete([chipToDelete.id], chipToDelete.weeklySchedule)
    );
  };

  const handleDateModalOpen = () => {
    setDateModalOpen(true);
  };

  const handleDateModalClose = () => {
    setDateModalOpen(false);
  };

  useEffect(() => {
    console.log(users.user && users.user.is_staff);
  }, [users.user]);

  return (
    <React.Fragment>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {openAlertMessage}
        </Alert>
      </Snackbar>

      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.mainContainer}>
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

            {weeklySchedules.items ? (
              <React.Fragment>
                <Grid
                  container
                  justify="space-evenly"
                  alignItems="center"
                  style={{ marginBottom: 20 }}
                >
                  {/* Choose Weekly Schedule */}
                  <Grid item>
                    <Autocomplete
                      value={selectedWeeklySchedule || null}
                      onChange={(event, newValue) => {
                        setSelectedWeeklySchedule(newValue);
                      }}
                      options={weeklySchedules.items}
                      getOptionLabel={(option) => option.start}
                      style={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Weekly Schedules"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item>
                    {/* Modal add new Weekly Schedule */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDateModalOpen}
                    >
                      Add new Weekly Schedules
                    </Button>
                    <Modal
                      className={classes.dateModal}
                      open={dateModalOpen}
                      onClose={handleDateModalClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      <Paper className={classes.paperDateModal}>
                        <DatePicker
                          disableToolbar
                          disablePast
                          variant="inline"
                          label="Only calendar"
                          helperText="No year selection"
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                        <Button
                          variant="contained"
                          onClick={() => {
                            dispatch(
                              weeklyScheduleActions.add({
                                start: selectedDate.toISOString().slice(0, 10),
                              })
                            );
                          }}
                        >
                          Add
                        </Button>
                      </Paper>
                    </Modal>
                  </Grid>
                </Grid>
                {/* Table Schedule this week */}
                {schedules.items ? (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Shift</TableCell>
                          <TableCell>Monday</TableCell>
                          <TableCell>Tuesday</TableCell>
                          <TableCell>Wednesday</TableCell>
                          <TableCell>Thursday</TableCell>
                          <TableCell>Friday</TableCell>
                          <TableCell>Saturday</TableCell>
                          <TableCell>Sunday</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Morning
                          </TableCell>
                          {weekDay.map((dayOfWeek, index) => (
                            <TableCell key={index} align="right">
                              <Paper
                                component="ul"
                                className={classes.chipRoot}
                                elevation={0}
                              >
                                {schedules.items
                                  .filter(
                                    (schedule) =>
                                      schedule.weekDay === dayOfWeek &&
                                      schedule.workingTime === "morning"
                                  )
                                  .map((data, index) => {
                                    return (
                                      <li key={index}>
                                        <Chip
                                          label={
                                            (
                                              users.items.find(
                                                (x) => x.id === data.staff
                                              ) || {}
                                            ).username || null
                                          }
                                          onDelete={handleDelete(data)}
                                          className={classes.chip}
                                          disabled={
                                            (users.user &&
                                              !users.user.is_staff) ||
                                            !validate
                                          }
                                        />
                                      </li>
                                    );
                                  })}
                                <TextField
                                  select
                                  value={""}
                                  disabled={
                                    (users.user && !users.user.is_staff) ||
                                    !validate
                                  }
                                  onChange={(e) =>
                                    handleSelect(
                                      e,
                                      dayOfWeek,
                                      "morning",
                                      selectedWeeklySchedule.id
                                    )
                                  }
                                  SelectProps={SelectProps}
                                >
                                  {users.items.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.username}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Paper>
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Afternoon
                          </TableCell>
                          {weekDay.map((dayOfWeek, index) => (
                            <TableCell key={index} align="right">
                              <Paper
                                component="ul"
                                className={classes.chipRoot}
                                elevation={0}
                              >
                                {schedules.items
                                  .filter(
                                    (schedule) =>
                                      schedule.weekDay === dayOfWeek &&
                                      schedule.workingTime === "afternoon"
                                  )
                                  .map((data, index) => {
                                    return (
                                      <li key={index}>
                                        <Chip
                                          label={
                                            (
                                              users.items.find(
                                                (x) => x.id === data.staff
                                              ) || {}
                                            ).username || null
                                          }
                                          onDelete={handleDelete(data)}
                                          className={classes.chip}
                                          disabled={
                                            (users.user &&
                                              !users.user.is_staff) ||
                                            !validate
                                          }
                                        />
                                      </li>
                                    );
                                  })}{" "}
                                <TextField
                                  select
                                  value={""}
                                  disabled={
                                    (users.user && !users.user.is_staff) ||
                                    !validate
                                  }
                                  onChange={(e) =>
                                    handleSelect(
                                      e,
                                      dayOfWeek,
                                      "afternoon",
                                      selectedWeeklySchedule.id
                                    )
                                  }
                                  SelectProps={SelectProps}
                                >
                                  {users.items.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.username}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Paper>
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Evening
                          </TableCell>
                          {weekDay.map((dayOfWeek, index) => (
                            <TableCell key={index} align="right">
                              <Paper
                                component="ul"
                                className={classes.chipRoot}
                                elevation={0}
                              >
                                {schedules.items
                                  .filter(
                                    (schedule) =>
                                      schedule.weekDay === dayOfWeek &&
                                      schedule.workingTime === "evening"
                                  )
                                  .map((data, index) => {
                                    return (
                                      <li key={index}>
                                        <Chip
                                          label={
                                            (
                                              users.items.find(
                                                (x) => x.id === data.staff
                                              ) || {}
                                            ).username || null
                                          }
                                          onDelete={handleDelete(data)}
                                          className={classes.chip}
                                          disabled={
                                            (users.user &&
                                              !users.user.is_staff) ||
                                            !validate
                                          }
                                        />
                                      </li>
                                    );
                                  })}
                                <TextField
                                  select
                                  value={""}
                                  disabled={
                                    (users.user && !users.user.is_staff) ||
                                    !validate
                                  }
                                  onChange={(e) =>
                                    handleSelect(
                                      e,
                                      dayOfWeek,
                                      "evening",
                                      selectedWeeklySchedule.id
                                    )
                                  }
                                  SelectProps={SelectProps}
                                >
                                  {users.items.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.username}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Paper>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Skeleton variant="rect" width={"100vw"} height={300} />
                )}
              </React.Fragment>
            ) : (
              <Skeleton variant="rect" width={"100vw"} height={500} />
            )}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
