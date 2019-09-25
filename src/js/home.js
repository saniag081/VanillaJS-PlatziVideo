// console.log('hola mundo!');
// const noCambia = "Leonidas";

// let cambia = "@LeonidasEsteban"

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
  //consumir API
  async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  const $home = document.querySelector('#home');
  const $from = document.querySelector('#form'); 

  //creacion de atributtos
  const $featuringContainer = document.querySelector('#featuring');

  function setAttributes(element,attributes){
    for(const atribute in attributes){
      element.setAttribute(atribute, attributes[atribute]);
      // getAttribute()
    }
  }

  const BASE_API = 'https://yts.lt/api/v2/';

  function featuringTemplate(pelis){
    return  ( `
    <div class="featuring">
      <div class="featuring-image">
          <img src="${pelis.medium_cover_image}" width="70" height="100" alt="">
      </div>
      <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${pelis.title}</p>
      </div>
    </div>
    `)
  }

  $from.addEventListener('submit', async (evento)=>{
    evento.preventDefault();
    $home.classList.add('search-active');
    const $loader = document.createElement('img');
    setAttributes($loader,{
      src: 'src/images/loader.gif',
      height: 50,
      width: 50
    })
    $featuringContainer.append($loader);

    //enviar datos
    const data = new FormData($from);
    const { 
      data: {
        movies: pelis
      }
    } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
    console.log(pelis)
    debugger
    const HTMLString = featuringTemplate(pelis[0]);
    // debugger
    $featuringContainer.innerHTML = HTMLString;
  })

  //obtener Generos de las peliculas
  const actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
  const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`);
  const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);
  //creacion de plantilla
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
  //creacion del dom
  function createTamplete(HTMLString){
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;

    return html.body.children[0];
  }

  //evento click a las peliculas
  function addEVentClck(element){
    element.addEventListener('click',()=>{
      showModal();
    })
  }

  //recorrer array peliculas
  function rederMovieList(list,container){
    //eliminar elemnto HTML 
    container.children[0].remove()
    // actionList.data.movies
    list.forEach( movie => {
      const HTMLstring = videoItemTemplates(movie);
      const movieElemnt = createTamplete(HTMLstring);
      container.append(movieElemnt);
      addEVentClck(movieElemnt);
      // console.log(HTMLstring);
    });
  }
  
  //selectores
  const $modal = document.querySelector('#modal');
  const $overlay = document.querySelector('#overlay');
  const $hideModal = document.querySelector('#hide-modal'); 
  
  
  const modalImage = $modal.querySelector('img');
  const modalTitle = $modal.querySelector('h1');
  const modalDescription = $modal.querySelector('p');
  
  const $actionContainer = document.querySelector('#action');
  rederMovieList(actionList.data.movies,$actionContainer);
  
  const $dramaContainer = document.querySelector('#drama'); 
  rederMovieList(dramaList.data.movies, $dramaContainer);

  const $animationContainer = document.querySelector('#animation');
  rederMovieList(animationList.data.movies, $animationContainer);

  function showModal(){
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';

  }

  $hideModal.addEventListener('click',()=>{
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  })


})()