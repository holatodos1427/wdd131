
document.getElementById('current-year').textContent = new Date().getFullYear();

document.getElementById('last-modified').textContent = document.lastModified;

const temperature = 8; 
const windSpeed = 20; 

function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

if (temperature <= 10 && windSpeed > 4.8) {
    let windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById('wind-chill').textContent = windChill.toFixed(1) + '°C';
} else {
    document.getElementById('wind-chill').textContent = 'N/A';
}