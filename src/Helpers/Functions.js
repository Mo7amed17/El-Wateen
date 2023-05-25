
import { useEffect ,useState} from "react";


let counter=1
export const SliderToRight = (ele1,ele2,ele3)=>{
    if(counter===3){
        counter=1;
    }else
    counter++;
    switch (counter) {
        case 1:
            {   
                ele1.style.transitionDuration="0.8s"
                ele1.style.visibility="visible"
                ele1.style.left="50%"
                ele2.style.left="-55%"
                ele3.style.left="150%"
                ele2.style.visibility="hidden"
                ele3.style.visibility="hidden"
                ele2.style.transitionDuration="0s"
                ele3.style.transitionDuration="0s"
                break;
            }
        case 2:
            {
                ele2.style.visibility="visible"
                ele1.style.visibility="hidden"
                ele3.style.visibility="hidden"
                ele1.style.transitionDuration="0s"
                ele3.style.transitionDuration="0s"
                ele2.style.transitionDuration="0.8s"
                ele1.style.left="150%"
                ele2.style.left="50%"
                ele3.style.left="-55%"
                break;
            }
            case 3:
                {   
                ele3.style.transitionDuration="0.8s"
                ele3.style.visibility="visible"
                ele3.style.left="50%"
                ele1.style.transitionDuration="0s"
                ele1.style.left="-55%"
                ele2.style.left="150%"
                ele1.style.visibility="hidden"
                ele2.style.visibility="hidden"
                ele2.style.transitionDuration="0s"
                break;
            }
        default:
            break;
    }
}

export const SliderToLeft=(ele1,ele2,ele3)=>{
    if(counter===1){
        counter=3;
    }else
    counter--;
    switch (counter) {
        case 1:
            {   
                ele1.style.transitionDuration="0.8s"
                ele1.style.visibility="visible"
                ele1.style.left="50%"
                ele2.style.left="-55%"
                ele3.style.left="150%"
                ele2.style.visibility="hidden"
                ele3.style.visibility="hidden"
                ele2.style.transitionDuration="0s"
                ele3.style.transitionDuration="0s"
                break;
            }
            case 2:
                {
                ele2.style.visibility="visible"
                ele1.style.visibility="hidden"
                ele3.style.visibility="hidden"
                ele1.style.transitionDuration="0s"
                ele3.style.transitionDuration="0s"
                ele2.style.transitionDuration="0.8s"
                ele1.style.left="150%"
                ele2.style.left="50%"
                ele3.style.left="-55%"
                break;
            }
            case 3:
                {   
                ele3.style.transitionDuration="0.8s"
                ele3.style.visibility="visible"
                ele3.style.left="50%"
                ele1.style.left="-55%"
                ele2.style.left="150%"
                ele1.style.visibility="hidden"
                ele2.style.visibility="hidden"
                ele1.style.transitionDuration="0s"
                ele2.style.transitionDuration="0s"
                break;
            }
        default:
            break;
        }
    }

export const CheckActivePage=()=>{
    let Active=+window.localStorage.getItem("ActivePage")
    useEffect(() => {
        let Links=document.querySelectorAll(".list li a")
        Links.forEach(Link => {
            Link.classList.remove("active-nav")
        });
        switch (Active) {
            case 0:
                Links[0].classList.add("active-nav")
                break;
            case 1:
                Links[1].classList.add("active-nav")
                break;
            case 2:
                Links[2].classList.add("active-nav")
                break;
            case 3:
                Links[3].classList.add("active-nav")
                break;
            default:
                break;
        }
    }, [Active]);
}


export const PhotoApi="https://mo7amed17.github.io/El-Wateen-Images"

export const LocationApi="https://spott.p.rapidapi.com/places/ip/me?language=ar"

export const ArrowAndNavigationBar=()=>{
    const [Direction, setDirection] = useState("right");
    useEffect(() => {
        let NavigationBar=document.querySelector(".NavigationBar")
        let Icon=document.querySelector(".NavigationBarIcon")
        Icon.addEventListener("click",(e)=>{
            setTimeout(() => {
                if(Direction==="right"){
                    Icon.childNodes[0].className="fa-solid fa-angles-left"
                    Icon.style.transitionDuration="0.5s"
                    NavigationBar.style.transitionDuration="0.5s"
                    NavigationBar.style.left="0%"
                    if(window.screen.width<=420 && window.screen.width>330){
                        Icon.style.left="171px"
                    }else if(window.screen.width<=330){
                        Icon.style.left="128px"
                    }
                    else{
                        Icon.style.left="192px"
                        NavigationBar.style.left="0%"
                    }
                    setDirection("left")
                }else if(Direction==="left"){
                        Icon.childNodes[0].className="fa-solid fa-angles-right fa-fade"
                        Icon.style.left="0%"
                        NavigationBar.style.left="-50%"
                    setDirection("right")
                }
            }, 100);
        })
    }, [Direction]);
}
