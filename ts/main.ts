// Exercise 1
let joke: string;

const getJokeAPI1 = async () => {
  const url: string = "https://icanhazdadjoke.com";
  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response: any = await fetch(url, options);
    const result: any = await response.json();
    console.log(joke);
    return result.joke;
  } catch (error) {
    console.error("Error catch:", error);
  }
};

const showJoke = (joke: string) => {
  let button = document.getElementById("btnNext") as HTMLElement;
  const jokeText = document.getElementById("jokeText") as HTMLElement;
  const scoreButtons: NodeListOf<Element> = document.querySelectorAll(".emoji-face");
  jokeText.classList.remove("d-none");
  jokeText.innerHTML = joke;
  scoreButtons.forEach((button) => {
    button.classList.remove("d-none");
  });
  button.innerHTML = "Següent";
};

//Exercise 3
interface Joke {
  joke: string;
  score: number;
  date: string;
}
const reportJokes: Joke[] = [];

const getScore = (score: number) => {
  let aLen: number = reportJokes.length;
  let lastJoke: Joke = reportJokes[aLen - 1];

  if (aLen > 0 && lastJoke.joke === joke) {
    lastJoke.score = score;
    lastJoke.date = new Date().toString();
  } else {
    reportJokes.push({
      joke: joke,
      score: score,
      date: new Date().toString(),
    });
  }
  console.table(reportJokes);
};

//Level 2 - Exercise 4

const getWeather = async () => {
  const url: string =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=Barcelona";
  const options: object = {
    method: "GET", //podriamos no ponerlo porque GET es la opción por defecto en fetch
    headers: {
      "X-RapidAPI-Key": "b3733ae624mshcc2a223b0ea4b6ap112a6bjsnc29aeec129af",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response: any = await fetch(url, options);
    const result: any = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error catch:", error);
  }
};

const showWeather = async () => {
  let result: any = await getWeather();
  const weather = document.getElementById("weather") as HTMLElement;
  const iconWeather = document.getElementById(
    "iconWeather"
  ) as HTMLImageElement;
  iconWeather.src = `https:${result.current.condition.icon}`;
  weather.innerHTML = `${result.current.temp_c}ºC `;
};

showWeather();

//Level 2 Exercise 5
const getJokeAPI2 = async () => {
  const url: string = "https://api.chucknorris.io/jokes/random";
  try {
    const response: any = await fetch(url);
    const result: any = await response.json();
    console.log(result.value);
    return result.value;
  } catch (error) {
    console.error("Error catch:", error);
  }
};

const randomNum10 = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

const getJoke = async () => {
  const randomJoke: number = randomNum10();
  if (randomJoke <= 5) {
    joke = await getJokeAPI1();

    if (!joke) {
      joke = await getJokeAPI2();
    }
  } else {
    joke = await getJokeAPI2();
    if (!joke) {
      joke = await getJokeAPI1();
    }
  }

  showJoke(joke);
  newBackground();
};

//Level 3 Exercise 6
const newBackground = (): void => {
  const bgMain = document.querySelector(".bg-main") as HTMLElement;
  const bgJokes = document.querySelector(".container-jokes") as HTMLElement;
  bgMain.style.display = "none";
  bgJokes.style.backgroundColor = "transparent";
  showBlobs(".blob-center");
  showBlobs(".blob-top-right");
  showBlobs(".blob-bottom-left");
};

const showBlobs = (classHTML: string): void => {
  const indexRandom = randomNum10();
  const bgRandom = document.querySelector(classHTML) as HTMLElement;
  bgRandom.style.backgroundImage = `url(../img/blobs/blob_${indexRandom}.svg)`;
  bgRandom.style.display = "block";
};
