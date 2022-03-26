import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MeetProvider } from "./context/MeetContext";
import MeetPage from "./pages/MeetPage";
import StartupPage from "./pages/StartupPage";
import ThankYou from "./pages/ThankYouPage";

import "./styles/custom.css";

const App = () => {
  return (
    <MeetProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={StartupPage} exact />
          <Route path="/meet/:id" component={MeetPage} exact />
          <Route path="/thank-you" component={ThankYou} />
        </Switch>
      </BrowserRouter>
    </MeetProvider>
  );
};

export default App;
