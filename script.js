let authorInfo=document.getElementById('author')
let crypto=document.getElementById('crypto')
let time=document.getElementById('time')
let weather=document.getElementById("weather")
const inputBtn = document.querySelector("#input-btn")
let myLeads=[]
const inputEl=document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const deleteBtn=document.querySelector("#delete-btn")


const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

deleteBtn.addEventListener("dblclick", function(){
  localStorage.clear()
  myLeads=[]
  render(myLeads)
})

inputBtn.addEventListener("click",function(){
  myLeads.push(inputEl.value)
 // clear input field
  inputEl.value=""
 // Save the myLeads array to localStorage 
 localStorage.setItem("myLeads",JSON.stringify(myLeads))

  render(myLeads)
  console.log(localStorage.getItem("myLeads"))
})

function render(leads){
  let listItems=""
  for (let i = 0; i < leads.length; i++) {
  listItems += `
  <li>
      <a target='_blank' href = '${leads[i]}'>
        ${leads[i]}
      </a>
  </li>
  `
}
ulEl.innerHTML=listItems
}

function setImage(){
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
    })
  }
setImage()


// fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
//       .then(res=>{
//         if(!res.ok){
//           throw Error("something is wrong")
//         }
//         console.log(res.status)
//         return res.json()
//       })
//       .then(data=>{
//         crypto.innerHTML+=`<div id="crypto-top">
//         <img src="${data.image.small}" alt="${data.name} img">
//         <span class="crypto-name">${data.name}</span>
//         </div>
//         <p>🎯: $${data.market_data.current_price.cad}</p>
//         <p>👆: $${data.market_data.high_24h.cad}</p>
//         <p>👇: $${data.market_data.low_24h.cad}</p>
//         `
//       })
//       .catch(err=>console.err(err))

function setTime(){
const vn = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh',timeStyle: "short" });


const fin = new Date().toLocaleString('en-US', { timeZone: 'Europe/Helsinki', timeStyle: "short" });
document.getElementById('time-zone').innerHTML=`
<pc class="tz">Viet Nam: ${vn}</p>
<p class="tz">FinLand: ${fin}</p>
`

const date = new Date()
time.textContent=`${date.toLocaleTimeString("en-us", {timeStyle: "short"})}`
}
setInterval(setTime, 1000);

navigator.geolocation.getCurrentPosition(position => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=78202b672a43ac0dfc46fdc1e55ff7d8`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            let temp=Math.round((data.main.temp-32)/1.8)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weather.innerHTML=
            `
            <img class="image" src="${iconUrl}">
            <p class="temp">${temp}º</p>
            <p class="city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

