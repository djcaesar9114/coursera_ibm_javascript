const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');

async function fetchRecommendations(keyword) {
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();
    console.log(data);
}

searchBtn.addEventListener('click', async () => {
    const keyword = document.getElementById('search-keyword').value.toLowerCase();
    console.log(keyword);
    await fetchRecommendations(keyword);
    if (['beach', 'beaches'].includes(keyword)) {
        alert('Fetching beach recommendations...');
    } else if (['temple', 'temples'].includes(keyword)) {
        alert('Fetching temple recommendations...');
    } else if (['country', 'countries'].includes(keyword)) {
        alert('Fetching country recommendations...');
    } else {
        alert('No matching recommendations found.');
    }
});

resetBtn.addEventListener('click', () => {
    document.getElementById('search-keyword').value = '';
    alert('Search reset.');
});