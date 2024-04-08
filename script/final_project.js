//============ROLL control START ==========//
const dice1 = document.querySelector('#dice_01');
const dice2 = document.querySelector('#dice_02');
const dice3 = document.querySelector('#dice_03');
const dice4 = document.querySelector('#dice_04');
const newGameBtn = document.getElementById('new_game')
const rollBtn = document.getElementById('roll_dice');
const resultsImg =document.getElementById('results_img');
const xMark = document.getElementById('x_mark');
const resultsInfo = document.getElementById('results_info');
let popUpBox = document.getElementById('pop_up');
const roundScoreYouInfo = document.getElementById('round_score_you');
const roundScoreOpponentInfo = document.getElementById('round_score_opponent');
const totalScoreYouInfo = document.getElementById('total_score_you');
const totalScoreOpponentInfo = document.getElementById('total_score_opponent');

let rollCount = 0;

//定义player class
class PlayerScore01 {
    constructor(roundScore, totalScore) {
        this.roundScore = roundScore;
        this.totalScore = totalScore;
    }

    updateScores(roundScore, totalScore) {
        this.roundScore = roundScore;
        this.totalScore += parseInt(roundScore);
    }

    displayScores() {
        roundScoreYouInfo.innerText = this.roundScore;
        totalScoreYouInfo.innerText = this.totalScore;
    }
}

class PlayerScore02 {
    constructor(roundScore, totalScore) {
        this.roundScore = roundScore;
        this.totalScore = totalScore;
    }

    updateScores(roundScore, totalScore) {
        this.roundScore = roundScore;
        this.totalScore += parseInt(roundScore);
    }

    displayScores() {
        roundScoreOpponentInfo.innerText = this.roundScore;
        totalScoreOpponentInfo.innerText = this.totalScore;
    }
}

const rollDice = (dice, random) =>{
    dice.style.animation = 'rolling 3s';
    setTimeout(() =>{
        switch (random) {
            case 1: dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    break;
            case 2: dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                    break;
            case 3: dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                    break;
            case 4: dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                    break;
            case 5: dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                    break;
            case 6: dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                    break;
            default: break;
        }
        dice.style.animation = 'none';
    }, 3050);
}

const randomDice = () =>{
    let random1 = Math.floor(Math.random() * 6) + 1; 
    let random2 = Math.floor(Math.random() * 6) + 1; 
    let random3 = Math.floor(Math.random() * 6) + 1; 
    let random4 = Math.floor(Math.random() * 6) + 1; 

    // Check if any of the players' two dice comes up as a 1
    const randomSum01 = random1 + random2;
    if (random1 === 1 || random2 === 1) {
        playerScore01.updateScores(0, playerScore01.totalScore + 0);
    } else if (random1 === random2) {
        playerScore01.updateScores(randomSum01 * 2, playerScore01.totalScore + randomSum01 * 2);
    } else {
        playerScore01.updateScores(randomSum01, playerScore01.totalScore + randomSum01);
    }

    const randomSum02 = random3 + random4;
    if (random3 === 1 || random4 === 1) {
        playerScore02.updateScores(0, playerScore02.totalScore + 0);
    } else if (random3 === random4) {
        playerScore02.updateScores(randomSum02 * 2, playerScore02.totalScore + randomSum02 * 2);
    } else {
        playerScore02.updateScores(randomSum02, playerScore02.totalScore + randomSum02);
    }

    playerScore01.displayScores();
    playerScore02.displayScores();

    rollDice(dice1, random1); 
    rollDice(dice2, random2); 
    rollDice(dice3, random3); 
    rollDice(dice4, random4); 

    rollCount++;

    if (rollCount === 3) { // Determine whether rollCount is equal to 3

        // Display game result immediately after displaying total scores
        if (playerScore01.totalScore > playerScore02.totalScore) {
            resultsInfo.innerText = "You Win";
            resultsImg.src = "../images/win.gif";
        } else if (playerScore01.totalScore < playerScore02.totalScore) {
            resultsInfo.innerText = "Opponent Win";
            resultsImg.src = "../images/lose.gif";
        } else {
            resultsInfo.innerText = "It's a draw";
            resultsImg.src = "../images/draw.gif";
        }

         // Remove opacity class and display pop_up_box
        popUpBox.classList.remove('opacity');
    }
   
}

//初始化player的值
function resetGame() {
    rollCount = 0;
    playerScore01.roundScore = 0;
    playerScore02.roundScore = 0;
    playerScore01.totalScore = 0;
    playerScore02.totalScore = 0;
    roundScoreYouInfo.innerText = playerScore01.roundScore;
    roundScoreOpponentInfo.innerText = playerScore02.roundScore;
    totalScoreYouInfo.innerText = playerScore01.totalScore;
    totalScoreOpponentInfo.innerText = playerScore02.totalScore;

    random1 = 1;
    random2 = 1;
    random3 = 1;
    random4 = 1;

    rollDice(dice1, random1); 
    rollDice(dice2, random2); 
    rollDice(dice3, random3); 
    rollDice(dice4, random4); 
}

rollBtn.addEventListener('click', randomDice);

newGameBtn.addEventListener('click', resetGame);

function closePopUp() {
    popUpBox.classList.add('opacity');
}

xMark.addEventListener('click', function() {
    closePopUp();
});

const playerScore01 = new PlayerScore01(0, 0);
const playerScore02 = new PlayerScore02(0, 0);

//============ROLL control END ==========//

//============Nav control START ==========//
const navBox = document.getElementById('nav_present');
const navToggle = document.getElementById('nav-toggle');
const xMarkList = document.getElementById('x_mark_list');

navToggle.addEventListener('click', function() {
    navBox.classList.add('active');
});

xMarkList.addEventListener('click', function() {
    navBox.classList.remove('active');
});
//============Nav control END ==========//

//============List information control START ==========//
const showList01 = document.getElementById('show_list01');
const showList02 = document.getElementById('show_list02');
const listInfo01 = document.getElementById('list_info01');
const listInfo02 = document.getElementById('list_info02');

const toggleListInfo = (listInfo, showList) => {
    const isHidden = listInfo.classList.contains('hidden');
    const targetHeight = isHidden ? listInfo.scrollHeight : 0;
    const initialHeight = listInfo.clientHeight; 
    const duration = 200; 
    const startTime = performance.now();

    const animateHeight = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentHeight = initialHeight + (targetHeight - initialHeight) * progress;

        listInfo.style.maxHeight = currentHeight + 'px';

        if (progress < 1) {
            requestAnimationFrame(animateHeight);
        } else {
            if (isHidden) {
                listInfo.style.maxHeight = listInfo.scrollHeight + 'px';
            } else {
                listInfo.style.maxHeight = 0;
            }
            listInfo.classList.toggle('hidden');
            if (isHidden) {
                showList.innerText = 'Hide';
            } else {
                showList.innerText = 'Show';
            }
        }
    };

    requestAnimationFrame(animateHeight);
};

showList01.addEventListener('click', () => {
    toggleListInfo(listInfo01, showList01);
});

showList02.addEventListener('click', () => {
    toggleListInfo(listInfo02, showList02);
});
//============List information control END ==========//
