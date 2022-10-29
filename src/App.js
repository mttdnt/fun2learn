import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Characters from "./Pages/Characters";
import Sentences from "./Pages/Sentences";
import Add from "./Pages/Add";
import styles from './App.module.scss';

Amplify.configure(awsExports);

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <p className={styles.heading}>F2L!</p>
          <div className={styles.linkContainer}>
            <Link className={styles.link} to="/">Characters</Link>
            <Link className={styles.link} to="/sentences">Sentences</Link>
            <Link className={styles.link} to="/add">Add</Link>
          </div>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/sentences" element={<Sentences />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
