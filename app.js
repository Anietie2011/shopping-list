applyStoredTheme();
let allList = JSON.parse(localStorage.getItem("shoppingList")) || [];
hello();
renderList();
displayTotal();
function toogleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("themes", isDark ? 'dark' : 'light');
}

function applyStoredTheme() {
  if (localStorage.getItem('themes') === 'dark') {
    document.body.classList.add('dark');
  }
}
function displayTotal(){
  if(allList.length > 0){
    document.querySelector(".total").style.display = "flex";
  }else{
    document.querySelector(".total").style.display = "none";
  }
}
document.querySelector(".add").addEventListener("click", addToList);
function addToList(){
  hello();
  let input = document.getElementById("buy").value;
  const currency = document.getElementById("currency").value;
  let ammount = document.getElementById("ammount").value;
    if(input.length > 1 && ammount.length >= 1){
    allList.unshift({
      id: generateId(),
      input,
      currency,
      bought: false,
      disabled: false,
      ammount
    });
    hello();
    renderList();
    saveList();
    displayTotal();
    document.getElementById("buy").value = "";
    document.getElementById("ammount").value = "";
  }
}
function deleteNote(listId){
  allList = allList.filter(list => list.id != listId);
  hello();
  saveList();
  displayTotal();
  renderList();
}
function generateId(){
  return Date.now().toString();
}
function saveList(){
  localStorage.setItem("shoppingList", JSON.stringify(allList));
}
function moveToAmmount(){
  if (event.key == "Enter") {
    document.getElementById("ammount").focus();
  }
}
function addEnter(){
  if (event.key == "Enter"){
    addToList();
    document.getElementById("buy").focus();
  }
}

function renderList(index){
  document.getElementById("me").innerHTML = allList.map((list, index) => `
      <li>
        <input type="checkbox" id="mark-${index}" class="test" ${list.bought ? "checked" : ""} onchange="toggleChecked(${index})" onchange="hello()">
        <label for="mark-${index}" class="ss">✓</label>
        <label for="mark-${index}" class="main">${list.input}</label>
        <span class="price" ${list.disabled ? "disabled" : ""}>${list.currency}${Number(list.ammount).toLocaleString()}</span>
        <button class="del" onclick="deleteNote('${list.id}')"><svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" ><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
      </li>
  `).join("");
}

function hello() {
  let f = "";
  let de = 0;
  const g = allList.length;
  const reduce = [];
  let bo = 0;
  const bou = allList.bought = true;
  allList.forEach(list => {
    if (list.bought === true) {
      reduce.push({
        ant: list.ammount,
        c: list.bought
      });
    }
  });
 
  reduce.forEach((re) => {
    bo += Number(re.ant);
  });
  const be = bo.toLocaleString();
  const curren = document.getElementById("currency").value;
  allList.forEach(list => {
    de += Number(list.ammount);
  });
  const fe = de.toLocaleString();

  const zz = de - bo;
  const yy = zz.toLocaleString();

  f += `<span class="name">Items <span class="bra">(${g})</span></span> <span class="to s" title="Remaning Money">${curren}${yy}<span class="tell el">Left Over</span></span> <span class="to" title="Money Spent">${curren}${be}<span class="tell f">Expenses</span></span><span class="tot" title="Total">${curren}${fe}<span class="tell tells">Total</span></span>`
  
  document.querySelector(".total").innerHTML = f;
}

window.toggleChecked = function (index) {
  allList[index].bought = !allList[index].bought;
  hello();
  saveList();
  renderList();
};

document.getElementById("ammount").setAttribute("placeholder", `${document.getElementById("currency").value}100`);

// let num = 1234.567;
// let formatted = num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// console.log(formatted);

// let num = 1234.567;
// let formatted = Number(num.toFixed(2)).toLocaleString();
// console.log(formatted);