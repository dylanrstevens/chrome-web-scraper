import fetch from "node-fetch";
import * as cheerio from 'cheerio';

const getRawData = (URL) => {

    return fetch(URL).then((response) => response.text()).then((data) => {
        return data;
    });
}

const URL = "https://en.wikipedia.org/wiki/Frog";

const start = async () => {
    const data = await getRawData(URL);
    //console.log(data);

    const parsedData = cheerio.load(data);
    console.log(parsedData("p").text());
}

start();