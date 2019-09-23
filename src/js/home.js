console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise((resolve,reject)=>{
  //setInterval() cada sierto tiempo
  //setTimeout() una sola ves en un determinado tiempo
  setTimeout(()=>{
    resolve('se acabo el tiempo')
  },5000)
})


const getUser = new Promise((resolve,reject)=>{
  //setInterval() cada sierto tiempo
  //setTimeout() una sola ves en un determinado tiempo
  setTimeout(()=>{
    resolve('se acabo el tiempo')
  },3000)
})

// getUser
// .then(()=>{
//   console.log('todo bien');
// })
// .catch((mensaje)=>{
//   console.log(mensaje);
// })

//ejecutar promesas
// Promise.all
Promise.race([
  getUserAll,
  getUser,
])
.then((mensaje)=>{
  console.log(mensaje)
})
.catch((message)=>{
  console.log(message)
})

//jQuery
// parametros url {configuracion}
// $.ajax('https://randomuser.me/api/',{
//   method: 'GET',
//   //success todo bien
//   success: function(data){
//     console.log(data)
//   },
//   //error todo mal 
//   error: function(error){
//     console.log(error)
//   }
// })

//vanillaJs
function traerUser(){
  fetch('https://randomuser.me/api/')
    .then( (response)=> response.json() )
    .then((data)=> console.log(data, data.results[0].name.first))
    .catch(()=> console.log('algo fallo'));
}
// traerUser();


//funciones asincronas
(async function load(){
  //terror
  //action
  //animation
  async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action')
  const dramaList = await getData('https://yts.lt/api/v2/list_movies.json?genre=drama')
  const animationList = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation')
  console.log('drama ',dramaList)
  console.log('animation',animationList)
  console.log('Action ', actionList)

  function videoItemTemplates(movie){
    return  `<div class="primaryPlaylistItem">
                  <div class="primaryPlaylistItem-image">
                    <img src="${movie.medium_cover_image}">
                  </div>
                  <h4 class="primaryPlaylistItem-title">
                    ${movie.title}
                  </h4>
                </div>`  
  }
  // console.log(videoItemTemplates('dasds', 'dasda'));
  const $actionContainer = document.querySelector('#action');

  actionList.data.movies.forEach( movie => {
    const HTMLstring = videoItemTemplates(movie);
    //creacion del DOM
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLstring;
    $actionContainer.append(html.body.children[0]);
    // console.log(HTMLstring);
  });
  //selectores
  // const $home = $('.home');
  const $dramaContainer = document.querySelector('#drama'); 
  const $animationContainer = document.querySelector('#animation');
  const $modal = document.querySelector('#modal');
  const $overlay = document.querySelector('#overlay');
  const hideModal = document.querySelector('#hideModal'); 

  const $featuringContainer = document.querySelector('#featuring');
  const $from = document.querySelector('#from'); 
  const $home = document.querySelector('#home');

  const modalImage = $modal.querySelector('img');
  const modalTitle = $modal.querySelector('h1');
  const modalDescription = $modal.querySelector('p');



})()