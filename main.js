//get local storage

let mainGet = localStorage.getItem("color-item");
if(mainGet != null){
    document.documentElement.style.setProperty("--main-color", mainGet); 
    
    document.querySelectorAll(".colors-list li").forEach((ele)=>{
        ele.classList.remove("active");
        if(ele.dataset.color == mainGet){
            ele.classList.add("active");
        }
    })
};





let backRandom = false;
let backInterval;

let backGet = localStorage.getItem("backLocal");
if(backGet != null){
    if(backGet === "true"){
        backRandom = true;
    } else{
        backRandom = false;
    }
    // document.querySelectorAll('.random-back span').forEach((ele)=>ele.classList.remove("active"));
    if(backGet === "true"){
        document.querySelector('.random-back .yes').classList.add("active");
    } else{
        document.querySelector('.random-back .no').classList.add("active");
    }
}

// change pictures
let allPics = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];
let base =  document.querySelector('.landing-page');

function random_back(){
    if(backRandom == true){
        backInterval = setInterval(() => {
            let change = Math.floor(Math.random() * allPics.length);
           base.style.backgroundImage = `url("images/${allPics[change]}")`;
        }, 5000);
    }
}
random_back();



let chooseGet = localStorage.getItem("chose");
if(chooseGet != null){
    base.style.backgroundImage = `url(${localStorage.chose})`;
}


//seetings

let setting = document.querySelector('.setting');
let clickGear = document.querySelector('.setting .gear');
clickGear.onclick = function(){
    setting.classList.toggle("open");
}


// switch colors
let colorsLi = document.querySelectorAll('.colors-list li');
colorsLi.forEach((li)=>{
    li.addEventListener("click", (e)=>{
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color-item",e.target.dataset.color );

        e.target.parentElement.querySelectorAll('.active').forEach((ele)=> ele.classList.remove("active"));
      e.target.classList.toggle("active");  
    })
})








// switch background
let backEle = document.querySelectorAll('.random-back span');
backEle.forEach((span)=>{
    span.addEventListener("click", (e)=>{
        e.target.parentElement.querySelectorAll('.active').forEach((ele)=> ele.classList.remove("active"));
      e.target.classList.toggle("active");
      
      if(e.target.dataset.back == "yes"){
        backRandom = true;
        localStorage.setItem("backLocal", true);
        random_back();
      } else{
        backRandom = false;
        clearInterval(backInterval);
        localStorage.setItem("backLocal", false);
      }
    })
});





let chooseBackground = document.querySelectorAll(".images-back img");

chooseBackground.forEach((img)=>{
    img.addEventListener("click",(e)=>{
        base.style.backgroundImage = `url(${e.target.src})`;
        localStorage.setItem('chose',e.target.src);
    })
});





let section_skills = document.querySelector('.skills');
let spans = document.querySelectorAll('.skill-progress span');

window.onscroll = function(){
    if(window.scrollY >= 770){
        console.log("khaled");
        spans.forEach((span) => {
            span.style.width = span.dataset.progress;
        });
    }
};






// popup images


let picGallery = document.querySelectorAll(".gallery img");

picGallery.forEach((img)=>{
    img.addEventListener("click",(e)=>{
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);


        let popbox = document.createElement('div');
        popbox.className ="popup-box";

        let popImg = document.createElement("img");
        popImg.src = img.src;

        popbox.appendChild(popImg);

        document.body.appendChild(popbox);

if(img.alt != null){
    let head = document.createElement("h3");
    let the_alt =document.createTextNode(img.alt);
    head.appendChild(the_alt);
    popbox.appendChild(head);
}
    
    let span = document.createElement("span");
    span.className ="closeSpan";
let text = document.createTextNode("X");
span.appendChild(text);
popbox.appendChild(span);
        
    });
})

document.addEventListener("click", (e)=>{
    if(e.target.className == 'closeSpan' ){

        document.querySelector('.popup-box').remove();
        document.querySelector('.popup-overlay').remove();
    }
});

document.onkeyup = function(e){
    if(e.key === "Escape"){
        document.querySelector('.popup-box').remove();
        document.querySelector('.popup-overlay').remove();
    }
};



let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let baseBullet = document.querySelector(".nav-bullets");
let listA = document.querySelectorAll(".list li");

let getBullet = localStorage.getItem("bullet");
if(getBullet != null){
    if(getBullet == "yes"){
        baseBullet.classList.add("active"); 
    } else{
        baseBullet.classList.remove("active");
    }
    if(getBullet === "yes"){
        document.querySelector('.bullets-choose .yes').classList.add("active");
    } else{
        document.querySelector('.bullets-choose .no').classList.add("active");
    }
};

function showSection(elements){
    elements.forEach((bullet)=>{
        bullet.addEventListener("click",(e)=>{
            // e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

showSection(allBullets);
showSection(listA);

//show bullets
let bulletChoose = document.querySelectorAll(".bullets-choose span");
bulletChoose.forEach((span)=>{
     span.addEventListener("click",(e)=>{
        e.target.parentElement.querySelectorAll('.active').forEach((ele)=> ele.classList.remove("active"));
        e.target.classList.toggle("active");
        
        if(e.target.dataset.back == "yes"){
         baseBullet.classList.add("active");
         localStorage.setItem("bullet",e.target.dataset.back);
        } else{
         baseBullet.classList.remove("active");
         localStorage.setItem("bullet",e.target.dataset.back);
        }
    })
});




// toggle menu

let menu_tog = document.querySelector(".toggle");
let theLinks = document.querySelector(".list");

menu_tog.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle("menu-toggle");
    theLinks.classList.toggle("open");
}

document.addEventListener("click",function(e){
    if(e.target != menu_tog && e.target != theLinks){
        menu_tog.classList.remove("menu-toggle");
        theLinks.classList.remove("open");
    }
})
theLinks.onclick = function(e){
e.stopPropagation();
}

