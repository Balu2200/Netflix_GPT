import { Provider } from "react-redux";
import Body from "./components/body";
import AppStore from "./utils/appStore";

function App() {
  return (
    <Provider store={AppStore}>
      <Body />
    </Provider>
  );
}

export default App;
