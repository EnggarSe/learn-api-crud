const url = "https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/users";
const login = document.getElementById("login-form");
const userData = [];
const passwordData = [];
const user = [];


const clearForm = () => {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

const getUser = async() => {
    const response = await fetch(url);
    const result = await response.json();
    result.forEach(element => {
        userData.push(element.username);
        passwordData.push(element.password);
        user.push(element)
    }); 
}

const userLogin = (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    var count = 0;
    
    if(username=="" || password==""){
        alert("Inputan Tidak Boleh Kosong");
    }
    else{
        for(let i = 0; i<userData.length ; i++){
            if(username == userData[i] && password == passwordData[i]){
                count +=1;
                let userCek = JSON.parse(localStorage.getItem('user'));
                if(userCek==null){
                    localStorage.setItem("userData", JSON.stringify(user[i]))
                    localStorage.setItem("isLogin", true)
                }
                alert("success");
                window.location.href = `${window.origin}/formMovie.html`
                break;
            }
        }
        if(count == 0){
            alert("Username Atau Password Salah")
        }
    }
}
getUser();
login.addEventListener("submit", userLogin);
