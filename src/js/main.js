import Handlebars from "handlebars";
import _ from "lodash";
import templateCountriesList from "bundle-text:../templates/template-countries-list.hbs";
import templateCountryInfo from "bundle-text:../templates/template-info.hbs";

import { mistake } from "../moduls/mistakes";

const container = document.querySelector("[data-container-countrie]");
const input = document.querySelector("[data-container-input]");

const normalizaCountry = (data) => {
  const contry = {
    name: data.names.official,
    capital: data.capitals[0].name,
    population: data.population,
    flag: data.flag.url_svg,
    languages: data.languages.map((l) => l.name),
  };
  return contry;
};

const getCountry = (country) => {
  const url = `https://api.restcountries.com/countries/v5/names.common?q=${country}`;
  fetch(url, {
    headers: {
      Authorization: "Bearer rc_live_af33e3380ef5442ca465b1abf46b9bfb",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Mistake: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const quantity = data.data.meta.total;
      const objects = data.data.objects;

      if (quantity === 1) {
        const contryInfo = normalizaCountry(objects[0]);
        const madeMurkup = Handlebars.compile(templateCountryInfo);
        const murkup = madeMurkup(contryInfo);
        container.innerHTML = murkup;
        return;
      }

      if (quantity >= 10) {
        mistake();
        return;
      }
      if (quantity > 1) {
        const countries = objects.map(normalizaCountry);
        const madeMurkup = Handlebars.compile(templateCountriesList);
        container.innerHTML = madeMurkup({ countries });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleSearch = (event) => {
  const target = event.target;
  const country = target.value;
  if (!country) {
    container.innerHTML = "";
    return;
  }
  getCountry(country);
};

const debounceHandleSearch = _.debounce(handleSearch, 500);

input.addEventListener("input", debounceHandleSearch);
