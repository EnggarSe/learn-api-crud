const urlMovies = "https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/movies"
const urlUsers = "https://5e8ecf49fe7f2a00165ee9ff.mockapi.io/users"
const movies = [];
const tampilan = document.getElementById("mainDetail");
const detail = document.getElementById("aboutMovie");
const searchInput = document.getElementById("searchTitle");

let check = localStorage.getItem('isLogin');

if (check != 'true') {
    window.location.href = `${window.origin}/index.html`
}

const getLocalStorage = () => {
    return localStorage.getItem("userData") === null
        ? []
        : JSON.parse(localStorage.getItem("userData"));
}

const tampilUsername = (user = getLocalStorage()) => {
    let showUsername = document.getElementById("username");
    console.log(user);

    showUsername.innerHTML = ` <a class="dropdown-item" href="profile.html">${user.username}</a>
    <a class="dropdown-item" href="#" onclick="logout(event)">Logout</a>`
}

const getUserId = (userId = getLocalStorage()) => {
    return userId.id;
}
const getMovies = async (filter) => {
    const response = await fetch(urlMovies);
    const result = Array.isArray(filter)? filter : await response.json();
    const userId = getUserId();
    tampilan.innerHTML = "";
    result.forEach(element => {
        movies.push(element)
        if (userId == element.userId) {
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
                        <button type="submit" id="edit-${element.id}" class="edit-button btn btn-dark" onclick = "editMovies(event)" data-toggle="modal" data-target="#myModalEdit">Edit</button>
                        <button type="submit" id="hapus-${element.id}" class="delete-button btn btn-dark" onclick = "deleteMovies(event)">Hapus</button>
                        <button type="submit" id="detail-${element.id}" class="delete-button btn btn-dark" onclick = "detailMovies(event)" data-toggle="modal" data-target="#myModalDetail">Detail</button>
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

const deleteMovies = async (event) => {
    const status = confirm("Yakin Untuk Menghapus?")
        if(status==true){
            const id = event.target.id.replace("hapus-", "");
        console.log(id);

        const response = await fetch(`${urlMovies}/${id}`, {
            method: "DELETE",
        })
        await response.json();
        location.reload();
    } 
}

const editMovies = async (event) => {
    const id = event.target.id.replace("edit-", "");
    const response = await fetch(`${urlMovies}/${id}`);
    const result = await response.json();
    const newDiv = document.getElementById("editMovie");
    newDiv.innerHTML = `<div class="form-group">
                            <input type="email" class="form-control" id="edit-title" placeholder="Title" value = "${result.title}">
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" id="edit-about" rows="5" placeholder="About">${result.about}</textarea>
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" id="edit-rating" placeholder="Rating" value = "${result.rating}">
                        </div>
                        <button  type="submit" id="update-${result.id}" onclick = "updateMovies(event)" class="btn btn-dark">Update</button>`
}

const updateMovies = async (event) => {
    event.preventDefault();
    const title = document.getElementById("edit-title").value;
    const about = document.getElementById("edit-about").value;
    const rating = document.getElementById("edit-rating").value;
    const ratingNum = parseFloat(rating);
    const update = {
        title, about, rating,
    };
    if (ratingNum >= 10) {
        alert("Maksimal rating 10")
    }
    else {
        const id = event.target.id.replace("update-", "")
        const response = await fetch(`${urlMovies}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
        });
        await response.json();
        alert("Data Updated !");
        location.reload();

    }
}
const logout = (event) => {
    event.preventDefault();
    localStorage.setItem('isLogin', false)
    localStorage.removeItem("userData");
    window.location.href = `${window.origin}/index.html`
}

const detailMovies = async (event) => {
    const id = event.target.id.replace("detail-", "");
    const response = await fetch(`${urlMovies}/${id}`);
    const result = await response.json();
    const newDiv = document.getElementById("aboutMovie");
    newDiv.innerHTML = `${result.about}`;
}

const searchMovie = async() => {
    const response = await fetch(urlMovies);
    const result = await response.json();
    const input = document.getElementById("searchTitle").value.toLowerCase();
    
    
    const filter = result.filter((element) => {
        
        if(element.title.toLowerCase().includes(input)){
            console.log(element);
            
            return element;
        }
    });
    // console.log(filter);
    
    getMovies(filter);
    
}

searchInput.addEventListener("keyup",searchMovie)
getMovies();
tampilUsername()
