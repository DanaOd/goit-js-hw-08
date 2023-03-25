import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector(".feedback-form"),
    email: document.querySelector('[name="email"]'),
    message: document.querySelector('[name="message"]'),
}

refs.form.addEventListener('input', throttle(onInputHandler, 500));

const LOCAL_KEY = "feedback-form-state";
const formData = {};
    

// При перезагрузці сторінки витягую в інпути дані з local storage
if (localStorage.getItem(LOCAL_KEY)){
    const parsedData =  JSON.parse(localStorage.getItem(LOCAL_KEY));
    // console.log(parsedData);
    
    // В противном случае поля должны быть пустыми.
   if (parsedData.email){
       refs.email.value = parsedData.email;
   }

   if (parsedData.message){
       refs.message.value = parsedData.message;
   }
}

function onInputHandler (event){
    formData[event.target.name] = event.target.value;
    console.log(formData);
    const stringedData = JSON.stringify(formData);
    localStorage.setItem(LOCAL_KEY, stringedData);
}


refs.form.addEventListener('submit', onSubmitHandler);



// ЗБЕРІГАЮ ДАНІ В formData
if (refs.email.value){
    formData.email = refs.email.value;
}

if (refs.message.value){
    formData.message = refs.message.value;
}


// При submit форми очищаю поля та сторедж
function onSubmitHandler (event){
    console.log(formData);
    event.preventDefault();
    event.currentTarget.reset();
    if (localStorage.getItem(LOCAL_KEY)){
        localStorage.removeItem(LOCAL_KEY);
    }
    formData.email = "";
    formData.message = "";
}