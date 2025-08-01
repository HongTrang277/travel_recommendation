const btn_search = document.getElementById("btn_search");
const resultDiv = document.getElementById('result');
const inputElement = document.getElementById("input_destination");
function searchDestination(){
    const input = document.getElementById("input_destination").value.toLowerCase().trim();
    let destinations = [];
    resultDiv.innerHTML = '';  
    fetch('travel_recommendation_api.json')
    
        .then(response => response.json())
        .then(data => {
            if(input.includes('beach')){
                destinations=data.beaches;
            } else if(input.includes('temple')){
                destinations=data.temples
            } else {
                const countryMatch = data.countries.find(country => country.name.toLowerCase().includes(input));
                if (countryMatch) {
                    destinations = countryMatch.cities;
                }
            }
            displayResults(destinations);
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
          });
}

function displayResults(destinations){
    if(destinations.length===0){
        resultDiv.innerHTML = '<p>No destinations found. Please try a different keyword like "beach", "temple", or a country name like "Japan".</p>';
        return;
    }
    const destinationsHTML = destinations.map(dest => `
        <div class="destination_card">
            <img src="${dest.imageUrl}" alt="${dest.name}">
            <h3>${dest.name}</h3>
            <p>${dest.description}</p>
            <p>Current time in ${dest.name}: ${displayTime(dest.timezone)}</p>
        </div> 
    `).join(''); // SỬA LỖI 2: Xóa dấu ; thừa và join mảng lại

    resultDiv.innerHTML = destinationsHTML; // Cập nhật DOM chỉ 1 lần
}

btn_search.addEventListener('click', searchDestination);
const btn_clear = document.getElementById('btn_clear');
btn_clear.addEventListener('click', () => {
    inputElement.value = '';
    resultDiv.innerHTML = '';
})

function displayTime(timezone) {
    const options = {
        timeZone: timezone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return new Date().toLocaleTimeString('en-US',options);
}