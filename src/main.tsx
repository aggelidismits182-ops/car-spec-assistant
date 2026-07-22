import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //«βρες το στοιχείο με id root» — η γέφυρα προς το index.html! Εδώ ενώνονται τα δύο αρχεία: το html έβαλε την πινακίδα, το JS τη βρίσκει
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
