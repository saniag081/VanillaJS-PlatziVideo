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
