import React, { useEffect } from "react";
import { lighten, makeStyles, fade } from "@material-ui/core/styles";
import CustomDrawer from "../components/CustomDrawer";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../actions";
import { history } from "../store";

import PropTypes from "prop-types";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import Skeleton from "@material-ui/lab/Skeleton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import Pagination from "@material-ui/lab/Pagination";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "User name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "salary",
    numeric: false,
    disablePadding: true,
    label: "Wage",
  },
  {
    id: "monthly_salary",
    numeric: false,
    disablePadding: true,
    label: "Salary",
  },
  {
    id: "createAt",
    numeric: false,
    disablePadding: true,
    label: "Create At",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const users = useSelector((state) => state.users);

  let filterHeadCells;

  if (!users.user.is_staff)
    filterHeadCells = [
      ...headCells.filter(
        (headCell) =>
          headCell.id !== "salary" && headCell.id !== "monthly_salary"
      ),
    ];
  else filterHeadCells = [...headCells];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all " }}
          />
        </TableCell>

        <React.Fragment>
          {filterHeadCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </React.Fragment>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selectedIndex } = props;

  const users = useSelector((state) => state.users);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(userActions.delete(id));
    props.setSelectedIndex([]);
    handleDeleteClose();
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return (
    <React.Fragment>
      {/* Delete dialog */}
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description1"
            variant="body1"
            color="error"
          >
            Delete this will also delete all SCHEDULES related to this user.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description2">
            Delete {numSelected} item(s)?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="secondary">
            Disagree
          </Button>
          <Button
            onClick={() => onDelete(selectedIndex)}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* Toolbar */}

      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Users
          </Typography>
        )}

        {numSelected > 0 ? (
          <React.Fragment>
            {users.user.is_staff ? (
              <Grid container direction="row" justify="flex-end" spacing={1}>
                {numSelected < 2 ? (
                  <Grid item>
                    <Tooltip title="Modify">
                      <IconButton
                        component={Link}
                        to={"/users-edit/" + selectedIndex[0]}
                        aria-label="modify"
                      >
                        <CreateIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                ) : null}
                <Grid item>
                  <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={handleDeleteOpen}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ) : null}
          </React.Fragment>
        ) : (
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  value={props.searchTerm}
                  onChange={props.searchAction}
                  onKeyPress={props.keyPressed}
                />
              </div>
            </Grid>
            <Grid item>
              {users.user.is_staff ? (
                <Tooltip title="Add new">
                  <IconButton component={Link} to="/users-add">
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </React.Fragment>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

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
}));

const sortOption = [
  { title: "Create Asc", value: "created_at" },
  { title: "Create Desc", value: "-created_at" },
  { title: "Username Asc", value: "username" },
  { title: "Username Desc", value: "-username" },
  { title: "Wage Asc", value: "salary" },
  { title: "Wage Desc", value: "-salary" },
  { title: "Salary Asc", value: "monthly_salary" },
  { title: "Salary Desc", value: "-monthly_salary" },
];

export default function Users(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);

  const [pageValue, setPageValue] = React.useState(1);
  const [pageValueText, setPageValueText] = React.useState(1);

  const [sortSelected, setSortSelected] = React.useState(1);

  const [searchTerm, setSearchTerm] = React.useState("");

  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertMessage, setOpenAlertMessage] = React.useState("");

  const users = useSelector((state) => state.users);
  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getMe());
    dispatch(userActions.getAll());
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
  }, [dispatch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.items.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const emptyRows = 0;

  const handleSortSelected = (value) => {
    if (value) {
      dispatch(
        userActions.getAll(
          `/api/users/?page=${pageValue}&ordering=${value.value}&search=${searchTerm}`
        )
      );
      setSortSelected(sortOption.indexOf(value));
    }
  };

  const onChange = (e) => {
    setPageValueText(parseInt(e.target.value));
  };

  const handlePageChange = (event, value) => {
    dispatch(
      userActions.getAll(
        `/api/users/?page=${value}&ordering=${sortOption[sortSelected].value}&search=${searchTerm}`
      )
    );
    setPageValue(value);
  };

  const keyPressed = (e) => {
    if (e.key === "Enter")
      if (pageValueText < users.maxPage + 1 && pageValueText > 0) {
        handlePageChange(e, pageValueText);
      }
  };

  const keyPressedSearch = (e) => {
    if (e.key === "Enter")
      dispatch(
        userActions.getAll(
          `api/users?page=${1}&ordering=${
            sortOption[sortSelected].value
          }&search=${searchTerm}`
        )
      );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <React.Fragment>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {openAlertMessage}
        </Alert>
      </Snackbar>

      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.mainContainer}>
            <React.Fragment>
              {users.loading ? (
                <React.Fragment>
                  <LinearProgress className={classes.linearLoading} />
                  <Skeleton variant="rect" width={"100%"} height={50} />
                </React.Fragment>
              ) : (
                <EnhancedTableToolbar
                  numSelected={selected.length}
                  selectedIndex={selected}
                  setSelectedIndex={setSelected}
                  searchTerm={searchTerm}
                  searchAction={(e) => handleChange(e)}
                  keyPressed={keyPressedSearch}
                />
              )}
              <TableContainer className={classes.tableContainer}>
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                >
                  {users.loading ? (
                    <Skeleton
                      component={"thead"}
                      variant="rect"
                      width={"100%"}
                      height={40}
                      style={{ marginTop: "10px" }}
                    />
                  ) : (
                    <EnhancedTableHead
                      classes={classes}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={users.items.length}
                    />
                  )}
                  {users.loading ? (
                    <Skeleton
                      component={"tbody"}
                      variant="rect"
                      width={"100%"}
                      height={100}
                      style={{ marginTop: "10px" }}
                    />
                  ) : (
                    <TableBody>
                      {stableSort(
                        users.items,
                        getComparator(order, orderBy)
                      ).map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            className={classes.tableRow}
                            onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell className={classes.tableCell}>
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              className={classes.tableCell}
                            >
                              {row.username}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              scope="row"
                              padding="none"
                            >
                              {row.email}
                            </TableCell>
                            {users.user.is_staff ? (
                              <React.Fragment>
                                <TableCell
                                  className={classes.tableCell}
                                  scope="row"
                                  padding="none"
                                >
                                  {row.salary}
                                </TableCell>
                                <TableCell
                                  className={classes.tableCell}
                                  scope="row"
                                  padding="none"
                                >
                                  {row.monthly_salary}
                                </TableCell>
                              </React.Fragment>
                            ) : null}
                            <TableCell
                              className={classes.tableCell}
                              scope="row"
                              padding="none"
                            >
                              {dateFormat(row.created_at)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              {users.loading ? (
                <Skeleton
                  variant="rect"
                  width={400}
                  height={50}
                  style={{ marginLeft: "auto", marginTop: "10px" }}
                />
              ) : (
                <Grid
                  container
                  direction="column"
                  alignItems="flex-end"
                  spacing={2}
                >
                  <Grid
                    item
                    container
                    style={{ marginTop: "10px" }}
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item>
                      <Pagination
                        color="primary"
                        count={users.maxPage}
                        page={pageValue}
                        onChange={handlePageChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        style={{ width: "100px" }}
                        label="page"
                        id="outlined-page"
                        variant="outlined"
                        type="number"
                        onChange={(e) => onChange(e)}
                        onKeyPress={(e, value) => keyPressed(e, value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Autocomplete
                      id="sort-cb"
                      className={classes.marginBox}
                      options={sortOption}
                      value={sortOption[sortSelected]}
                      getOptionLabel={(options) => options.title}
                      onChange={(e, value) => handleSortSelected(value)}
                      style={{ width: "300px" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Sort"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              )}
            </React.Fragment>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
