import React from "react";

import StateProvider from "./src/store/StateProvider";
import ThemeProvider from "./src/store/ThemeProvider";
import Views from "./src/screens/Views";

const App = () => {
  return (
    <ThemeProvider>
      <StateProvider>
        <Views />
      </StateProvider>
    </ThemeProvider>
  );
};

export default App;
