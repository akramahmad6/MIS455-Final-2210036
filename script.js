async function getCountryInfo() {
  const country = document.getElementById("countryInput").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous results


  if (!country) {
     resultDiv.innerHTML = "<p>Please enter a country name.</p>";
     return;
   }

   try {
     const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
     if (!response.ok) throw new Error("Country not found");

     const data = await response.json();
     const countryData = data[0];

     const name = countryData.name.common;
     const capital = countryData.capital[0];
     const flag = countryData.flags.png;
     const currency = Object.values(countryData.currencies)[0].name;
     const population = countryData.population;
     const region = countryData.region;
     const languages = Object.values(countryData.languages).join(",  ");

     resultDiv.innerHTML = `
       <h2>${name}</h2>
       <img src="${flag}" alt="Flag of ${name}">
       <p><strong>Capital:</strong> ${capital}</p>
       <p><strong>Currency:</strong> ${currency}</p>
       <p><strong>Population:</strong> ${population}</p>
       <p><strong>Region:</strong> ${region}</p>
       <p><strong>Languages:</strong> ${languages}</p>
     `;
   } catch (error) {
     resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
   }
}
