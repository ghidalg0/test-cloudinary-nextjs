import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const url = "https://api.cloudinary.com/v1_1/dwb8y1to0/image/upload";

  const [chosenFile, setChosenFile] = useState();
  const [tempURL, setTempURL] = useState();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const file = document.querySelector("[type=file]").files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lmcjlzkl");
    formData.append("public_id", "bouya");
    fetch(url, {
      method: "POST",
      body: formData,
    });
  };

  const onChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.value.replace("C:\\fakepath\\", "");
    setChosenFile(selectedFile);
    const file = document.querySelector("[type=file]").files[0];
    const fakeURL = URL.createObjectURL(file);
    setTempURL(fakeURL);
  };

  return (
    <div className={styles.container}>
      <h1>Test for cloudinary upload</h1>
      <form
        encType="form-data"
        onSubmit={onSubmitHandler}
        className={styles.form}
      >
        <label htmlFor="inputFile" className={styles.label}>
          <p>Ajouter une photo</p>
          <input
            type="file"
            id="inputFile"
            className={styles.input}
            onChange={onChange}
          />
        </label>
        <p>{chosenFile}</p>
        {tempURL ? (
          <Image
            src={tempURL}
            width={100}
            height={100}
            alt="Votre photo"
            className={styles.image}
          />
        ) : null}
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
