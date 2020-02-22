import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  appBar: {
    padding: 10,
  },
  title: {
    flexGrow: 1,
  },
});

const AppHeader = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static">
      <Typography variant="h6" className={classes.title}>
        Crypto app
      </Typography>
    </AppBar>
  );
};

export default AppHeader;
