let fromEL = document.querySelectorAll('.from div label')
let toEl = document.querySelectorAll('.to div label')
let f = 'EUR'
let to = "RUB"

toInp.onkeyup  = function (){ 
   showTo()
}
   
fromInp.onkeyup = function (){
   showFrom()
} 

fromEL.forEach((item) =>{
    item.addEventListener('click', function(ev){
    f = ev.target.innerText
    showFrom()
    })     
})

toEl.forEach((item) =>{
    item.addEventListener('click', function(ev){
    to = ev.target.innerText
    showTo()
    })     
})

async function showFrom() {    
   let res = await fetch(`https://api.exchangerate.host/latest?base=${f}&symbols=${to}`)
   let data = await res.json()
   curFrom.innerText = `1 ${f} ${data.rates[to].toFixed(2)} ${to}`
   curTo.innerText = `1 ${to} ${(1 / data.rates[to]).toFixed(2)} ${f}`
   toInp.value = (fromInp.value * data.rates[to]).toFixed(2)
}

async function showTo() {    
   let res = await fetch(`https://api.exchangerate.host/latest?base=${f}&symbols=${to}`)
   let data = await res.json()
   fromInp.value = (toInp.value / data.rates[to]).toFixed(2)
}
