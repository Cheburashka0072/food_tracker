import Header from "./components/header/Header";
import AppRouter from "./components/AppRouter";
import "./styles/common.css";
import { AuthContext, ProfileContext } from "./context";
import { useAuth } from "./hooks/auth.hook";
import { Toaster } from "react-hot-toast";
function App() {
    const { token, login, logout, userId, ready } = useAuth();
    const isAuth = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, userId, isAuth }}>
            <div className="App">
                <Header />
                {!ready ? (
                    <h1>Loading...</h1>
                ) : (
                    <main className="container">
                        <AppRouter />
                    </main>
                )}
                <Toaster richColors />
            </div>
        </AuthContext.Provider>
    );
}
export default App;
