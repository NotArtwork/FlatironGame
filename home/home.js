let form = document.querySelector('#login-form')

const login = async (name) => {
    let req = await fetch(url)
    let res = await req.json()

}

form.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    let activeElement = document.activeElement;
    console.log(activeElement)
    
})

!!+[]

