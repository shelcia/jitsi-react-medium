import React, { useContext, useState } from "react";
import {
  Paper,
  makeStyles,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MeetContext } from "../context/MeetContext";
import MuiAlert from "@material-ui/lab/Alert";
import randomstring from "randomstring";

// Alert when the user hasn't filled up their name
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// stylings for the page
const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: "rgb(10, 25, 41)",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    colorScheme: "dark",
    flexDirection: "column",
  },
  card: {
    backgroundColor: "rgb(0, 30, 60)",
    colorScheme: "dark",
    border: "1px solid rgb(19, 47, 76)",
    color: "white",
    padding: "3rem",
  },
  input: {
    width: "350px",
  },
}));

const StartupPage = () => {
  const classes = useStyles();

  // we will be preferring dark theme for our page
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const history = useHistory();

  const [name, setName] = useContext(MeetContext);

  // state and handler function for the snackbar
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // generating random alphabetic string for our room
  const returnRoomName = () => {
    return randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });
  };

  return (
    <div className={classes.background}>
      <Paper className={classes.card} elevation={4}>
        <h4 className="text-white">Jitsi Demo</h4>
        <ThemeProvider theme={theme}>
          <div className="mb-3">
            <TextField
              label="Name"
              variant="outlined"
              color="default"
              className={classes.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3 text-center">
            <Button
              variant="contained"
              color="default"
              onClick={() => {
                // if name is empty we mandate user to enter it as we also trigger to open snackbar here
                if (name === "") {
                  handleClick();
                  return;
                }

                // if all goes well we will be redirecting the user to meet room
                history.push(`/meet/${returnRoomName}`);
              }}
            >
              Create Meet
            </Button>
          </div>
        </ThemeProvider>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Enter your name please!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StartupPage;
