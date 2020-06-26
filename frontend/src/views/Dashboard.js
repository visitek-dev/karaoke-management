import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  roomActions,
  receiptActions,
  productActions,
  userActions,
} from "../actions";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Chart from "../components/Chart.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../components/Title.js";
import CustomDrawer from "../components/CustomDrawer";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import { history } from "../store";

function dateFormat(date) {
  return new Intl.DateTimeFormat("en-GB", {
    second: "numeric",
    minute: "numeric",
    hour: "numeric",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(6),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    paddingRight: "70px",
    height: 300,
  },
  seeMore: {
    marginTop: theme.spacing(3),
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
  depositContext: {
    flex: 1,
  },
  linearLoading: {
    marginTop: theme.spacing(1),
    color: theme.palette.primary.main,
    height: 10,
  },

  totalPaper: {
    "& a": {
      color: theme.palette.success.main,
      textDecoration: "none",
      "&:hover": {
        color: theme.palette.text.primary,
      },
    },
    marginBottom: theme.spacing(1),
    "&:hover": { backgroundColor: theme.palette.success.main },
  },
  roomPaper: {
    "& a": {
      color: theme.palette.info.main,
      textDecoration: "none",
      "&:hover": {
        color: theme.palette.text.primary,
      },
    },
    marginBottom: theme.spacing(1),
    "&:hover": { backgroundColor: theme.palette.info.main },
  },
  productPaper: {
    "& a": {
      color: theme.palette.warning.main,
      textDecoration: "none",
      "&:hover": {
        color: theme.palette.text.primary,
      },
    },
    marginBottom: theme.spacing(1),
    "&:hover": { backgroundColor: theme.palette.warning.main },
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [open, setOpen] = React.useState(false);

  let total = 0;

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const receipts = useSelector((state) => state.receipts);
  const rooms = useSelector((state) => state.rooms);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (history.location.state === 200) setOpen(true);
  }, []);

  useEffect(() => {
    dispatch(userActions.getAllNonPagination());
    dispatch(roomActions.getAllNonPagination());
    dispatch(productActions.getAllNonPagination());
    dispatch(receiptActions.getAllNonPagination());
  }, [dispatch]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  if (receipts.items)
    receipts.items
      .filter(
        (x) => new Date(x.checkOutDate).getDate() === new Date().getDate()
      )

      .forEach((element) => (total += element.total));

  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Login successful!
        </Alert>
      </Snackbar>
      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {!receipts.loading &&
          !rooms.loading &&
          !products.loading &&
          !users.loading ? (
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Chart />
                  </Paper>
                </Grid>
                {/* Statictis*/}
                <Grid item xs={12} md={4} lg={3}>
                  {rooms.items && products.items && users.items ? (
                    <React.Fragment>
                      <Paper className={classes.totalPaper}>
                        <Link to="/users">
                          <Typography component="p" variant="h3" align="center">
                            {users.items.length}
                          </Typography>
                          <Typography component="p" variant="h6" align="center">
                            Users
                          </Typography>
                        </Link>
                      </Paper>

                      <Paper className={classes.roomPaper}>
                        <Link to="/rooms">
                          <Typography component="p" variant="h3" align="center">
                            {rooms.items.length}
                          </Typography>
                          <Typography component="p" variant="h6" align="center">
                            Rooms
                          </Typography>
                        </Link>
                      </Paper>

                      <Paper className={classes.productPaper}>
                        <Link to="/products">
                          <Typography component="p" variant="h3" align="center">
                            {products.items.length}
                          </Typography>
                          <Typography component="p" variant="h6" align="center">
                            Products
                          </Typography>
                        </Link>
                      </Paper>

                      <Typography
                        color="textSecondary"
                        className={classes.depositContext}
                      >
                        on {new Date().getDate()}/{new Date().getMonth() + 1}/
                        {new Date().getFullYear()}
                      </Typography>
                    </React.Fragment>
                  ) : null}
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    {receipts.items ? (
                      <React.Fragment>
                        <Title>Recent Receipts</Title>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Room</TableCell>
                              <TableCell>Check In</TableCell>
                              <TableCell>Check Out</TableCell>
                              <TableCell>Total</TableCell>
                              <TableCell>Create At</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {receipts.items.slice(0, 5).map((row) => (
                              <TableRow hover key={row.id}>
                                <TableCell component="th" scope="row">
                                  {rooms.items && rooms.maxPage === 1
                                    ? rooms.items.find((x) => x.id === row.room)
                                        .roomId
                                    : row.room}
                                </TableCell>
                                <TableCell scope="row">
                                  {dateFormat(row.checkInDate)}
                                </TableCell>
                                <TableCell scope="row">
                                  {dateFormat(row.checkOutDate)}
                                </TableCell>
                                <TableCell scope="row">
                                  {Number(row.total).toFixed(2)}
                                </TableCell>
                                <TableCell scope="row">
                                  {dateFormat(row.checkOutDate)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <div className={classes.seeMore}>
                          <Link to="/receipts">See more receipts</Link>
                        </div>
                      </React.Fragment>
                    ) : null}
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          ) : (
            <React.Fragment>
              <LinearProgress className={classes.linearLoading} />
              <Grid
                container
                direction="row"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item xs={8}>
                  <Skeleton height={300}></Skeleton>
                </Grid>
                <Grid item xs={4}>
                  <Skeleton height={300}></Skeleton>
                </Grid>
              </Grid>

              <Skeleton height={300}></Skeleton>
            </React.Fragment>
          )}
        </main>
      </div>
    </React.Fragment>
  );
}
