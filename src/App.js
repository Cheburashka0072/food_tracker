import Header from "./components/header/Header";
import AppRouter from "./components/AppRouter";
import "./styles/common.css";
function App() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <AppRouter />
      </main>
    </div>
  );
}
export default App;
