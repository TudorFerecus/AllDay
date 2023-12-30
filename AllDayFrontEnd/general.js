function setUpLogIn()
{
    const signUp = userWrapper.querySelector('.sign-up')
    signUp.addEventListener("click", () => {
        window.location.replace('./sign-up/sign-up.html');
    })

    const logIn = userWrapper.querySelector('.log-in')
    logIn.addEventListener("click", () => {
        window.location.replace('./sign-up/log-in.html');
    })
}


const userIcon= `
        <ul class="icon">
            <li class="icon-list">
                <a href="#" class="icon-a">
                    <i class="fa-regular fa-user user"></i>
                </a>
            </li>
        </ul>
`;

const  logText= `
<div class="log sign-up">Sign-up/</div>
<div class="log log-in">Log-in</div>
`

const navBar = `
<div class="categories-wrapper">
<ul class="nav">
    <li><a href="#">Plan a Meet</a></li>
    <li><a href="#">Pressence</a></li>
    <li><a href="#">Tasks</a></li>
</ul>
<div class="user-wrapper">
</div>
</div>
<div class="break-line"></div>
`

const baseUrl = 'http://localhost:10000/api/v1'

document.querySelector('.top-section').innerHTML += navBar;

const userWrapper = document.querySelector('.user-wrapper')

let loggedIn = true

userWrapper.innerHTML += loggedIn ? userIcon : logText

if(!loggedIn)
{
    setUpLogIn();

}