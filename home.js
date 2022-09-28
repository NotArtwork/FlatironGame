let form = document.querySelector('#login-form')

const login = async (name) => {
    let req = await fetch(url)
    let res = await req.json()

}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let name = e.target.value
    login(name)
})

!!+[]

