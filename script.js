let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById('spinner');
let searchResultsEl = document.getElementById('searchResults');

function createAndAppendSearchResults(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item")

    let titleEl = document.createElement("a");
    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.target = "_blank"
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl)

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank"
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl)
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none")

    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}







function searchwikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none")
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });


    }
}

searchInputEl.addEventListener("keydown", searchwikipedia)