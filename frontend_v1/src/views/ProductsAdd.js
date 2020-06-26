import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "../components/CustomDrawer";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { productActions } from "../actions";

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
  alertContainer: {
    margin: theme.spacing(1),
  },
}));

export default function ProductAdd(props) {
  const classes = useStyles();

  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    sku: "",
    productName: "",
    price: 1,
    stock: 1,
  });
  const { sku, productName, price, stock } = formData;

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (products.error && typeof products.error === "string") {
      setErrorOpen(true);
      setErrorMessage(products.error);
    }
  }, [products.error]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    dispatch(productActions.add(formData));
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Add new product
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

            <Grid container direction="row" spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="SKU"
                  id="outlined-sku"
                  variant="outlined"
                  name="sku"
                  value={sku}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  id="outlined-product-name"
                  variant="outlined"
                  name="productName"
                  value={productName}
                  onChange={(e) => onChange(e)}
                />
              </Grid>

              <Grid item sm={12}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-price">
                    Price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-price"
                    name="price"
                    value={price}
                    onChange={(e) => onChange(e)}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    labelWidth={40}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Stock"
                  id="outlined-stock"
                  variant="outlined"
                  name="stock"
                  value={stock}
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item container justify="center" spacing={5}>
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
                  <Button component={Link} to="/products" variant="contained">
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
