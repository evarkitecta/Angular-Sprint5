"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Exercise 1
let joke;
const getJokeAPI1 = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://icanhazdadjoke.com";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    };
    try {
        const response = yield fetch(url, options);
        const result = yield response.json();
        console.log(joke);
        return result.joke;
    }
    catch (error) {
        console.error("Error catch:", error);
    }
});
const showJoke = (joke) => {
    let button = document.getElementById("btnNext");
    const jokeText = document.getElementById("jokeText");
    const scoreButtons = document.querySelectorAll(".emoji-face");
    jokeText.classList.remove("d-none");
    jokeText.innerHTML = joke;
    scoreButtons.forEach((button) => {
        button.classList.remove("d-none");
    });
    button.innerHTML = "Següent";
};
const reportJokes = [];
const getScore = (score) => {
    let aLen = reportJokes.length;
    let lastJoke = reportJokes[aLen - 1];
    if (aLen > 0 && lastJoke.joke === joke) {
        lastJoke.score = score;
        lastJoke.date = new Date().toString();
    }
    else {
        reportJokes.push({
            joke: joke,
            score: score,
            date: new Date().toString(),
        });
    }
    console.table(reportJokes);
};
//Level 2 - Exercise 4
const getWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://weatherapi-com.p.rapidapi.com/current.json?q=Barcelona";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "b3733ae624mshcc2a223b0ea4b6ap112a6bjsnc29aeec129af",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
    };
    try {
        const response = yield fetch(url, options);
        const result = yield response.json();
        console.log(result);
        return result;
    }
    catch (error) {
        console.error("Error catch:", error);
    }
});
const showWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield getWeather();
    const weather = document.getElementById("weather");
    const iconWeather = document.getElementById("iconWeather");
    iconWeather.src = `https:${result.current.condition.icon}`;
    weather.innerHTML = `${result.current.temp_c}ºC `;
});
showWeather();
//Level 2 Exercise 5
const getJokeAPI2 = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://api.chucknorris.io/jokes/random";
    try {
        const response = yield fetch(url);
        const result = yield response.json();
        console.log(result.value);
        return result.value;
    }
    catch (error) {
        console.error("Error catch:", error);
    }
});
const randomNum10 = () => {
    return Math.floor(Math.random() * 10) + 1;
};
const getJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    const randomJoke = randomNum10();
    if (randomJoke <= 5) {
        joke = yield getJokeAPI1();
        if (!joke) {
            joke = yield getJokeAPI2();
        }
    }
    else {
        joke = yield getJokeAPI2();
        if (!joke) {
            joke = yield getJokeAPI1();
        }
    }
    showJoke(joke);
    newBackground();
});
//Level 3 Exercise 6
const newBackground = () => {
    const bgMain = document.querySelector(".bg-main");
    const bgJokes = document.querySelector(".container-jokes");
    bgMain.style.display = "none";
    bgJokes.style.backgroundColor = "transparent";
    showBlobs(".blob-center");
    showBlobs(".blob-top-right");
    showBlobs(".blob-bottom-left");
};
const showBlobs = (classHTML) => {
    const indexRandom = randomNum10();
    const bgRandom = document.querySelector(classHTML);
    bgRandom.style.backgroundImage = `url(../img/blobs/blob_${indexRandom}.svg)`;
    bgRandom.style.display = "block";
};
