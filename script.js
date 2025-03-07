let score = 0;
let totalScore = 0;
let level1Score = 0;
let level2Score = 0;
let currentLevel = 1;
let currentSubLevel = 1;
let wrongWords = [];
let level1WrongWords = [];
let isFixingErrors = false;
let highestScore = parseInt(localStorage.getItem('highestScore')) || 0;
let practiceIndex = 0;
let practiceWords = [];
let singleHanziWriter = null;
let isFlipped = false;

const modeSelection = document.getElementById('mode-selection');
const currentScoreDisplay = document.getElementById('current-score');
const totalScoreDisplay = document.getElementById('total-score');
const levelDisplay = document.getElementById('level');
const levelComplete = document.getElementById('level-complete');
const levelScoreDisplay = document.getElementById('level-score');
const levelTotal = document.getElementById('level-total');
const levelTotalScoreDisplay = document.getElementById('level-total-score');
const level1Errors = document.getElementById('level-1-errors');
const wrongWordsList = document.getElementById('wrong-words-list');
const hanziContainer = document.getElementById('hanzi-container');
const pinyinContainer = document.getElementById('pinyin-container');
const celebration = document.getElementById('celebration');
const finalScoreDisplay = document.getElementById('final-score');
const finalHighestScoreDisplay = document.getElementById('final-highest-score');
const highestScoreDisplay = document.getElementById('highest-score');
const practiceMode = document.getElementById('practice-mode');
const gameMode = document.getElementById('game-mode');
const flashcard = document.querySelector('.flashcard');
const flashcardHanzi = document.getElementById('flashcard-hanzi');
const flashcardPinyin = document.getElementById('flashcard-pinyin');
const flashcardMeaning = document.getElementById('flashcard-meaning');
const singleWordMode = document.getElementById('single-word-mode');
const singleWordList = document.getElementById('single-word-list');
const singleHanzi = document.getElementById('single-hanzi');
const singlePinyin = document.getElementById('single-pinyin');
const singleMeaning = document.getElementById('single-meaning');
const singleStrokes = document.getElementById('single-strokes');
const singleAnimationGif = document.getElementById('single-animation-gif');
const singleAnimationFallback = document.getElementById('single-animation-fallback');
const singleAnimation = document.getElementById('single-animation');
const articleMode = document.getElementById('article-mode');
const articleContent = document.getElementById('article-content');
const celebrateSound = document.getElementById('celebrate-sound');

highestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;

const allWords = {
    'level-1-1': [
        { hanzi: '龟', pinyin: 'guī', meaningCn: '乌龟', meaningEn: 'turtle', strokeCount: 7, animation: 'https://bishun.gjcha.com/9F9F.gif' },
        { hanzi: '赛', pinyin: 'sài', meaningCn: '比赛', meaningEn: 'race, competition', strokeCount: 14, animation: 'https://bishun.gjcha.com/8D5B.gif' },
        { hanzi: '乌', pinyin: 'wū', meaningCn: '乌鸦', meaningEn: 'crow', strokeCount: 4, animation: 'https://bishun.gjcha.com/4E4C.gif' }
    ],
    'level-1-2': [
        { hanzi: '步', pinyin: 'bù', meaningCn: '步伐', meaningEn: 'step', strokeCount: 7, animation: 'https://bishun.gjcha.com/6B65.gif' },
        { hanzi: '爬', pinyin: 'pá', meaningCn: '爬行', meaningEn: 'to crawl', strokeCount: 8, animation: 'https://bishun.gjcha.com/722C.gif' },
        { hanzi: '回', pinyin: 'huí', meaningCn: '返回', meaningEn: 'to return', strokeCount: 6, animation: 'https://bishun.gjcha.com/56DE.gif' }
    ],
    'level-1-3': [
        { hanzi: '得', pinyin: 'dé', meaningCn: '获得', meaningEn: 'to get', strokeCount: 11, animation: 'https://bishun.gjcha.com/5F97.gif' },
        { hanzi: '意', pinyin: 'yì', meaningCn: '意思', meaningEn: 'meaning, intention', strokeCount: 13, animation: 'https://bishun.gjcha.com/610F.gif' }
    ],
    'level-2-1': [
        { hanzi: '慢', pinyin: 'màn', meaningCn: '缓慢', meaningEn: 'slow', strokeCount: 14, animation: 'https://bishun.gjcha.com/6162.gif' },
        { hanzi: '追', pinyin: 'zhuī', meaningCn: '追赶', meaningEn: 'to chase', strokeCount: 12, animation: 'https://bishun.gjcha.com/8FFD.gif' },
        { hanzi: '仍', pinyin: 'réng', meaningCn: '仍然', meaningEn: 'still', strokeCount: 4, animation: 'https://bishun.gjcha.com/4ECD.gif' }
    ],
    'level-2-2': [
        { hanzi: '然', pinyin: 'rán', meaningCn: '这样', meaningEn: 'thus, so', strokeCount: 12, animation: 'https://bishun.gjcha.com/7136.gif' },
        { hanzi: '第', pinyin: 'dì', meaningCn: '次序', meaningEn: 'ordinal number (e.g., first)', strokeCount: 11, animation: 'https://bishun.gjcha.com/7B2C.gif' }
    ],
    'level-2-3': [
        { hanzi: '龟', pinyin: 'guī', meaningCn: '乌龟', meaningEn: 'turtle', strokeCount: 7, animation: 'https://bishun.gjcha.com/9F9F.gif' },
        { hanzi: '赛', pinyin: 'sài', meaningCn: '比赛', meaningEn: 'race, competition', strokeCount: 14, animation: 'https://bishun.gjcha.com/8D5B.gif' }
    ],
    'level-3-1': [
        { hanzi: '乌', pinyin: 'wū', meaningCn: '乌鸦', meaningEn: 'crow', strokeCount: 4, animation: 'https://bishun.gjcha.com/4E4C.gif' },
        { hanzi: '步', pinyin: 'bù', meaningCn: '步伐', meaningEn: 'step', strokeCount: 7, animation: 'https://bishun.gjcha.com/6B65.gif' },
        { hanzi: '爬', pinyin: 'pá', meaningCn: '爬行', meaningEn: 'to crawl', strokeCount: 8, animation: 'https://bishun.gjcha.com/722C.gif' },
        { hanzi: '回', pinyin: 'huí', meaningCn: '返回', meaningEn: 'to return', strokeCount: 6, animation: 'https://bishun.gjcha.com/56DE.gif' },
        { hanzi: '得', pinyin: 'dé', meaningCn: '获得', meaningEn: 'to get', strokeCount: 11, animation: 'https://bishun.gjcha.com/5F97.gif' }
    ],
    'level-3-2': [
        { hanzi: '意', pinyin: 'yì', meaningCn: '意思', meaningEn: 'meaning, intention', strokeCount: 13, animation: 'https://bishun.gjcha.com/610F.gif' },
        { hanzi: '慢', pinyin: 'màn', meaningCn: '缓慢', meaningEn: 'slow', strokeCount: 14, animation: 'https://bishun.gjcha.com/6162.gif' },
        { hanzi: '追', pinyin: 'zhuī', meaningCn: '追赶', meaningEn: 'to chase', strokeCount: 12, animation: 'https://bishun.gjcha.com/8FFD.gif' },
        { hanzi: '仍', pinyin: 'réng', meaningCn: '仍然', meaningEn: 'still', strokeCount: 4, animation: 'https://bishun.gjcha.com/4ECD.gif' },
        { hanzi: '然', pinyin: 'rán', meaningCn: '这样', meaningEn: 'thus, so', strokeCount: 12, animation: 'https://bishun.gjcha.com/7136.gif' }
    ],
    'level-3-3': [
        { hanzi: '第', pinyin: 'dì', meaningCn: '次序', meaningEn: 'ordinal number (e.g., first)', strokeCount: 11, animation: 'https://bishun.gjcha.com/7B2C.gif' },
        { hanzi: '龟', pinyin: 'guī', meaningCn: '乌龟', meaningEn: 'turtle', strokeCount: 7, animation: 'https://bishun.gjcha.com/9F9F.gif' },
        { hanzi: '赛', pinyin: 'sài', meaningCn: '比赛', meaningEn: 'race, competition', strokeCount: 14, animation: 'https://bishun.gjcha.com/8D5B.gif' },
        { hanzi: '乌', pinyin: 'wū', meaningCn: '乌鸦', meaningEn: 'crow', strokeCount: 4, animation: 'https://bishun.gjcha.com/4E4C.gif' },
        { hanzi: '步', pinyin: 'bù', meaningCn: '步伐', meaningEn: 'step', strokeCount: 7, animation: 'https://bishun.gjcha.com/6B65.gif' }
    ]
};

const allUniqueWords = [
    { hanzi: '龟', pinyin: 'guī', meaningCn: '乌龟', meaningEn: 'turtle', strokeCount: 7, animation: 'https://bishun.gjcha.com/9F9F.gif' },
    { hanzi: '赛', pinyin: 'sài', meaningCn: '比赛', meaningEn: 'race, competition', strokeCount: 14, animation: 'https://bishun.gjcha.com/8D5B.gif' },
    { hanzi: '乌', pinyin: 'wū', meaningCn: '乌鸦', meaningEn: 'crow', strokeCount: 4, animation: 'https://bishun.gjcha.com/4E4C.gif' },
    { hanzi: '步', pinyin: 'bù', meaningCn: '步伐', meaningEn: 'step', strokeCount: 7, animation: 'https://bishun.gjcha.com/6B65.gif' },
    { hanzi: '爬', pinyin: 'pá', meaningCn: '爬行', meaningEn: 'to crawl', strokeCount: 8, animation: 'https://bishun.gjcha.com/722C.gif' },
    { hanzi: '回', pinyin: 'huí', meaningCn: '返回', meaningEn: 'to return', strokeCount: 6, animation: 'https://bishun.gjcha.com/56DE.gif' },
    { hanzi: '得', pinyin: 'dé', meaningCn: '获得', meaningEn: 'to get', strokeCount: 11, animation: 'https://bishun.gjcha.com/5F97.gif' },
    { hanzi: '意', pinyin: 'yì', meaningCn: '意思', meaningEn: 'meaning, intention', strokeCount: 13, animation: 'https://bishun.gjcha.com/610F.gif' },
    { hanzi: '慢', pinyin: 'màn', meaningCn: '缓慢', meaningEn: 'slow', strokeCount: 14, animation: 'https://bishun.gjcha.com/6162.gif' },
    { hanzi: '追', pinyin: 'zhuī', meaningCn: '追赶', meaningEn: 'to chase', strokeCount: 12, animation: 'https://bishun.gjcha.com/8FFD.gif' },
    { hanzi: '仍', pinyin: 'réng', meaningCn: '仍然', meaningEn: 'still', strokeCount: 4, animation: 'https://bishun.gjcha.com/4ECD.gif' },
    { hanzi: '然', pinyin: 'rán', meaningCn: '这样', meaningEn: 'thus, so', strokeCount: 12, animation: 'https://bishun.gjcha.com/7136.gif' },
    { hanzi: '第', pinyin: 'dì', meaningCn: '次序', meaningEn: 'ordinal number (e.g., first)', strokeCount: 11, animation: 'https://bishun.gjcha.com/7B2C.gif' }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startArticleMode() {
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'block';
    showArticleContent();
}

function showArticleContent() {
    let text = '兔子和乌龟要赛跑了。小鸟一叫: "一二三!" 兔子就飞快地跑了出去。乌龟一步一步地向前爬。兔子跑了一会儿，回头看不见乌龟，他很得意，就想: "乌龟爬得真慢，我睡一觉，等他追上来我再跑，我仍然可以得第一。"这样一想，兔子就睡起觉来了。乌龟在后面不停地向前爬，从兔子身边爬了过去，一直爬到终点，得了第一名，可兔子还在那儿睡大觉呢!';
    const pinyinMap = {
        '兔': 'tù', '子': 'zǐ', '和': 'hé', '乌': 'wū', '龟': 'guī', '要': 'yào', '赛': 'sài', '跑': 'pǎo', '了': 'le',
        '小': 'xiǎo', '鸟': 'niǎo', '一': 'yī', '叫': 'jiào', '二': 'èr', '三': 'sān', '就': 'jiù', '飞': 'fēi', '快': 'kuài',
        '地': 'dì', '出': 'chū', '去': 'qù', '步': 'bù', '向': 'xiàng', '前': 'qián', '爬': 'pá', '儿': 'ér',
        '回': 'huí', '头': 'tóu', '看': 'kàn', '不': 'bù', '见': 'jiàn', '他': 'tā', '很': 'hěn', '得': 'dé', '意': 'yì',
        '想': 'xiǎng', '真': 'zhēn', '慢': 'màn', '我': 'wǒ', '睡': 'shuì', '觉': 'jiào', '等': 'děng', '追': 'zhuī',
        '上': 'shàng', '来': 'lái', '再': 'zài', '仍': 'réng', '然': 'rán', '可': 'kě', '以': 'yǐ', '第': 'dì', '名': 'míng',
        '这': 'zhè', '样': 'yàng', '起': 'qǐ', '在': 'zài', '后': 'hòu', '面': 'miàn', '停': 'tíng', '从': 'cóng', '边': 'biān',
        '身': 'shēn', '过': 'guò', '直': 'zhí', '到': 'dào', '终': 'zhōng', '点': 'diǎn', '呢': 'ne', '那': 'nà', '还': 'hái',
        '大': 'dà', '会': 'huì'
    };
    const isChineseChar = char => /[\u4E00-\u9FFF]/.test(char);
    const chars = text.split('');
    let result = '';
    let lineCount = 0;

    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === '会' && chars[i + 1] === '儿') {
            result += `<span class="word-wrapper"><span class="word-item"><span class="pinyin">huìr</span><span class="hanzi">会儿</span></span></span>`;
            i++;
        }
        else if (chars[i] === '那' && chars[i + 1] === '儿') {
            result += `<span class="word-wrapper"><span class="word-item"><span class="pinyin">nàr</span><span class="hanzi">那儿</span></span></span>`;
            i++;
        }
        else if (isChineseChar(chars[i])) {
            const pinyin = pinyinMap[chars[i]] || '未知 (unknown)';
            result += `<span class="word-wrapper"><span class="word-item"><span class="pinyin">${pinyin}</span><span class="hanzi">${chars[i]}</span></span></span>`;
        } else {
            result += `<span class="word-wrapper"><span class="non-hanzi">${chars[i]}</span></span>`;
        }
        if (window.innerWidth > 600) {
            lineCount++;
            if (lineCount === 17 && i < chars.length - 1) {
                result += '<br>';
                lineCount = 0;
            }
        }
    }
    articleContent.innerHTML = result;
}

function exitArticleMode() {
    articleMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

function startSingleWordMode() {
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    articleMode.style.display = 'none';
    singleWordMode.style.display = 'block';
    showSingleWordList();
}

function showSingleWordList() {
    singleWordList.innerHTML = allUniqueWords.map(word => `
        <div class="word-item" data-hanzi="${word.hanzi}">
            <span class="pinyin">${word.pinyin}</span>
            <span class="hanzi">${word.hanzi}</span>
        </div>
    `).join('');
    singleHanzi.textContent = '';
    singlePinyin.textContent = '';
    singleMeaning.textContent = '';
    singleStrokes.textContent = '';
    singleAnimationGif.style.display = 'none';
    singleAnimationFallback.style.display = 'none';
    const wordItems = singleWordList.querySelectorAll('.word-item');
    wordItems.forEach(item => {
        item.addEventListener('click', () => {
            const hanzi = item.getAttribute('data-hanzi');
            const word = allUniqueWords.find(w => w.hanzi === hanzi);
            if (word) {
                wordItems.forEach(i => i.classList.remove('highlight'));
                item.classList.add('highlight');
                singleHanzi.textContent = word.hanzi;
                singlePinyin.textContent = `拼音: ${word.pinyin} (Pinyin: ${word.pinyin})`;
                singleMeaning.innerHTML = `含义: ${word.meaningCn}<br>Meaning: ${word.meaningEn}`;
                singleStrokes.textContent = `笔画数: ${word.strokeCount} (Stroke Count: ${word.strokeCount})`;
                singleAnimationGif.src = word.animation;
                singleAnimationGif.style.display = 'block';
                singleAnimationFallback.style.display = 'none';
                if (singleHanziWriter) {
                    singleHanziWriter.setCharacter(word.hanzi);
                } else {
                    singleHanziWriter = HanziWriter.create('single-animation', word.hanzi, {
                        width: window.innerWidth > 600 ? 150 : Math.min(150, window.innerWidth * 0.35),
                        height: window.innerWidth > 600 ? 150 : Math.min(150, window.innerWidth * 0.35),
                        padding: 5,
                        showOutline: true,
                        strokeAnimationSpeed: 1,
                        strokeHighlightSpeed: 0.5,
                        highlightColor: '#FF0000'
                    });
                }
            }
        });
    });
}

function animateSingleStrokeOrder() {
    if (singleHanziWriter) singleHanziWriter.animateCharacter();
}

function exitSingleWordMode() {
    singleWordMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

function startPracticeMode() {
    practiceIndex = 0;
    practiceWords = shuffle([...allUniqueWords]);
    modeSelection.style.display = 'flex';
    gameMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'none';
    practiceMode.style.display = 'block';
    showPracticeWord();
}

function showPracticeWord() {
    const word = practiceWords[practiceIndex];
    flashcardHanzi.textContent = word.hanzi;
    flashcardPinyin.textContent = `拼音: ${word.pinyin} (Pinyin: ${word.pinyin})`;
    flashcardMeaning.innerHTML = `含义: ${word.meaningCn}<br>Meaning: ${word.meaningEn}`;
    isFlipped = false;
    flashcard.classList.remove('flipped');
}

function flipCard() {
    isFlipped = !isFlipped;
    flashcard.classList.toggle('flipped', isFlipped);
}

function nextPracticeWord() {
    practiceIndex++;
    if (practiceIndex < practiceWords.length) {
        showPracticeWord();
    } else {
        exitPracticeMode();
    }
}

function exitPracticeMode() {
    practiceMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

function startGameMode() {
    modeSelection.style.display = 'flex';
    practiceMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'none';
    gameMode.style.display = 'block';
    setLevel(currentLevel, currentSubLevel);
}

function exitGameMode() {
    gameMode.style.display = 'none';
    modeSelection.style.display = 'flex';
    modeSelection.style.flexWrap = 'nowrap';
}

function updateScoreDisplay() {
    currentScoreDisplay.textContent = `当前关卡分数: ${score} (Current Level Score: ${score})`;
    totalScoreDisplay.textContent = `累计分数: ${totalScore} (Total Score: ${totalScore})`;
}

function saveGame() {
    const gameState = { score, totalScore, level1Score, level2Score, currentLevel, currentSubLevel, wrongWords, level1WrongWords, isFixingErrors };
    localStorage.setItem('chineseGameState', JSON.stringify(gameState));
}

function loadGame() {
    const savedState = localStorage.getItem('chineseGameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        score = gameState.score;
        totalScore = gameState.totalScore;
        level1Score = gameState.level1Score;
        level2Score = gameState.level2Score;
        currentLevel = gameState.currentLevel;
        currentSubLevel = gameState.currentSubLevel;
        wrongWords = gameState.wrongWords;
        level1WrongWords = gameState.level1WrongWords;
        isFixingErrors = gameState.isFixingErrors;
        if (isFixingErrors) fixLevel1Errors();
        else setLevel(currentLevel, currentSubLevel);
        updateScoreDisplay();
    } else {
        alert('没有找到保存的进度！(No Saved Progress Found!)');
    }
}

function startOver() {
    localStorage.removeItem('chineseGameState');
    score = 0;
    totalScore = 0;
    level1Score = 0;
    level2Score = 0;
    currentLevel = 1;
    currentSubLevel = 1;
    wrongWords = [];
    level1WrongWords = [];
    isFixingErrors = false;
    setLevel(1, 1);
}

function tryAgain() {
    localStorage.removeItem('chineseGameState');
    location.reload();
}

function done() {
    window.close();
}

function fixLevel1Errors() {
    isFixingErrors = true;
    levelDisplay.textContent = `关卡 1 错误整理 (Level 1 Error Correction)`;
    score = 0;
    updateScoreDisplay();
    levelComplete.style.display = 'none';
    level1Errors.style.display = 'block';
    celebration.style.display = 'none';
    levelTotal.style.display = 'none';
    wrongWordsList.textContent = level1WrongWords.map(word => word.hanzi).join(' ');
    hanziContainer.innerHTML = '';
    pinyinContainer.innerHTML = '';
    const shuffledHanzi = shuffle([...level1WrongWords]);
    const shuffledPinyin = shuffle([...level1WrongWords]);
    shuffledHanzi.forEach(word => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-hanzi', word.hanzi);
        card.textContent = word.hanzi;
        hanziContainer.appendChild(card);
    });
    shuffledPinyin.forEach(word => {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.setAttribute('data-pinyin', word.pinyin);
        zone.textContent = word.pinyin;
        pinyinContainer.appendChild(zone);
    });
    bindTapEvents();
}

function setLevel(level, subLevel) {
    currentLevel = level;
    currentSubLevel = subLevel;
    levelDisplay.textContent = currentLevel === 3 ? 
        `关卡 3：第十课 - 龟兔赛跑 ${currentSubLevel}/3 (Level 3: Chapter 10: A Race Between the Hare and the Tortoise ${currentSubLevel}/3)` : 
        `当前关卡: ${currentLevel}-${currentSubLevel} (Current Level: ${currentLevel}-${currentSubLevel})`;
    
    let words = allWords[`level-${level}-${subLevel}`];
    if (wrongWords.length > 0) words = [...words, ...wrongWords];
    wrongWords = [];

    isFixingErrors = false;
    score = 0;
    updateScoreDisplay();
    levelComplete.style.display = 'none';
    level1Errors.style.display = 'none';
    celebration.style.display = 'none';
    levelTotal.style.display = 'none';

    hanziContainer.innerHTML = '';
    pinyinContainer.innerHTML = '';

    // 多次洗牌以增强随机性
    let shuffledHanzi = [...words];
    let shuffledPinyin = [...words];
    for (let i = 0; i < 3; i++) { // 洗牌 3 次
        shuffledHanzi = shuffle(shuffledHanzi);
        shuffledPinyin = shuffle(shuffledPinyin);
    }

    // 随机插入汉字
    const hanziPositions = Array.from({ length: shuffledHanzi.length }, (_, i) => i);
    shuffle(hanziPositions);
    hanziPositions.forEach(pos => {
        const word = shuffledHanzi[pos];
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-hanzi', word.hanzi);
        card.textContent = word.hanzi;
        hanziContainer.appendChild(card);
    });

    // 随机插入拼音
    const pinyinPositions = Array.from({ length: shuffledPinyin.length }, (_, i) => i);
    shuffle(pinyinPositions);
    pinyinPositions.forEach(pos => {
        const word = shuffledPinyin[pos];
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.setAttribute('data-pinyin', word.pinyin);
        zone.textContent = word.pinyin;
        pinyinContainer.appendChild(zone);
    });

    bindTapEvents();
}

function bindTapEvents() {
    const cards = document.querySelectorAll('.card');
    const dropZones = document.querySelectorAll('.drop-zone');
    let selectedCard = null;
    let selectedZone = null;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (selectedCard) selectedCard.classList.remove('selected');
            if (selectedZone) selectedZone.classList.remove('selected');
            selectedCard = card;
            selectedZone = null;
            card.classList.add('selected');
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('click', () => {
            if (!selectedCard) {
                if (selectedZone) selectedZone.classList.remove('selected');
                selectedZone = zone;
                zone.classList.add('selected');
                return;
            }

            const hanzi = selectedCard.getAttribute('data-hanzi');
            const pinyin = zone.getAttribute('data-pinyin');
            const correctMatch = {};
            Object.keys(allWords).forEach(level => {
                allWords[level].forEach(word => {
                    correctMatch[word.hanzi] = word.pinyin;
                });
            });

            if (correctMatch[hanzi] === pinyin) {
                score += 10;
                const remainingCards = Array.from(cards).filter(c => c.style.display !== 'none');

                if (remainingCards.length === 1) {
                    selectedCard.classList.remove('selected');
                    selectedCard.classList.add('correct');
                    zone.classList.remove('selected');
                    zone.classList.add('correct');
                    zone.textContent = `${hanzi} - ${pinyin}`;
                    selectedCard.style.display = 'none';
                    selectedCard = null;

                    setTimeout(() => {
                        saveGame();
                        handleLevelComplete();
                    }, 1000);
                } else {
                    selectedCard.classList.remove('selected');
                    selectedCard.classList.add('correct');
                    zone.classList.remove('selected');
                    zone.classList.add('correct');
                    zone.textContent = `${hanzi} - ${pinyin}`;
                    selectedCard.style.display = 'none';
                    selectedCard = null;

                    if (remainingCards.length - 1 === 0) {
                        handleLevelComplete();
                    }
                }
            } else {
                score -= 5;
                zone.classList.add('wrong');
                setTimeout(() => zone.classList.remove('wrong'), 500);

                const wrongWord = allUniqueWords.find(w => w.hanzi === hanzi);
                if (wrongWord && !wrongWords.some(w => w.hanzi === hanzi)) wrongWords.push(wrongWord);
                if (currentLevel === 1 && wrongWord && !level1WrongWords.some(w => w.hanzi === hanzi)) level1WrongWords.push(wrongWord);
                selectedCard.classList.remove('selected');
                selectedCard = null;
            }
            updateScoreDisplay();
        });
    });
}

function handleLevelComplete() {
    if (!isFixingErrors) {
        totalScore += score;
        if (currentLevel === 1) level1Score += score;
        else if (currentLevel === 2) level2Score += score;
    }

    if (isFixingErrors) {
        wrongWords = [];
        level1WrongWords = [];
        score = totalScore;
        updateScoreDisplay();
        levelTotal.style.display = 'block';
        levelTotalScoreDisplay.textContent = `关卡 1 总分: ${level1Score} (Level 1 Total Score: ${level1Score})`;
        setTimeout(() => setLevel(2, 1), 1000);
    } else if (currentLevel === 3 && currentSubLevel === 3) {
        levelTotal.style.display = 'block';
        levelTotalScoreDisplay.textContent = `关卡 3 总分: ${totalScore} (Level 3 Total Score: ${totalScore})`;
        setTimeout(() => {
            celebration.style.display = 'block';
            levelTotal.style.display = 'none';
            finalScoreDisplay.textContent = `最终分数: ${totalScore} (Final Score: ${totalScore})`;
            if (totalScore > highestScore) {
                highestScore = totalScore;
                localStorage.setItem('highestScore', highestScore);
                highestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;
            }
            finalHighestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;
            celebrateSound.play();
            setTimeout(() => { celebrateSound.pause(); celebrateSound.currentTime = 0; }, 3000);
        }, 1000);
    } else if (currentLevel === 1 && currentSubLevel === 3) {
        if (level1WrongWords.length > 0) {
            fixLevel1Errors();
        } else {
            wrongWords = [];
            level1WrongWords = [];
            score = totalScore;
            updateScoreDisplay();
            levelTotal.style.display = 'block';
            levelTotalScoreDisplay.textContent = `关卡 1 总分: ${level1Score} (Level 1 Total Score: ${level1Score})`;
            setTimeout(() => setLevel(2, 1), 1000);
        }
    } else if (currentLevel === 2 && currentSubLevel === 3) {
        wrongWords = [];
        score = totalScore;
        updateScoreDisplay();
        levelTotal.style.display = 'block';
        levelTotalScoreDisplay.textContent = `关卡 2 总分: ${totalScore} (Level 2 Total Score: ${totalScore})`;
        setTimeout(() => setLevel(3, 1), 1000);
    } else {
        let nextLevel = currentLevel;
        let nextSubLevel = currentSubLevel + 1;
        if (nextSubLevel > 3) {
            nextLevel++;
            nextSubLevel = 1;
            wrongWords = [];
            if (nextLevel === 2 || nextLevel === 3) {
                score = totalScore;
                updateScoreDisplay();
                levelTotal.style.display = 'block';
                levelTotalScoreDisplay.textContent = `关卡 ${nextLevel - 1} 总分: ${nextLevel === 2 ? level1Score : totalScore} (Level ${nextLevel - 1} Total Score: ${nextLevel === 2 ? level1Score : totalScore})`;
                setTimeout(() => setLevel(nextLevel, nextSubLevel), 1000);
                return;
            }
        }
        levelComplete.style.display = 'block';
        levelScoreDisplay.textContent = `本关得分: ${score} (Sub-Level Score: ${score})`;
        setTimeout(() => setLevel(nextLevel, nextSubLevel), 1000);
    }
}