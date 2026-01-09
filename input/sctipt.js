function getValues(){
    let name = document.getElementById("input1").value
    let age = document.getElementById("input2").value
    return [name, age]
}
function resotoreValue(){
    document.getElementById("input1").value = ''
    document.getElementById("input2").value = ''
}
let btn = document.querySelector(".btn")
let tbody = document.getElementById("tbody")
let count = 2
btn.addEventListener("click", () => {
    let [name, age] = getValues()
    let tr = document.createElement('tr')
    let tdId = document.createElement('td')
    let tdName = document.createElement("td")
    let tdAge = document.createElement("td")

    tdId.textContent = count
    tdName.textContent = name
    tdAge.textContent = age
    
    tr.appendChild(tdId)
    tr.appendChild(tdName)
    tr.appendChild(tdAge)

    count++
    tbody.appendChild(tr)
    resotoreValue()
})
