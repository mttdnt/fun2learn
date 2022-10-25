import { Amplify, API } from 'aws-amplify';
import awsExports from './aws-exports';
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Characters from "./Pages/Characters";
import Sentences from "./Pages/Sentences";
import styles from './App.module.scss';

Amplify.configure(awsExports);

function App() {
  useEffect(() => {
    const asyncFetch = async () => {
      const response = await API.get('f2lapi', '/characters');
      console.log(response);
    }

    asyncFetch();
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
