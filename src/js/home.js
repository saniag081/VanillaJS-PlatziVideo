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

      if(data.data.movie_count > 0){
        return data;
      }else{
        throw new Error('No se encontro ningun resultado');
      }
  }

  async function getDataUser(url){
    const response = await fetch(url);
    const data = await response.json()
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

    try{
      const { 
        data: {
          movies: pelis
        }
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
      console.log(pelis)
      const HTMLString = featuringTemplate(pelis[0]);
      // debugger
      $featuringContainer.innerHTML = HTMLString;

    }catch(error){
      alert(error.message);
      $loader.remove();
      $home.classList.remove('search-active');
    }
  })

  //creacion de plantilla
  function videoItemTemplates(movie, category){
    return  `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
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
      showModal(element);
    })
  }

  //recorrer array peliculas
  function rederMovieList(list,container,category){
    //eliminar elemnto HTML 
    container.children[0].remove()
    // actionList.data.movies
    list.forEach( movie => {
      const HTMLstring = videoItemTemplates(movie,category);
      const movieElemnt = createTamplete(HTMLstring);
      container.append(movieElemnt);
      const image = movieElemnt.querySelector('img');
      image.addEventListener('load',(event)=>{
        event.srcElement.classList.add('fadeIn');
      })
      addEVentClck(movieElemnt);
      // console.log(HTMLstring);
    });
  }
  
  //selectores
  const $modal = document.querySelector('#modal');
  const $overlay = document.querySelector('#overlay');
  const $hideModal = document.querySelector('#hide-modal'); 

//localStorage
  async function cacheExist(category){
    const list = `${category}List`;
    const caheList = window.localStorage.getItem(list);
    if(caheList){
      return JSON.parse(caheList);
    }else{
      const {data: {movies: data}} = await getData(`${BASE_API}list_movies.json?genre=${category}`);
      window.localStorage.setItem(list, JSON.stringify(data));
      return data;
    }
  } 

    //obtener Generos de las peliculas
  // const {data:{movies: actionList}} = await getData(`${BASE_API}list_movies.json?genre=action`);
  const actionList = await cacheExist('action');
  // window.localStorage.setItem('actionList', JSON.stringify(actionList));
  const $actionContainer = document.querySelector('#action');
  rederMovieList(actionList,$actionContainer,'action');
    
  // const {data:{movies: dramaList}} = await getData(`${BASE_API}list_movies.json?genre=drama`);
  const dramaList = await cacheExist('drama');
  // window.localStorage.setItem('dramaList', JSON.stringify(dramaList));
  const $dramaContainer = document.querySelector('#drama'); 
  rederMovieList(dramaList, $dramaContainer, 'drama');
    
  // const {data:{movies:animationList}} = await getData(`${BASE_API}list_movies.json?genre=animation`);  
  const animationList = await cacheExist('animation'); 
  // window.localStorage.setItem('animationList', JSON.stringify(animationList));
  const $animationContainer = document.querySelector('#animation');
  rederMovieList(animationList, $animationContainer,'animation');

  const $containerUser = document.querySelector('#playlistFriends');
  const urlUser = 'https://randomuser.me/api/';

  function templateUser(user){
    return `<li class="playlistFriends-item">
              <a href="#">
                <img src="${user.picture.medium}" />
                <span>
                  ${user.name.first} ${user.name.last} 
                </span>
              </a>
          </li>`
  }

  async function renderUser(){
    for(let i = 0; i <= 8; i++){
      let {results: user} = await getDataUser(urlUser);
      const HTMLString = templateUser(user[0]);
      const crearDom = createTamplete(HTMLString);
      $containerUser.append(crearDom);
    }
  }
  renderUser()

  function findByID(list,id){
    return list.find(movie=> movie.id === parseInt(id, 10));
  }

  function findMovie(id,category){
    switch(category){
      case 'action':{
        return findByID(actionList,id);
      }
      case 'drama':{
        return findByID(dramaList,id);
      }
      default:{
        return findByID(animationList,id);
      }
    }
  }

  function showModal(element){
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
    const id = element.dataset.id;
    const category = element.dataset.category;
    const data = findMovie(id,category);

    const modalImage = $modal.querySelector('img');
    const modalTitle = $modal.querySelector('h1');
    const modalDescription = $modal.querySelector('p');
    modalDescription.textContent = data.description_full;
    modalImage.setAttribute('src', data.medium_cover_image);
    modalTitle.textContent = data.title; 
  }

  $hideModal.addEventListener('click',()=>{
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  })

  //borrar localStorage
  const ResetQuery = document.querySelector('#ResetQuery');

  ResetQuery.addEventListener('click',()=>{
    localStorage.clear();
    location.reload();
  })


})()