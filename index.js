$(() =>{
  const socket = io()
  console.log("Conectado ao servidor")

  $("form").submit(() =>{
    socket.emit("message", $("#texto").val())
    $("form").reset()
    return false  
  })

  socket.on("message", (texto) => $("#mensagens").append($("<li>").text(texto)))

  let time = new Date().getTime()
  $("#texto").keydown(() =>{  
    const interval = new Date().getTime() -lastTime
    if(interval > 800){
      socket.emit("status" , "usuario esta digitando")
      console.log("usuario esta digitando")
      lastTime = new Date ().getTime()
    }
    clearTimeout(timeoutId)
    timeoutId = setTimeout(()=>{
      socket.emit("status", "Usuário está digitando ")
      console.log("Usuário está digitando")
    }, 800)
  })
  
    

  $("texto").keyup(()=> setTimeout (() => socket.emit("status", ""), 500))
  
  socket.on("status", (texto) => $("status").html(texto))


  function UsuariosLoagados(){
    prompt("a função esta funcionando")
     const usuariologado = document.getElementById("#login").append("<li>")
     console.log(usuariologado + "usuario logado com sucesso.");
   }
})
// criar a função de usuários logados e mostre o usuário logado. 
