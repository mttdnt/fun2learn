import Cards from "../../Components/Cards";
import characters from "../../characters.json";
import styles from "./Characters.module.scss";

function Characters() {
  return (
    <div className={styles.layout}>
      <h1 className={styles.header}>Memorize Characters</h1>
      <Cards cards={characters}/>
    </div>
  );
}

export default Characters;
