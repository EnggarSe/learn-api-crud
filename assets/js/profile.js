const urlUser = "https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/users";
let check = localStorage.getItem('isLogin');
const showProfile = document.getElementById("showProfile");
const urlMovies = "https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/movies";
const jumlahMovie = [];
const cekUser = [];

if (check != 'true') {
    window.location.href = `${window.origin}/index.html`
}

const getUserCek = async (username) => {
    const response = await fetch(urlUser);
    const result = await response.json();

    result.forEach((element) => {
        cekUser.push(element.username);    
    })     
}
const getLocalStorage = () => {
    return localStorage.getItem("userData") === null
        ? []
        : JSON.parse(localStorage.getItem("userData"));
}

const getUserId = (userId = getLocalStorage()) => {
    return userId.id;
}
const getUserName = (userName = getLocalStorage()) => {
    return userName.username;
}

const tampilUsername = (user = getLocalStorage()) => {
    let showUsername = document.getElementById("username");
    console.log(user);

    showUsername.innerHTML = ` <a class="dropdown-item" href="profile.html">${user.username}</a>
    <a class="dropdown-item" href="#" onclick="logout(event)">Logout</a>`
}
const logout = (event) => {
    event.preventDefault();
    localStorage.setItem('isLogin', false)
    localStorage.removeItem("userData");
    window.location.href = `${window.origin}/index.html`
}

const getMoviesCount = async (event) => {
    const response = await fetch(urlMovies);
    const result = await response.json();
    const userId = getUserId();
    result.forEach(element => {
        if (userId == element.userId) {
            jumlahMovie.push(element.id)
        }
    });
    // console.log(jumlahMovie);
}

const getUserProfile = async (event) => {
    const response = await fetch(urlUser);
    const result = await response.json();
    const userId = getUserId();
    for (let i = 0; i < jumlahMovie.length; i++) {
        console.log(jumlahMovie[i]);

    }
    result.forEach(element => {
        if (userId === element.id) {
            const newDiv = document.createElement("div")
            newDiv.innerHTML = ` <h3>${element.username}</h3>
            <img src=${element.avatar}
                class="card-img-center rounded-circle" alt="...">
            <form id="profile-form">
                <div class="form-group">
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                        placeholder="Enter email" value = "${element.email}" disabled >
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="username" aria-describedby="emailHelp"
                        placeholder="Username" value = "${element.username}" disabled>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="jumlahFilm" placeholder="0" value = "${jumlahMovie.length} Total Film" disabled>
                </div>
                <button id="daftar" type="submit" class="btn btn-dark" onclick = "editProfile(event)">Edit</button>
            </form>`
            showProfile.appendChild(newDiv)
        }
    });
}

const editProfile = async (event) => {
    event.preventDefault();
    showProfile.innerHTML = "";
    const newDiv = document.createElement("div")
    const response = await fetch(urlUser);
    const result = await response.json();
    const userId = getUserId();
    result.forEach(element => {
        if (userId === element.id) {
            newDiv.innerHTML = ` <h3>${element.username}</h3>
            <img src=${element.avatar}
                class="card-img-center rounded-circle" alt="...">
            <form id="profile-form">
                <div class="form-group">
                    <input type="email" class="form-control" id="emailUpdate" aria-describedby="emailHelp"
                        placeholder="Enter email" value = "${element.email}" >
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="usernameUpdate" aria-describedby="emailHelp"
                        placeholder="Username" value = "${element.username}">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="passwordUpdate1" placeholder="Password">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="passwordUpdate2" placeholder="Confirm Passowrd" >
                </div>
                <div class="form-group">
                    <input type="url" class="form-control" id="avatarUpdate" placeholder="Address Avatar" value = ${element.avatar}" >
                </div>
                <button id="daftar" type="submit" class="btn btn-dark" onclick = "updateProfile(event)" value =>Save</button>
            </form>`
            showProfile.appendChild(newDiv)
        }
    });

}
const updateProfile = async (event) => {
    event.preventDefault();
    const email = document.getElementById("emailUpdate").value;
    const username = document.getElementById("usernameUpdate").value;
    const password = document.getElementById("passwordUpdate1").value;
    const confirmPassword = document.getElementById("passwordUpdate2").value;
    const avatar = document.getElementById("avatarUpdate").value;
    const id = getUserId();
    const recentName = getUserName();
    console.log(recentName);
    
    const updateUser = {
        email, username, password, confirmPassword, avatar,
    };
    if (email == "" || username == "" || password == "" || confirmPassword == "" || avatar=="") {
        alert("Inputan Tidak Boleh Kosong")
    }
    else{
        if(username==recentName){
            if(password===confirmPassword){
                const response = await fetch (`${urlUser}/${id}`, {
                    method : 'PUT',
                    headers : {
                        "Content-Type" : "application/json",
                    },
                    body : JSON.stringify(updateUser),
                });
                await response.json();
                alert("Profile Updated !");
                window.location.href = `${window.origin}/profile.html`;
            }
            else{
                alert("Password Harus Sama")
                document.getElementById("passwordUpdate1").value = ""
                const confirmPassword = document.getElementById("passwordUpdate2").value = ""
            }   
        } 
        else if(cekUser.includes(username)){
            alert("Username Yang Digunakan Sudah Terdaftar")
        }
        else{
            if(password===confirmPassword){
                const response = await fetch (`${urlUser}/${id}`, {
                    method : 'PUT',
                    headers : {
                        "Content-Type" : "application/json",
                    },
                    body : JSON.stringify(updateUser),
                });
                await response.json();
                alert("Profile Updated !");
                window.location.href = `${window.origin}/profile.html`;
            }
            else{
                alert("Password Harus Sama")
                document.getElementById("passwordUpdate1").value = ""
                const confirmPassword = document.getElementById("passwordUpdate2").value = ""
            }
            
        } 
        }
       
}

getUserCek();
getMoviesCount();
getUserProfile();
tampilUsername();