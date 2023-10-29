const usernameInput = document.getElementById("username-input");
const searchButton = document.getElementById("search-button");
const avatar = document.getElementById("avatar");
const fullname = document.getElementById("fullname");
const username = document.getElementById("username");
const bio = document.getElementById("bio");
const email = document.getElementById("email");
const locationtag = document.getElementById("location");
const gists = document.getElementById("gists");
const reposList = document.getElementById("repos");

searchButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username !== "") {
        fetchUserInfo(username);
    }
});

function fetchUserInfo(gitname) {
    fetch(`https://api.github.com/users/${gitname}`)
        .then((response) => response.json())
        .then((data) => {
            avatar.src = data.avatar_url;
            fullname.textContent = data.name;
            username.textContent = data.login;
            bio.textContent = data.bio || "No bio available";
            email.textContent = data.email || "No email available";
            locationtag.textContent = data.location || "No location available";
            gists.innerHTML = data.public_gists;
            console.log(data);
            // Fetch repositories
            fetch(data.repos_url)
                .then((response) => response.json())
                .then((repos) => {
                    displayRepositories(repos);
                });
        })
        .catch((error) => {
            console.error(error);
            clearUserInfo();
        });
}

function displayRepositories(repos) {
    reposList.innerHTML = "";
    repos.forEach((repo) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(listItem);
    });
}

function clearUserInfo() {
    avatar.src = "";
    username.textContent = "";
    bio.textContent = "";
    reposList.innerHTML = "";
}
