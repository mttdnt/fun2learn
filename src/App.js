import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Characters from "./Pages/Characters";
import Sentences from "./Pages/Sentences";
import styles from './App.module.scss';

function App() {
  useEffect(() => {
    const characters = axios.get("https://fun2learn-b5c44.ue.r.appspot.com/characters");
    console.log(characters);
  }, []);
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <p className={styles.heading}>F2L!</p>
          <div className={styles.linkContainer}>
            <Link className={styles.link} to="/">Characters</Link>
            <Link className={styles.link} to="/sentences">Sentences</Link>
          </div>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/sentences" element={<Sentences />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
