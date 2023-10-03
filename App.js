import React from "react";

import StateProvider from "./src/store/StateProvider";
import { Views } from "./src/screens/Views/Views";

const App = () => {
  return (
    <StateProvider>
      <Views />
    </StateProvider>
  );
};

export default App;
