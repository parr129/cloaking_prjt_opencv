import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random"; // ✅ Import random module

const path = "./data.json";

// Function to make a single commit on a random date
const markCommit = (x, y) => {
    const date = moment()
        .subtract(1, "y")
        .add(1, "w")
        .add(x, "w")
        .add(y, "d")
        .format();

    const data = {
        date: date,
    };
    console.log(date);
    jsonfile.writeFile(path, data, () => {
        simpleGit().add([path]).commit(date, { '--date': date }).push();
    });
};

// Function to make `n` random commits
const makeCommits = (n) => {
    if(n===0)return simpleGit.push();
    for (let i = 0; i < n; i++) {
        const x = random.int(0, 54); // random number of weeks
        const y = random.int(0, 6);  // random day in week
        markCommit(x, y);
    }
};

makeCommits(100); 

    