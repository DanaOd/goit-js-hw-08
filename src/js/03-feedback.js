const refs = {
    form: document.querySelector(".feedback-form"),
    email: document.querySelector('[name="email"]'),
    message: document.querySelector('[name="message"]'),
    button: document.querySelector('[type="submit"]'),
}

// console.log(refs.form, refs.email, refs.message, refs.button);

refs.form.addEventListener('input', onInputHandler);

const LOCAL_KEY = "feedback-form-state";
const formData = {};

if (localStorage.getItem(LOCAL_KEY)){
   const parsedData =  JSON.parse(localStorage.getItem(LOCAL_KEY));
   console.log(parsedData);
   refs.email.value = parsedData.email;
   refs.message.value = parsedData.message;
}

function onInputHandler (event){
    formData[event.target.name] = event.target.value;
    console.log(formData);
    const stringedData = JSON.stringify(formData);
    localStorage.setItem(LOCAL_KEY, stringedData);
}


refs.form.addEventListener('submit', onSubmitHandler);

function onSubmitHandler (event){
    event.preventDefault();
    event.currentTarget.reset();
    if (localStorage.getItem(LOCAL_KEY)){
        localStorage.removeItem(LOCAL_KEY);
    }
}