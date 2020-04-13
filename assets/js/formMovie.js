const urlMovies = "https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/movies"
const urlUsers = "https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/users"
const tambahMovie = document.getElementById("addMovies");
let check = localStorage.getItem('isLogin');

if(check != 'true'){
    window.location.href = `${window.origin}/index.html`
}


const getLocalStorage = () => {
    return localStorage.getItem("userData")===null
    ? []
    : JSON.parse(localStorage.getItem("userData"));
}

const tampilUsername = (user = getLocalStorage()) =>{
    let showUsername = document.getElementById("username");
    console.log(user);
    
    showUsername.innerHTML = ` <a class="dropdown-item" href="profile.html">${user.username}</a>
    <a class="dropdown-item" href="#" onclick="logout(event)">Logout</a>`
}

const getMovie = async() => {
    const response = await fetch(urlMovies);
    const result = await response.json();
    result.forEach(element => {
        movies.push(element)
    });
}

const clearInput = () => {
    document.getElementById("title").value = "";
    document.getElementById("about").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("poster").value = "";
}

const addNewMovies = async (event) =>{
    event.preventDefault(); 
    const title = document.getElementById("title").value ;
    const about = document.getElementById("about").value ;
    const rating = document.getElementById("rating").value; 
    const poster = document.getElementById("poster").value ;
    const userId = getUserId();
    console.log("masuk");
    
    const movies = {
        userId,title,about,rating,poster,
    };
    if(title == "" || about == "" || rating == "" || poster =="" ){
        alert("Inputan Tidak Boleh Kosong");
    }
    if(rating>=10){
        alert("Rating Maksimal 10")
        document.getElementById("rating").value = "";
    }
    else{
        const response = await fetch(urlMovies, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(movies)
        });
        await response.json();
        console.log(response);
        alert("Berhasil Menambahkan Movies");
        clearInput();
    }        
}

const getUserId = (userId = getLocalStorage()) => {
    return userId.id;
    
}
const logout = (event) => {
    event.preventDefault();
    localStorage.setItem('isLogin', false)
    localStorage.removeItem("userData");
    window.location.href = `${window.origin}/index.html`
}
tambahMovie.addEventListener("click", addNewMovies)
tampilUsername();
