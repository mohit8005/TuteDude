const Red = document.getElementById('box-1');
const Blue = document.getElementById('box-2');
const Green = document.getElementById('box-3');
const Yellow = document.getElementById('box-4');
const greet = document.getElementById('greet');


Red.addEventListener('click',()=>{
    Red.style.backgroundColor = 'red';
    Red.style.color = 'white';
})

Blue.addEventListener('click',()=>{
    Blue.style.backgroundColor = 'blue';
    Blue.style.color = 'white';
})

Green.addEventListener('click',()=>{
    Green.style.backgroundColor = 'green';
    Green.style.color = 'white';
})

Yellow.addEventListener('click',()=>{
    Yellow.style.backgroundColor = 'yellow';
    // Yellow.style.color = 'white';
})

greet.addEventListener('click',()=>{
    let username = document.getElementById('username').value;
    if(username.length != 0){
        document.getElementById('name').innerText = ", " + username;
    }
    else{
        document.getElementById('name').innerText = ""; 
    }
})




