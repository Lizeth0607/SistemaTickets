import React, { useEffect, useState, useRef } from "react";

const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const pokemon = [];
    const promises = new Array(20)
      .fill()
      .map((v, i) => fetch(`https://backliz1.herokuapp.com/app/${i + 1}`));
    Promise.all(promises).then(pokemonArr => {
      return pokemonArr.map(value =>
        value
          .json()
          .then(({ nombre  }) =>
            pokemon.push({ nombre })
          )
      );
    });
    setOptions(pokemon);
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = poke => {
    setSearch(poke);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      {display && (
        <div className="autoContainer">
          {options
            .filter(({ nombre }) => nombre.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePokeDex(value.nombre)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.nombre}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

function App2() {
  return (
    <div className="App">
      <h1>Custom AutoComplete React</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto />
      </div>
    </div>
  );
}

export default App2;