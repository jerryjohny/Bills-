var usuarios
function carregarUsuarios(){
axios.get("http://localhost:4000/user/listar/")
.then(res=>{
    var a = res.data
    usuarios = a;   
})
}


function regUser(){
    var nome= document.getElementById("nome").value
    var email= document.getElementById("email").value
    var password= document.getElementById("password").value
  
    axios.post("http://localhost:4000/user/registar/",  {
        nome: nome,
        email:  email,
        password: password,
        tipo: "admin"
    })
}

function regIva(){
    var valor_em_vigor= document.getElementById("valor_em_vigor").value
    var data= document.getElementById("data").value
  
    axios.post("http://localhost:4000/iva/registar/",  {
        valor_em_vigor: valor_em_vigor,
        data:  data,
    })
}
function autenticar(event) {
    var email= document.getElementById("emailauth").value
    var password= document.getElementById("passwordauth").value  

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email == email && usuarios[i].password == password) {
            // alert(usuarios[i].nome)
            window.location.href="index.html"
        } else{
            // event.preventDefault();

        }       
    } 
}

$("#registar").click(function(){
    regUser();
    
})
$("#entrar").click(function(){
    autenticar();
    
})
$("#submeterIva").click(function(){
    regIva();
    
})

$(function () {
    carregarUsuarios();
})