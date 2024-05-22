let form = document.getElementById('form');
let inputBox = document.getElementById('inputBox');
let displayBox = document.getElementById('displayBox');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let cityName = inputBox.value;
    let key = Object.keys(localStorage);
    if (key.includes(cityName)) {
        alert("Success")
        inputBox.value = "";
        return;
    } else {
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;
        try {
            let response = await fetch(apiUrl)
            if (!response.ok) {
                throw new Error('Network Se API Fetch Nahi huwi')
            }
            let finalData = await response.json()
            let cityTemp = finalData.main.temp;
            let condition = finalData.weather[0].descripation;
            let countryName = finalData.sys.country;
            let icon = finalData.weather[0].icon;
            let data = { cityTemp, condition, icon, countryName };
            localStorage.setItem(`${cityName}`, JSON.stringify(data))
            displayData();
            inputBox.value = '';
        } catch (error) {
            inputBox.value = '';
                    inputBox.placeholder = "City Not Found";
                    alert("city Not Found")
                    console.error('There was a problem with the fetch operation:', error);
        }
    }
})

function displayData() {
    let keys = Object.keys(localStorage);
    displayBox.innerHTML = '';
    keys.forEach((key) => {
        let element = JSON.parse(localStorage.getItem(key));
        let box = `
        <div class="col-lg-3 col-sm-4 shadow-lg">
        <div class="card position-relative my-2 text-center pt-3">
            <h4>${element.countryName}</h4>
            <h5 class="card-title text-capitalize">${key}</h5>
            <p class="text-uppercase fw-bold">${element.cityTemp}</p>
            <img src="https://openweathermap.org/img/wn/${element.icon}@2x.png" class="card-img-top"/>
            <div class="card-body">
                <p class="text-uppercase fw-bold">${element.condition}</p>
            </div>
            <button class="btn position-absolute end-0 fs-5 top-0" onclick="remove('${key}')"><i class="fa-solid fa-xmark"></i></button>
        </div>
        </div>`;
        displayBox.innerHTML += box;
    });
}
function remove(cityName) {
    localStorage.removeItem(cityName);
    displayData();
}
displayData();