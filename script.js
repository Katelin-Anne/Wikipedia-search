document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query) {
        fetchResults(query);
    }
});

async function fetchResults(query) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${query}`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        displayResults(data.query.search);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }
    results.forEach(result => {
        const title = result.title;
        const snippet = result.snippet;
        const link = `https://en.wikipedia.org/wiki/${title.replace(/ /g, '_')}`;
        resultsContainer.innerHTML += `
            <div class="result">
                <a href="${link}" target="_blank">${title}</a>
                <p>${snippet}...</p>
            </div>
        `;
    });
}
