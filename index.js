const Api="https://api.github.com/users/"
const main=document.querySelector("#main");

const getUser = async (username) => {
  try {
    const res = await fetch(Api + username);
    const data = await res.json();

    console.log(data.name);

    const card = `
      <div class="card">
        <div>
          <img class="avatar" src="${data.avatar_url}" alt="Florib Pop"/>
        </div>
        <div class="user-info">
          <h2>${data.name}</h2>
          <p>${data.bio}</p> <!-- Assuming 'data.bio' contains the user's biography -->
          <ul class="info">
            <li>${data.followers}<strong>Followers</strong></li>
            <li>${data.following}<strong>Following</strong></li>
            <li>${data.public_repos}<strong>Repos</strong></li>
          </ul>
          <div id="repos">
            <a class="repo" href="#" target="_blank">Repo 1</a>
            <a class="repo" href="#" target="_blank">Repo 2</a>
            <a class="repo" href="#" target="_blank">Repo 3</a>
          </div>
        </div>
      </div>
    `;

    // Assuming you have a 'main' element in your HTML where you want to inject the card.
    document.getElementById('main').innerHTML = card;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  getRepos(username)
};


const getRepos=async(username)=>{
    const repos=document.querySelector("#repos")
    const response=await fetch(Api+username+"/repos")
    const data =await response.json();
    data.forEach(
      (item)=>{
        const elem=document.createElement("a")
        elem.classList.add("repo")
        elem.href=item.url
        elem.innerText=item.name
        elem.target="_blank"
        repos.appendChild(elem)
        
      }
    )
}
const form=()=>{
  const search=document.querySelector("#search")
  if(search.value!="")
  {
    getUser(search.value);
  }
  return false;
}