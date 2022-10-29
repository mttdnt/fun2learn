import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from "react";
import Cards from "../../Components/Cards";
import styles from "./Characters.module.scss";
import { listCharacters } from "../../graphql/queries";

function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const resultCharacters = await API.graphql(graphqlOperation(listCharacters));
        setCharacters(resultCharacters.data.listCharacters.items);
      } catch (e) {
        console.error(e);
      }
    }

    asyncFetch();
  }, [setCharacters]);

  return (
    <div className={styles.layout}>
      <h1 className={styles.header}>Memorize Characters</h1>
      <Cards cards={characters}/>
    </div>
  );
}

export default Characters;
