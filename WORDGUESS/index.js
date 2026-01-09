const words = [
    "APPLE", "BREAD", "CHAIR", "TABLE", "HOUSE", "WATER", "LIGHT", "MONEY", "WORLD", "HEART",
    "BRAIN", "STARS", "FLAME", "PLANT", "RIVER", "STONE", "GHOST", "SWORD", "CROWN", "DRINK",
    "MUSIC", "TRUCK", "BERRY", "DREAM", "BUNNY", "GLASS", "SHEET", "PLATE", "SPOON", "HORSE",
    "MONEY", "CLOUD", "PHONE", "CLOCK", "BRUSH", "TRAIN", "BEACH", "FIELD", "TRACK", "NURSE",
    "EVENT", "TIGER", "DUCKS", "BERRY", "PRIDE", "SCALE", "GLOVE", "BLADE", "BRICK", "CANDY",
    "FLUID", "HELMO", "HONEY", "MAPLE", "PEARL", "COINS", "CABIN", "CAMEL", "COAST", "FLOUR",
    "FENCE", "GRAPE", "HOUSE", "HOUND", "JUICE", "KNIFE", "LUNCH", "MOUSE", "NAVEL", "OCEAN",
    "PEACH", "PIZZA", "QUEEN", "QUILL", "RAILS", "RANCH", "ROBIN", "ROVER", "SCALE", "SHEEP",
    "SHORE", "SHEET", "SLATE", "SMILE", "SNAKE", "SPOON", "STACK", "STAFF", "STALK", "STONE",
    "STORM", "TABLE", "TIGER", "TRUNK", "UNCLE", "VAULT", "VENUE", "VIRUS", "WAGON", "WATCH",
    "WHEAT", "WORLD", "YACHT", "YEAST", "ZEBRA", "ACORN", "ALBUM", "ANGEL", "ARROW", "ATLAS",
    "BATCH", "BENCH", "BERRY", "BRAND", "BUNCH", "CABLE", "CANDY", "CATCH", "CHAIN", "CHART",
    "CHEST", "CHILD", "CHOIR", "CIVIL", "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLOCK", "CLOTH",
    "COACH", "COAST", "COLOR", "COUNT", "COURT", "COVER", "CRAFT", "CRASH", "CREAM", "CREST",
    "CRIME", "CROSS", "CROWN", "CURVE", "DAILY", "DANCE", "DEATH", "DEPTH", "DERBY", "DOZEN",
    "DRAFT", "DRAMA", "DREAM", "DRESS", "DRINK", "DRIVE", "EARTH", "EIGHT", "ELDER", "ELITE",
    "EMPTY", "ENEMY", "ENTER", "ENTRY", "ERROR", "EVENT", "EXACT", "EXIST", "EXTRA", "FAITH",
    "FAULT", "FAVOR", "FEAST", "FIBER", "FIELD", "FINAL", "FLASH", "FLEET", "FLOOD", "FLOOR",
    "FOCUS", "FORCE", "FRAME", "FRONT", "FRUIT", "FULLY", "FUNNY", "GIANT", "GIVEN", "GLASS",
    "GLOBE", "GUARD", "GUESS", "GUEST", "HAPPY", "HARRY", "HEART", "HORSE", "HOUSE", "HOUND",
    "INPUT", "JUDGE", "JUICE", "KNIFE", "LUNCH", "MAPLE", "MONEY", "MOUSE", "NAVEL", "NURSE",
    "OCEAN", "PEACH", "PEARL", "PLANT", "PLATE", "PRIDE", "QUEEN", "QUILL", "RAILS", "RANCH",
    "ROBIN", "ROVER", "SCALE", "SHEEP", "SHORE", "SHEET", "SLATE", "SMILE", "SNAKE", "SPOON",
    "STACK", "STAFF", "STALK", "STONE", "STORM", "TABLE", "TIGER", "TRUCK", "TRUNK", "UNCLE",
    "VAULT", "VENUE", "VIRUS", "WAGON", "WATCH", "WHEAT", "WORLD", "YACHT", "YEAST", "ZEBRA"
];

let randomNumber = Math.floor(Math.random() * 16);
let answer = words[randomNumber]

const restartBtn = document.querySelector('.restart');
let title = document.querySelector('.title')

const letters = document.querySelectorAll(".letters");
let game = document.querySelector('.game')

const endMessage = document.getElementById("endMessage");
const endText = document.getElementById("endText");
const closer = document.getElementById("closeBtn");

let begin = 0
let end = 5
let count = 0
let currentIndex = 0;
let permission = true

const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const aboutBtn = document.querySelector('.about')

aboutBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

closer.addEventListener('click', () => {
    endMessage.style.display = "none";
});

document.addEventListener("keydown", (e) => {
    if (
        e.ctrlKey && (e.key === "u" || e.key === "U") ||
        e.key === "F12"
    ) {
        e.preventDefault();
        alert("Source code protected!");
    }
    if (!permission) {
        return;
    }
    const key = e.key;

    if (key.length === 1 && key.match(/[a-z]/i)) {
        if (currentIndex < letters.length && currentIndex < end) {
            letters[currentIndex].textContent = key.toUpperCase();

            currentIndex++;
        }
    }
    if (key === 'Backspace') {
        letters[currentIndex - 1].textContent = ''
        currentIndex--
    }
    let emptyCell = false
    if (key === 'Enter') {
        for (let i = 0; i < 5; i++) {
            if (letters[begin + i].textContent == '') {
                endMessage.className = "popup loss";
                endText.textContent = `Bo'sh katak qoldirdingiz!`;
                endMessage.style.display = "block";
                emptyCell = true
                break;
            }
        }
        if (!emptyCell) {
            count++
            let correctCount = 0
            for (let i = 0; i < 5; i++) {
                if (answer[i] === letters[begin + i].textContent) {
                    letters[begin + i].style.backgroundColor = 'darkgreen'
                    correctCount++
                }
                else if (answer.includes(letters[begin + i].textContent)) {
                    letters[begin + i].style.backgroundColor = 'orange'
                }
                else if (!(answer.includes(letters[begin + i].textContent))) {
                    letters[begin + i].style.backgroundColor = 'darkred'
                }
            }
            begin += 5
            end += 5
            currentIndex = end - 5
            if (correctCount == 5) {
                permission = false
                endMessage.className = "popup win";
                endText.textContent = "🎉 Tabriklayman! Siz yutdingiz! 🎉";
                endMessage.style.display = "block";
            }

            if (count == 6 && permission == true) {
                endMessage.className = "popup loss";
                endText.textContent = `😞 Afsuski, siz yutqazdingiz! To'g'ri so'z: '${answer}' edi.`;
                endMessage.style.display = "block";
            }
        }
    }
});

restartBtn.addEventListener('click', () => {
    location.reload()
});