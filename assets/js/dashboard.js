const urlMovies = "https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/movies"
const urlUsers = "https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/users"
const movies = [];
const tampilan = document.getElementById("main");

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
    
    showUsername.innerHTML = ` <a class="dropdown-item" href="#">${user.username}</a>
    <a class="dropdown-item" href="#" onclick="logout(event)">Logout</a>`
}

const getUserId = (userId = getLocalStorage()) => {
    return userId.id;   
}
const getMovies = async() => {
    const response = await fetch(urlMovies);
    const result = await response.json();
    const userId = getUserId();
    
    result.forEach(element => {
       movies.push(element) 
       if(userId == element.userId){
            const newDiv = document.createElement("div")
            newDiv.innerHTML = ` <div class="container" id="mainContainer">
                <div class="col-md-12 card text-center">
                    <div class="card-header">
                    <h5>${element.title}</h5>
                    </div>
                    <div class="card-body">
            
                    <img
                        src=${element.poster}
                        alt="">
                    <br>
                    <div>
                        <button type="submit" id="edit-${element.id}" class="edit-button btn btn-dark" onclick = "editMovies(event)">Edit</button>
                        <button type="submit" id="hapus-${element.id}" class="delete-button btn btn-dark" onclick = "deleteMovies(event)">Hapus</button>
                        <button type="submit" id="detail-${element.id}" class="delete-button btn btn-dark" onclick = "detailMovies(event)">Detail</button>
                    </div>
                    </div>
                    <div class="card-footer text-muted">
                    ${element.rating}
                    </div>
                </div>
                </div>`
            tampilan.appendChild(newDiv)    
       }
    });   
}

const deleteMovies = async(event)=>{
    alert("Yakin Untuk Menghapus ?")
    const id = event.target.id.replace("hapus-", "");
    console.log(id);
    
    const response = await fetch(`${urlMovies}/${id}`,{
        method : "DELETE",
    })
    await response.json();
    location.reload();
}

const editMovies = async(event)=>{
    alert("Yakin Untuk Mengedit")
    const editRating = prompt("Insert Your New Rating 0-10");
    const newRating = parseFloat(editRating);
    if(newRating>10){
        alert("Rating Maksimal 9.9")
    }
    else{
        const id = event.target.id.replace("edit-", "");
        const response = await fetch(`${urlMovies}/${id}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({rating: newRating}),
        });
        await response.json();
        location.reload();
    }
    
}

const logout = (event) => {
    event.preventDefault();
    localStorage.setItem('isLogin', false)
    localStorage.removeItem("userData");
    window.location.href = `${window.origin}/index.html`
}

getMovies();
tampilUsername()
