import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import styles from "./Cards.module.scss";

function Cards({ cards }) {
  const [index, setIndex] = useState(0);
  const [cardFlip, setCardFlip] = useState(false);
  const [randomizedArray, setRandomizedArray] = useState(undefined);
  const { speak, voices, cancel } = useSpeechSynthesis();
  const mandarin = voices.find(e => e.lang === "zh-CN");

  useEffect(() => {
    setCardFlip(false);
  }, [index, randomizedArray]);

  const onSpeakChinese = (text, e) => {
    e.stopPropagation();
    e.preventDefault();
    cancel();
    speak({ text, voice: mandarin });
  };

  const shuffleArray = () => {
    const newArray = cards.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    setRandomizedArray(newArray);
    setIndex(0);
  }

  return (
    <>
      <div className={styles.card} onClick={() => setCardFlip(!cardFlip)}>
        <button
            className={styles.speak}
            onClick={(e) => onSpeakChinese(
              randomizedArray
                ? randomizedArray[index].character || randomizedArray[index].spokenSentence
                : cards[index].character || cards[index].spokenSentence,
              e
            )}
          >
            Hear me!
          </button>
        {
          cardFlip && (
            <>
              <h2 className={styles.header}>Pinyin / English</h2>
              <p className={styles.detail}>{randomizedArray ? randomizedArray[index]?.pinyin : cards[index]?.pinyin}</p>
              <p className={styles.detail}>{randomizedArray ? randomizedArray[index]?.english : cards[index]?.english}</p>
            </>
          )
        }
        {
          !cardFlip && (
            <>
              <h2 className={styles.header}>Mandarin (simplified)</h2>
              { cards[index]?.character && (
                <p className={styles.character}>{randomizedArray ? randomizedArray[index]?.character : cards[index]?.character}</p>
              )}
              { cards[index]?.sentence && (
                <p className={styles.character}>{randomizedArray ? randomizedArray[index]?.sentence : cards[index]?.sentence}</p>
              )}
            </>
          )
        }
      </div>
      <div className={styles.controls}>
        <div className={styles.increment}>
          <button
            className={styles.control}
            disabled={index <= 0}
            onClick={() => setIndex(index - 1)}
          >
            Previous
          </button>
          <button
            className={styles.control}
            disabled={index >= cards.length - 1}
            onClick={() => setIndex(index + 1)}
          >
            Next
          </button>
        </div>

        <button
          className={styles.control}
          onClick={() => shuffleArray()}
        >
          Randomize!
        </button>
        <p>{index + 1}/{cards.length}</p>
      </div>
    </>
  );
}

export default Cards;
