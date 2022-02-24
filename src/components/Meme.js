import React, { useState, useEffect } from "react";
export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottom: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  function showTextOnImage(event) {
    const { value, name } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }
  const [allMemeImages, setAllMemeImages] = useState([]);
  useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNum = Math.trunc(Math.random() * allMemeImages.length) + 1;
    const url = allMemeImages[randomNum].url;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: url,
      };
    });
    meme.topText = meme.bottom = "";
    console.log(url);
  }
  return (
    <main>
      <div className="form">
        <input
          type="text"
          className="form--input"
          placeholder="Top text"
          name="topText"
          onChange={showTextOnImage}
          value={meme.topText}
        />
        <input
          type="text"
          className="form--input"
          placeholder="Bottom text"
          name="bottom"
          value={meme.bottom}
          onChange={showTextOnImage}
        />
        <button onClick={getMemeImage} className="form--button">
          Get a new Image
        </button>
      </div>
      <div className="meeme">
        <img src={meme.randomImage} className="MemeImage" alt="MEME" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottom}</h2>
      </div>
    </main>
  );
}
