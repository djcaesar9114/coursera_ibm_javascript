const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');

let recommendations = [];

function checkHourInConsole(tz, city) {
    const options = { timeZone: tz, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const cityTime = new Date().toLocaleTimeString('en-US', options);
    console.log(`Current time in ${city}:`, cityTime);
}

function displayRecommendations() {
    console.log(recommendations);
    const recommendationsDiv = document.getElementById('recommendations');

    // Clear existing content
    recommendationsDiv.innerHTML = '';

    // Loop through the data and create HTML for each recommendation
    recommendations.forEach(item => {
        // Create a container div for each recommendation
        const recoDiv = document.createElement('div');
        recoDiv.classList.add('reco');

        // Add city and country name
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.innerHTML = `<span class="city">${item.city}</span> (<span class="country">${item.country}</span>)`;

        // Add image
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = `${item.city}, ${item.country}`;

        // Add description
        const descriptionP = document.createElement('p');
        descriptionP.classList.add('description');
        descriptionP.textContent = item.description;

        // Create "Show Time" button
        const button = document.createElement('button');
        button.classList.add('my-button')
        button.textContent = 'Show Time in console';
        button.addEventListener('click', () => checkHourInConsole(item.timezone, item.city));

        // Append elements to the recommendation div
        recoDiv.appendChild(nameDiv);
        recoDiv.appendChild(img);
        recoDiv.appendChild(descriptionP);
        recoDiv.appendChild(button);

        // Append recommendation div to the main container
        recommendationsDiv.appendChild(recoDiv);
    });
}

async function fetchRecommendations(keyword) {
    const response = await fetch('travel_recommendation_api.json');
    recommendations = await response.json();
    recommendations = recommendations.filter((r) => r.description.includes(keyword))
    displayRecommendations();
}

searchBtn.addEventListener('click', async () => {
    const keyword = document.getElementById('search-keyword').value.toLowerCase();
    if (['beach', 'beaches'].includes(keyword)) {
        await fetchRecommendations('beach');
    } else if (['temple', 'temples'].includes(keyword)) {
        await fetchRecommendations('temple');
    } else if (['country', 'countries'].includes(keyword)) {
        await fetchRecommendations('countr');
    } else {
        alert('No matching recommendations found.');
    }
});

resetBtn.addEventListener('click', () => {
    document.getElementById('search-keyword').value = '';
    recommendations.length = 0;
    document.getElementById('recommendations').innerHTML = '';
});