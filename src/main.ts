import type { Ticket } from "./Ticket.ts";
let tickets : Ticket[];
let sumPrice = 0

async function init() {
  (document.getElementById("btnSend") as HTMLButtonElement).addEventListener("click", processData);

  const response = await fetch("/tickets.json");
  tickets = await response.json() as Ticket[];

  const select =document.getElementById("selectTypes") as HTMLSelectElement;
  select.innerHTML = "";
  tickets.forEach((item,index)=>{
    const option = document.createElement("option");
    option.value = index.toString();
    option.textContent = item.name;

    select.appendChild(option);
  })

}

function processData() {
  const name = document.getElementById("inpName") as HTMLInputElement;
  const type = document.getElementById("selectTypes") as HTMLSelectElement;
  const count = document.getElementById("inpCount") as HTMLInputElement;

  const table = document.getElementById("userData") as HTMLTableSectionElement;

  const row = document.createElement("tr");

  const nameCol = document.createElement("td");
  nameCol.textContent = name.value;
  row.appendChild(nameCol);
  
  const typeCol = document.createElement("td");
  typeCol.textContent = tickets[type.selectedIndex].name;
  row.appendChild(typeCol);

  const countCol = document.createElement("td");
  const price = parseInt(count.value)*tickets[type.selectedIndex].price;
  countCol.textContent = price.toString();
  row.appendChild(countCol);

  table.appendChild(row);

  sumPrice+= price;
  (document.getElementById("sumPrice") as HTMLTableCellElement).textContent = sumPrice.toString();
}

document.addEventListener("DOMContentLoaded",init);