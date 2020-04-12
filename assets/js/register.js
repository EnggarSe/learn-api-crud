const url = "https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/users";
const register = document.getElementById("register-form");
const cekUser = [];

const getUserCek = async (username) => {
    const response = await fetch(url);
    const result = await response.json();

    result.forEach((element) => {
        cekUser.push(element.username);    
    }) 
    
    
}

const clearInput = () => {
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password1").value = "";
    document.getElementById("password2").value = "";
}

const addNewUser = async (event) =>{
    event.preventDefault(); 
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password1").value;
    const confirmPassword = document.getElementById("password2").value;
    // membuat objek user untuk menyimpan data diatas
    
    const users = {
        email,username,password,confirmPassword,
    };

    if(email == "" || username == "" || password == "" || confirmPassword =="" ){
        alert("Inputan Tidak Boleh Kosong")
    }
    else{
        if(cekUser.includes(username)){
            alert("Username Sudah Terdaftar");
        }
        else{
            if(password!=confirmPassword){
                alert("Password Harus Sama")
                document.getElementById("password1").value = "";
                document.getElementById("password2").value = "";
            }
            else{
                const response = await fetch (url, {
                    method : "POST",
                    headers :{
                        "Content-Type" : "application/json",
                    },
                    body : JSON.stringify(users)
                });
                await response.json();
                console.log(response);
                alert("Berhasil Daftar");
                clearInput()   
            }
        }
    }
    
   

    
    
}

getUserCek();
register.addEventListener("submit", addNewUser)
