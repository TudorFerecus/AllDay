const logButton = document.querySelector('.login-button');

logButton.addEventListener("click", () => {
    const emailInput = document.querySelector('.email-input')
    const passwordInput = document.querySelector('.password-input')

    let url = baseUrl + '/users/login';
    let data = 
    {
        mail: emailInput.value,
        password: passwordInput.value
    };

    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
    })
    .then(response => {
        const setCookieHeader = response.headers.get('Set-Cookie');
        console.log(setCookieHeader);
        
    })
      .catch(error => {
        console.error('Error:', error);
      });

    
    // emailInput.value = '';
    // passwordInput.value = '';
})