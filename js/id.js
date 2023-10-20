function oneClick() {
    const username = document.querySelector(".searchs").value;
    searchUser(username);
}

async function searchUser(username) {
    if (username === '') {
        alert("Digite um usuário");
    } else {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.status === 200) {
                const data = await response.json();
                updateUserInfo(data);
                fetchRepos(username);
            } else {
                alert("Usuário não encontrado");
            }
        } catch (error) {
            console.error(error);
            alert("Ocorreu um erro ao buscar o usuário");
        }
    }
}

function updateUserInfo(data) {
    const userFoto = document.getElementById("userFoto");
    const h2Element = document.querySelector("#information h2");
    const aElement = document.querySelector("#information a");
    const pElement = document.querySelector("#information p");
    
    userFoto.src = data.avatar_url;
    h2Element.textContent = data.login;
    aElement.href = data.html_url;
    aElement.textContent = data.html_url;
    pElement.textContent = data.bio || "No bio available";
}

async function fetchRepos(username) {
    try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        if (reposResponse.status === 200) {
            const reposData = await reposResponse.json();
            displayRepos(reposData);
        } else {
            alert("Não foi possível buscar os repositórios do usuário");
        }
    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao buscar os repositórios");
    }
}

function displayRepos(reposData) {
    const reposList = document.getElementById("repos-list");
    reposList.innerHTML = "";

    reposData.forEach(repo => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(listItem);
    });
}

