import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link className={classes.link} to="https://material-ui.com/">
        Visitek
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    width: "30vw",
  },
  typography: {
    textAlign: "center",
  },
  link: {
    color: theme.palette.primary.main,
    textAlign: "center",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.img} src="/codercat.jpg" alt="Codercat" />

        <Typography className={classes.typography} variant="h3">
          Oops! Look like you got lost{" "}
        </Typography>
        <Typography className={classes.typography} variant="h6">
          Try these following links :)
        </Typography>
        <Typography
          component={Link}
          className={classes.link}
          variant="h6"
          to="/users"
        >
          /users
        </Typography>
        <Typography
          component={Link}
          className={classes.link}
          variant="h6"
          to="/schedules"
        >
          /schedules
        </Typography>
        <Typography
          component={Link}
          className={classes.link}
          variant="h6"
          to="/rooms"
        >
          /rooms
        </Typography>
        <Typography
          component={Link}
          className={classes.link}
          variant="h6"
          to="/products"
        >
          /products
        </Typography>
        <Typography
          component={Link}
          className={classes.link}
          variant="h6"
          to="/receipts"
        >
          /receipts
        </Typography>
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
