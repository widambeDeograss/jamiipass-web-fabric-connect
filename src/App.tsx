import { Colors } from "./constants/Colors";
import AppRouter from "./routes";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./app/store/Store";
import { ThemeProvider } from "./app/interfaces/themeProvider";

function App() {
  return (
    <div
      className="App"
      style={{  height: "100vh" }}
    >
      <Provider store={store}>
        <ThemeProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
