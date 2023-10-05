document.addEventListener("DOMContentLoaded", () => {


    function fetchUsers() {
       const form = document.querySelector("#github-form")  
       form.addEventListener("submit", (event) => {
        event.preventDefault()
        const user = event.target.name.value
        fetch(`https://api.github.com/search/users?q=${user}`,{
            method: 'GET',
            redirect: 'follow'
        })
          .then(response => response.json())
          .then((users) =>{
          const userList = document.getElementById("user-list")
           users.items.map((user) => {
                const span = document.createElement("li")
                span.className = "user"
                span.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}" />
                <h2>${user.login}</h2>`
                userList.append(span)
                const username = user.login
                console.log(user)

                
               fetchRepos(span, username)
           })
        }).catch((error) => {
            console.log(error)
        })

    })
    
    }

    fetchUsers()

    function fetchRepos(span, username) {
        span.addEventListener("click", () => {
            fetch(`https://api.github.com/users/${username}/repos`,{
                method: 'GET',
                redirect: 'follow'
            })
              .then(response => response.json())
              .then(repos => console.log(repos))
              .then((repos) =>{
                const repositories = document.getElementById("repos-list")
               repos.map((repo) => {
                    const span = document.createElement("li")
                    span.className = "repo"
                    span.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description}</p>`
                    repositories.append(span)
                    console.log(repos)
               })
            })
    
        })
    
    }


})

