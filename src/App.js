import Header from "./components/header/Header";
import AppRouter from "./components/AppRouter";
import "./styles/common.css";
import { useState } from "react";
import { ProfileContext } from "./context";
function App() {
    const storageProfile = localStorage.getItem("profile");
    const [profile, setProfile] = useState(JSON.parse(storageProfile) || false);
    const [isloading, setLoading] = useState(true);

    return (
        <ProfileContext.Provider value={{ profile, setProfile, isloading }}>
            <div className="App">
                <Header />
                <main className="container">
                    <AppRouter />
                </main>
            </div>
        </ProfileContext.Provider>
    );
}
export default App;
