import React from 'react';

function Meme() {
  const [meme, setMeme] = React.useState(
    {
      topText: '',
      bottomText: '',
      randomImage: 'http://i.imgflip.com/1bij.jpg',
    },
  );
  const [allMemes, setAllMemes] = React.useState('');

  React.useEffect(() => {
    async function getMemes() {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
    // Alternatively, you can use the following code:
    // fetch('https://api.imgflip.com/get_memes')
    //   .then((response) => response.json())
    //   .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const { url } = allMemes[randomIndex];
    setMeme((prevMeme) => ({ ...prevMeme, randomImage: url }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          className="form__input"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}

        />
        <input
          type="text"
          className="form__input"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button type="submit" className="form__button" onClick={getMemeImage}>Get a new meme image</button>
      </div>
      <div className="meme__container">
        <img src={meme.randomImage} alt="meme" className="meme__image" />
        <h2 className="meme__text top">
          {meme.topText}
        </h2>
        <h2 className="meme__text bottom">
          {meme.bottomText}
        </h2>
      </div>
    </main>
  );
}

export default Meme;
