import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import FileUpload from '../../Components/FileUpload';
import Modal from '../../Components/Modal';
import { listCharacters, listSentences } from "../../graphql/queries";
import { createCharacters, createSentences, deleteCharacters, deleteSentences } from "../../graphql/mutations";
import styles from "./Add.module.scss";

function Add() {
  const [view, setView] = useState(0)
  const [characters, setCharacters] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [newCharacter, setNewCharacter] = useState("");
  const [newEnglish, setNewEnglish] = useState("");
  const [newPinyin, setNewPinyin] = useState("");
  const [csvCharacters, setCsvCharacters] = useState([]);
  const [csvSentences, setCsvSentences] = useState([]);
  const [fileKey, setFileKey] = useState(Math.random(100));

  const mutation = view === 0 ? createCharacters : createSentences;
  const query = view === 0 ? listCharacters : listSentences;
  const deletion = view === 0 ? deleteCharacters : deleteSentences;
  const csvList = view === 0 ? csvCharacters : csvSentences;
  const setCsvList = view === 0 ? setCsvCharacters : setCsvSentences;

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const resultCharacters = await API.graphql(graphqlOperation(listCharacters));
        setCharacters(resultCharacters.data.listCharacters.items);
        const resultSentences = await API.graphql(graphqlOperation(listSentences));
        setSentences(resultSentences.data.listSentences.items);
      } catch (e) {
        console.error(e);
      }
    }

    asyncFetch();
  }, [setCharacters]);

  useEffect(() => {
    setNewCharacter("");
    setNewPinyin("");
    setNewEnglish("");
  }, [view]);

  const updateList = async () => {
    try {
      const result = await API.graphql(graphqlOperation(query));
      view === 0 ? setCharacters(result.data.listCharacters.items) : setSentences(result.data.listSentences.items);
    } catch (e) {
      console.error(e);
    }
  }

  const clearFields = () => {
    setNewCharacter("");
    setNewPinyin("");
    setNewEnglish("");
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.graphql(graphqlOperation(mutation, {
        input: {
          ...(view === 0 ? { simplified: newCharacter } : {}),
          pinyin: newPinyin,
          english: newEnglish,
        },
      }));
      updateList();
      clearFields();
    } catch (e) {
      console.error(e);
    }
  }

  const deleteItem = async (id) => {
    try {
      await API.graphql(graphqlOperation(deletion, {
        input: {
          id,
        },
      }));
      updateList();
    } catch (e) {
      console.error(e);
    }
  }

  const deleteCsvItem = (index) => {
    const newArray = [...csvList];
    newArray.splice(index, 1);
    setCsvList(newArray);
  }

  const closeModal = () => {
    setFileKey(Math.random());
    setCsvList([]);
  }

  const bulkUpload = async () => {
    try {
      const promises = csvList.map((x) => {
        return API.graphql(graphqlOperation(mutation, {
          input: {
            ...(view === 0 ? { simplified: x[0] } : {}),
            pinyin: x[view === 0 ? 1 : 0],
            english: x[view === 0 ? 2 : 1],
          },
        }));
      });
      await Promise.all(promises);
      closeModal();
      updateList();
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h1 className={styles.header}>Add Characters and Sentences</h1>
      <div className={styles.tabs}>
        <button onClick={() => setView(0)}>Characters</button>
        <button onClick={() => setView(1)}>Sentences</button>
      </div>
      <div>
        <h2 className={styles.subheader}>{view === 0 ? "Characters" : "Sentences"}</h2>
        <div className={styles.upload}>
          <FileUpload fileKey={fileKey} setArray={setCsvList}/>
        </div>
        <form onSubmit={(e) => submit(e)}>
          { view === 0 && <input required placeholder="Simplified chinese" value={newCharacter} onChange={(e) => setNewCharacter(e.target.value)} /> }
          <input required placeholder="Pinyin" value={newPinyin} onChange={(e) => setNewPinyin(e.target.value)} />
          <input required placeholder="English" value={newEnglish} onChange={(e) => setNewEnglish(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.list}>
        {
          view === 0 && (
          characters.map((c) => (
            <div className={styles.row} key={c.id}>
              <div>{c.simplified}</div>
              <div>{c.pinyin}</div>
              <div>{c.english}</div>
              <button className={styles.delete} onClick={() => deleteItem(c.id)}>Delete</button>
            </div>
          )))
        }
        { 
          view === 1 && (
          sentences.map((s) => (
            <div className={styles.row} key={s.id}>
              <div>{s.pinyin}</div>
              <div>{s.english}</div>
              <button className={styles.delete} onClick={() => deleteItem(s.id)}>Delete</button>
            </div>
          )))
        }
      </div>
      <Modal modalIsOpen={csvList && csvList.length > 0}>
        <button onClick={() => closeModal()}>Close</button>
        <div className={styles.csvList}>
          {
            csvList.map((c, index) => (
              <div className={styles.row} key={c[0]}>
                <div>{c[0]}</div>
                <div>{c[1]}</div>
                <div>{c[2]}</div>
                <button className={styles.delete} onClick={() => deleteCsvItem(index)}>Delete</button>
              </div>
            ))
          }
        </div>
        <button onClick={() => bulkUpload()}>Submit</button>
      </Modal>
    </div>
  );
}

export default withAuthenticator(Add);
