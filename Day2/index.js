// console.log("Day2")
// // https://pokeapi.co/api/v2/pokemon/1

// const searchForm = document.getElementById('search-form');
// const input = document.getElementById('input');
// const pokeCollectionEl = document.getElementById('poke-collection');

// const getPokeInfo = async (id) => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//     const pokeData = await response.json()
//     // pokeNameEl.innerText = pokeData.name
//     // pokeImgEl.src = pokeData.sprites.font_default
//     console.log(pokeData)
//     console.log(pokeData.sprites.front_default)
//     pokeCollectionEl.innerHTML += `
//     <div class="poke-info">
//         <button class="btn onClick="deletePokeId(${id})">X</button>
//         <div class="poke-name">${pokeData.name}</div>
//         <img src="${pokeData.sprites.front_default}" alt="" class="poke-img">
//     </div>
//     `;
// }

// const getPokeIdInLocalStorage = () => {
//     const pokeIdsString = localStorage.getItem('pokeIds')
//     const pokeIds = pokeIdsString ? JSON.parse(localStorage(pokeIdsString)) : '[]';
// }

// const deletePokeId = (id) => {
//     const pokeIds = getPokeIdInLocalStorage();
//     const deleteIndex = pokeIds.indexOf(id)
//     pokeIds.splice(deleteIndex, 1);
//     localStorage.setItem('pokeIds', JSON.stringify(pokeIds))
//     renderPokes()
// }

// const renderPokes = () => {
//     pokeCollectionEl.innerHTML = ' '
//     const pokeIds = getPokeIdInLocalStorage()
//     for (let id of pokeIds) {
//         getPokeInfo(id)
//     }
// }
// renderPokes()

// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     let pokeIds = getPokeIdInLocalStorage()
//     pokeIds.push(input.value)
//     pokeIds = [...new Set(pokeIds)]
//     localStorage.setItem('pokeIds', JSON.stringify(pokeIds))
//     renderPokes()
// })

//Rest / spread operator
const arr = [1, 2, 3, 4];
const newArr = [...arr, 5, 6]
console.log(arr);
console.log(newArr);


const person = {
    name: "nam",
    age: 22,
}

const exPerson = {
    ...person,
    school: 'none',
}

console.log(exPerson);

//Array function
// forEach((item) => {})
// data.map((item) => {
// return <>
//})

//filter((item) => {
//return
//})

//reduce((prev, current) => {
//return
//})

// const sum = [1, 2, 3, 4].reduce((prev, curr) => {
//     return prev + curr
// })

// console.log(sum);

// const a = 5;
// const b = a < 6 ? 4 : 3

// const x = undefined
// const value = x || 5

// console.log(value)

// const logX = () => {
//     console.log("logged");
// }

// x && logX()

// //destructure

// const obj = {
//     name: "Name",
//     age: 22,
// };


// const getObject = (o) => {
//     const { name, age } = o;
//     console.log(name);
//     console.log(age);
//     console.log(road);
// }

// getObject()