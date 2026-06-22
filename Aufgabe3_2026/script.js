

import persons from "./persons.json" with { type: "json" };
console.log(persons);

let currentSortColumn = "";
let currentSortOrder = "asc"; 

function renderPersons() {
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
    for (const person of persons) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.groesse}</td>
            <td>${person.geburtsdatum}</td>
            <td>${person.herkunft}</td>
            <td>${person.gewicht}</td>
        `;
        tbody.appendChild(tr);
    }
}

function sortiereSpalte(key, istNummer) {
    if (currentSortColumn === key) {
        if (currentSortOrder === "asc") {
            currentSortOrder = "desc";
        } else {
            currentSortOrder = "asc";
        }
    } else {
        currentSortColumn = key;
        currentSortOrder = "asc";
    }

    persons.sort((a, b) => {
        let wertA = a[key];
        let wertB = b[key];

        if (istNummer) {
            if (currentSortOrder === "asc") {
                return wertA - wertB;
            } else {
                return wertB - wertA;
            }
        } else {
            if (currentSortOrder === "asc") {
                return wertA.localeCompare(wertB);
            } else {
                return wertB.localeCompare(wertA);
            }
        }
    });

    renderPersons();
}

document.querySelector("#sort-id").addEventListener("click", () => sortiereSpalte("id", true));
document.querySelector("#sort-name").addEventListener("click", () => sortiereSpalte("name", false));
document.querySelector("#sort-groesse").addEventListener("click", () => sortiereSpalte("groesse", true));
document.querySelector("#sort-geburtsdatum").addEventListener("click", () => sortiereSpalte("geburtsdatum", false));
document.querySelector("#sort-herkunft").addEventListener("click", () => sortiereSpalte("herkunft", false));
document.querySelector("#sort-gewicht").addEventListener("click", () => sortiereSpalte("gewicht", true));

window.renderPersons = renderPersons;
renderPersons();