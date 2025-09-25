let studentName = "Allen";
let studentAge = 80;
let isEnrolled = true;
let courseCompleted = 6;

console.log(studentAge);
studentAge = 60;
console.log(studentAge);
courseCompleted = 3;

let favouriteSubjects = ['English', 'Chinese', 'Programming', 'Media', 'Film']

console.log("the second item:", favouriteSubjects[1]);
console.log("the fifth item:", favouriteSubjects[1]);

let playerScore = 0;
function increaseScore(){
    playerScore = playerScore + 1;
    console.log("分数增加！当前分数：", playerScore);
}
function displayScore(){
    console.log("玩家当前分数：", playerScore);
    return playerScore;
}

increaseScore();
increaseScore();
displayScore();

function checkScoreParity(){
    let currentScore = playerScore;

    if(currentScore % 2 === 0){
        console.log('score ${currentScore} is odd!');
        return "odd";
    } else {
        console.log('score ${currentScore} is even!');
        return "even";
    }
}

increaseScore();
checkScoreParity();
