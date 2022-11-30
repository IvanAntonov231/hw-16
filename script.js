const USER_API = "https://api.github.com/users/{{login}}";

const nameInput = document.querySelector('#nameInput');
const findButton = document.querySelector('#submitButton');
const infoTemplate = document.querySelector('#contactTemplate').innerHTML;
const userInfoDiv = document.querySelector('.userInfoDiv')

findButton.addEventListener('click', onFindButtonClick);

function onFindButtonClick(e) {
  e.preventDefault()

  const name = nameInput.value;

  if (!name) {
    return alert('Empty input')
  }

  getGitUser(name)
    .then(user => {
      renderUser(user);
      clearForm();
    })
    .catch(showError)
}

function getGitUser(name) {
  const url = USER_API.replace('{{login}}', name);

  return fetch(url).then((res) => {
    if (res.ok) { 
      return res.json();
    }
    throw new Error('Error 404');
  });
}

function renderUser(user) {
  const infoHtml = generateUserHTML(user);

  userInfoDiv.insertAdjacentHTML('afterbegin', infoHtml);
}

function generateUserHTML(user) {
  return infoTemplate
    .replace("{{repos}}", `Repos: ${user.public_repos}`)
    .replace("{{followers}}", `Followers: ${user.followers}`)
    .replace("{{following}}", `Following ${user.following}`);
}

function clearForm() {
  nameInput.value = ''
}

function showError(e) {
  alert(e.message);
}