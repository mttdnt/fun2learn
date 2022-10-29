import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from "react";
import Cards from "../../Components/Cards"
import { listCharacters } from "../../graphql/queries";
import styles from "./Sentences.module.scss";

function Sentences() {
  const [charSentences, setCharSentences] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const resultCharacters = await API.graphql(graphqlOperation(listCharacters));
        const resultSentences = await API.get('fun2learnrest', '/sentences');
        setCharacters(resultCharacters.data.listCharacters.items);
        setSentences(resultSentences);
      } catch (e) {
        console.error(e);
      }
    }

    asyncFetch();
  }, []);

  useEffect(() => {
    if (characters.length > 0 && sentences.length > 0) {
      const transformedSentences = sentences.map((s) => {
        let decoratedSentences = [];
        let spokenSentence = "";
        s.simplified.forEach((x) => {
          if (!x.isCharacter) {
            decoratedSentences.push(<span className={styles.punctuation}>{`${x.string} `}</span>);
            spokenSentence += `${x.string} `;
          } else {
            const mappedChar = characters.find(y => y.simplified === x.string);
            decoratedSentences.push(
              <span
                className={styles.character}
              >
                <span className={styles.hiddenHover}>{mappedChar.pinyin}</span>
                {x.string}
              </span> 
            );
            spokenSentence += x.string;
          }
        });
        return {
          sentence: decoratedSentences,
          spokenSentence,
          pinyin: s.pinyin,
          english: s.english,
        };
      });
  
      setCharSentences(transformedSentences);
    }
  }, [characters, sentences]);

  return (
    <div className={styles.layout}>
      <h1 className={styles.header}>Memorize Sentences</h1>
      <Cards
        cards={charSentences}
      />
    </div>
  );
}

export default Sentences;
