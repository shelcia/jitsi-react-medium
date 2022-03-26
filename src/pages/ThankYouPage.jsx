import React from "react";
import { Paper, makeStyles, Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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

const ThankYouPage = () => {
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

  return (
    <div className={classes.background}>
      <Paper className={classes.card} elevation={4}>
        <h4>Thank You</h4>
        <ThemeProvider theme={theme}>
          <div style={{ marginBottom: "1.5rem" }}></div>
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <p>You can go back home and create another meeting !</p>
            <Button
              variant="contained"
              color="default"
              onClick={() => {
                history.push(`/`);
              }}
            >
              Go Back Home
            </Button>
          </div>
        </ThemeProvider>
      </Paper>
    </div>
  );
};

export default ThankYouPage;
