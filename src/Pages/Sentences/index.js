import { useEffect, useState } from "react";
import Cards from "../../Components/Cards"
import characters from "../../characters.json";
import sentences from "../../sentences.json";
import styles from "./Sentences.module.scss";

function Sentences() {
  const [charSentences, setCharSentences] = useState([]);

  useEffect(() => {
    const transformedSentences = sentences.map((s) => {
      let decoratedSentences = [];
      let spokenSentence = "";
      s.character.forEach((x) => {
        if (!x.isCharacter) {
          decoratedSentences.push(<span className={styles.punctuation}>{`${x.string} `}</span>);
          spokenSentence += `${x.string} `;
        } else {
          const mappedChar = characters.find(y => y.character === x.string);
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
  }, []);

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
