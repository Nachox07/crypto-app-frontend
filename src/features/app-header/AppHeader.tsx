import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  appBar: {
    padding: 10,
    cursor: "pointer",
  },
  title: {
    flexGrow: 1,
  },
});

const AppHeader = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      onClick={() => history.push("/")}
    >
      <Typography variant="h6" className={classes.title}>
        Crypto app
      </Typography>
    </AppBar>
  );
};

export default AppHeader;
