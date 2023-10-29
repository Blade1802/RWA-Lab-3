const infoContainer = document.getElementById("info-container");
const noResult = document.getElementById("noResult");
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

// Event listner for search button click
searchButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username !== "") {
        fetchUserInfo(username);
    }
});

// Fetch user information
function fetchUserInfo(gitname) {
    fetch(`https://api.github.com/users/${gitname}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error fetching user: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Hide error messages and display user information
            noResult.style.display = "none";
            infoContainer.style.display = "flex";

            // Update fields with user data
            avatar.src = data.avatar_url;
            fullname.textContent = data.name;
            username.textContent = data.login;
            bio.textContent = data.bio || "No bio available";
            email.textContent = data.email || "No email available";
            locationtag.textContent = data.location || "No location available";
            gists.textContent = data.public_gists;

            // Fetch repositories
            fetch(data.repos_url)
                .then((response) => response.json())
                .then((repos) => {
                    displayRepositories(repos);
                    if (data.public_repos > 5) {
                        reposList.style.overflowY = "scroll";
                    } else {
                        reposList.style.overflowY = "visible";
                    }
                });
        })
        .catch((error) => {
            console.error(error);
            infoContainer.style.display = "none"; // Remove user data template
            noResult.style.display = "block"; // Display error message
            clearUserInfo(); // Wipe any in-progress data obtained
        });
}

// Display all the repositories along with their description
function displayRepositories(repos) {
    reposList.innerHTML = "";
    repos.forEach((repo) => {
        // Add a list item for each repo
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${repo.html_url}" target="_blank" class="fill-div">${repo.name}
        <p>${repo.description}</p></a>`;
        reposList.appendChild(listItem);
    });
}

// Clear user information
function clearUserInfo() {
    avatar.src = "";
    fullname.textContent = "";
    username.textContent = "";
    bio.textContent = "";
    email.textContent = "";
    locationtag.textContent = "";
    gists.textContent = "";
    reposList.innerHTML = "";
}
