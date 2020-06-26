import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "../components/CustomDrawer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useDispatch, useSelector } from "react-redux";
import { roomActions, productActions, receiptActions } from "../actions";

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
  marginBox: {
    margin: theme.spacing(2),
  },
  checkInDate: {
    color: theme.palette.warning.main,
  },
  checkOutDate: {
    color: theme.palette.success.main,
  },
}));

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

function subtotal(items) {
  return items
    .map(({ price, quantity }) => price * quantity)
    .reduce((sum, i) => sum + i, 0);
}

export default function ReceiptDetail(props) {
  const classes = useStyles();
  const rooms = useSelector((state) => state.rooms);
  const products = useSelector((state) => state.products);
  const receipts = useSelector((state) => state.receipts);
  const dispatch = useDispatch();

  const [productsInReceipt, setProductsInReceipt] = useState([]);

  useEffect(() => {
    setProductsInReceipt(
      receipts.item && products.items
        ? receipts.item.products.map((element) =>
            Object.assign(
              products.items.find((x) => x.id === element.productId) || {},
              { quantity: element.quantity }
            )
          )
        : []
    );
  }, [receipts.item, products.items]);

  useEffect(() => {}, [receipts.item]);

  useEffect(() => {
    dispatch(roomActions.getAllNonPagination());
    dispatch(productActions.getAllNonPagination());
    dispatch(receiptActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            {receipts.item && rooms.items && products.items ? (
              <React.Fragment>
                <Typography variant="h4" gutterBottom>
                  Receipt Detail ID #{receipts.item.id}
                </Typography>

                <Typography variant="h5" gutterBottom>
                  Room ID:{" "}
                  {(rooms.items.find((x) => x.id === receipts.item.room) || {})
                    .roomId || null}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      Check-in Time: {dateFormat(receipts.item.checkInDate)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      Check-out Time:{" "}
                      {receipts.item.status === "checkedOut"
                        ? dateFormat(receipts.item.checkOutDate)
                        : null}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom>
                  Total hours:{" "}
                  <strong>
                    {Math.floor(
                      Math.abs(
                        new Date(receipts.item.checkOutDate) -
                          new Date(receipts.item.checkInDate)
                      ) / 3600000
                    )}{" "}
                    hours{" "}
                    {Math.floor(
                      (Math.abs(
                        new Date(receipts.item.checkOutDate) -
                          new Date(receipts.item.checkInDate)
                      ) /
                        3600000 -
                        Math.floor(
                          Math.abs(
                            new Date(receipts.item.checkOutDate) -
                              new Date(receipts.item.checkInDate)
                          ) / 3600000
                        )) *
                        60
                    )}{" "}
                    mins
                  </strong>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Number of products used: {receipts.item.products.length}
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                  BILL
                </Typography>
                {productsInReceipt.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product name </TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Sum</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productsInReceipt.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {product.productName}
                            </TableCell>
                            <TableCell align="right">
                              {product.quantity}
                            </TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                            <TableCell align="right">
                              {product.price * product.quantity}
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={3} />
                          <TableCell colSpan={2}>Subtotal products</TableCell>
                          <TableCell align="right">
                            {subtotal(productsInReceipt)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Subtotal room price</TableCell>
                          <TableCell align="right">
                            {receipts.item.price}$ per hour
                          </TableCell>
                          <TableCell align="right">
                            {receipts.item.total - subtotal(productsInReceipt)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell align="right">
                            {receipts.item.total}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Room</TableCell>
                          <TableCell align="right">Price per hour</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={receipts.item._id}>
                          <TableCell component="th" scope="row">
                            {(
                              rooms.items.find(
                                (x) => x.id === receipts.item.room
                              ) || {}
                            ).roomId || receipts.item.room}
                          </TableCell>
                          <TableCell align="right">
                            {receipts.item.price}
                          </TableCell>
                          <TableCell align="right">
                            {receipts.item.total}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </React.Fragment>
            ) : null}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
