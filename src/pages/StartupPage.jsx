import React, { useContext, useState } from "react";
import {
  Paper,
  makeStyles,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { MeetContext } from "../context/MeetContext";
import MuiAlert from "@material-ui/lab/Alert";
import { generateString } from "../helper/generateRandomString";

// Alert when the user hasn't filled up their name
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertBar = ({ open, handleClose }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error">
      Enter your name please!
    </Alert>
  </Snackbar>
);

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
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: "dark",
        },
      }),
    []
  );

  // we will use this to navigate next page
  const history = useHistory();

  // will be using name across all pages from context
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

  return (
    <div className={classes.background}>
      <Paper className={classes.card} elevation={4}>
        <h4>Jitsi Medium Demo</h4>
        <ThemeProvider theme={theme}>
          <div style={{ marginBottom: "1.5rem" }}>
            <TextField
              label="Name"
              variant="outlined"
              color="default"
              className={classes.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
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
                history.push(`/meet/${generateString(7)}`);
              }}
            >
              Create Meet
            </Button>
          </div>
        </ThemeProvider>
      </Paper>
      <AlertBar open={open} handleClose={handleClose} />
    </div>
  );
};

export default StartupPage;
