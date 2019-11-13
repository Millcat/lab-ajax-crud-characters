const charactersAPI = new APIHandler('http://localhost:8000'); // parameter is defined in APIHandlers line 2
console.log(charactersAPI);

window.addEventListener('load', () => {
  const container = document.querySelector(".characters-container");

  function characterCards(char) { // paramètre correspondant à la data de notre base de données
    return `
    <div class="character-info">
      <div class="name">Character Name: ${char.name}</div>
      <div class="occupation">Character Occupation: ${char.occupation}</div>
      <div class="cartoon">Is a Cartoon?: ${char.cartoon}</div>
      <div class="weapon">Character Weapon: ${char.weapon}</div>
    </div>`;
  }

  function showAll() {
    charactersAPI
      .getFullList()
      .then(apiRes => {
        const characters = apiRes.data; // ici characters correspond à une array
        console.log(characters)
        let template = "";
        characters.forEach(char => { // car est la position de notre index
          template += characterCards(char);
        });
        container.innerHTML = template;
      }).catch(err => console.log(err));
  }


  document
    .getElementById('fetch-all')
    .addEventListener('click', () => {
      console.log("click");
      showAll();
    });

  document
    .getElementById('fetch-one')
    .addEventListener('click', function (event) {
      const id = document.getElementById("characterId").value; // on a eu besoin de définir un #id dans notre input pour avoir accès à sa value directement
      // console.log(id);
      charactersAPI
        .getOneRegister(id)
        .then(apiRes => {
          // console.log(apiRes);
          const character = apiRes.data;
          container.innerHTML = characterCards(character);
        }).catch(err => console.log(err));
    });



  document.getElementById('delete-one').addEventListener('click', function (event) {

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const newCharacter = {
      name: document.querySelector(`#new-character-form input[name="name"]`).value,
      occupation: document.querySelector(`#new-character-form input[name="occupation"]`).value,
      weapon: document.querySelector(`#new-character-form input[name="weapon"]`).value,
      cartoon: document.querySelector(`#new-character-form input[name="cartoon"]`).checked,
    };
    if (!newCharacter.name || !newCharacter.occupation || !newCharacter.weapon) document.getElementById("send-data").classList.toggle("red")
    else {
      charactersAPI
        .createOneRegister(newCharacter)
        .then(() => {
          document.getElementById("send-data").classList.toggle("green");
          document.getElementById("send-data").classList.remove("red")
          setTimeout(() => document.getElementById("send-data").classList.toggle("green"), 2000)
        })
        .catch(err => {
          console.log(err);
          document.getElementById("send-data").classList.toggle("red");
        });
    }
  });
});