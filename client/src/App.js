import Header from "./components/header/Header";
import AppRouter from "./components/AppRouter";
import "./styles/common.css";
import { useState } from "react";
import { AuthContext, ProfileContext } from "./context";
import { useAuth } from "./hooks/auth.hook";
function App() {
    const storageProfile = localStorage.getItem("profile");
    const [profile, setProfile] = useState(JSON.parse(storageProfile) || false);
    const [isloading, setLoading] = useState(true);
    const { token, login, logout, userId } = useAuth();
    const isAuth = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, userId, isAuth }}>
            <div className="App">
                <Header />
                <main className="container">
                    <AppRouter />
                </main>
            </div>
        </AuthContext.Provider>
    );
}
export default App;
