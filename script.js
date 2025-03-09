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
let isAudioPlaying = false; // 标志位，标记音频是否正在播放

const modeSelection = document.querySelector('#mode-selection.persistent');
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
const readingMode = document.getElementById('reading-mode');
const articleContent = document.getElementById('article-content');
const fullAudio = document.getElementById('full-audio');
const segmentAudio = document.getElementById('segment-audio');
const celebrateSound = document.getElementById('celebrate-sound');
const wordAudio = document.getElementById('word-audio');
let currentHighlightedSegment = null;

highestScoreDisplay.textContent = `历史最高分数: ${highestScore} (Highest Score: ${highestScore})`;

const articleSegments = [
    { text: '兔子和乌龟要赛跑了。', audio: 'audio/segment_1.mp3', articleId: 'article_1' },
    { text: '小鸟一叫: ', audio: 'audio/segment_2.mp3', articleId: 'article_2' },
    { text: '"一二三!"', audio: 'audio/segment_3.mp3', articleId: 'article_3' },
    { text: '兔子就飞快地跑了出去。', audio: 'audio/segment_4.mp3', articleId: 'article_4' },
    { text: '乌龟一步一步地向前爬。', audio: 'audio/segment_5.mp3', articleId: 'article_5' },
    { text: '兔子跑了一会儿，', audio: 'audio/segment_6.mp3', articleId: 'article_6' },
    { text: '回头看不见乌龟，', audio: 'audio/segment_7.mp3', articleId: 'article_7' },
    { text: '他很得意，', audio: 'audio/segment_8.mp3', articleId: 'article_8' },
    { text: '就想: ', audio: 'audio/segment_9.mp3', articleId: 'article_9' },
    { text: '"乌龟爬得真慢，', audio: 'audio/segment_10.mp3', articleId: 'article_10' },
    { text: '我睡一觉，', audio: 'audio/segment_11.mp3', articleId: 'article_11' },
    { text: '等他追上来我再跑，', audio: 'audio/segment_12.mp3', articleId: 'article_12' },
    { text: '我仍然可以得第一。"', audio: 'audio/segment_13.mp3', articleId: 'article_13' },
    { text: '这样一想，', audio: 'audio/segment_14.mp3', articleId: 'article_14' },
    { text: '兔子就睡起觉来了。', audio: 'audio/segment_15.mp3', articleId: 'article_15' },
    { text: '乌龟在后面不停地向前爬，', audio: 'audio/segment_16.mp3', articleId: 'article_16' },
    { text: '从兔子身边爬了过去，', audio: 'audio/segment_17.mp3', articleId: 'article_17' },
    { text: '一直爬到终点，', audio: 'audio/segment_18.mp3', articleId: 'article_18' },
    { text: '得了第一名，', audio: 'audio/segment_19.mp3', articleId: 'article_19' },
    { text: '可兔子还在那儿睡大觉呢!', audio: 'audio/segment_20.mp3', articleId: 'article_20' }
];

const allWords = {
    'level-1-1': [
        { hanzi: '龟', pinyin: 'guī', meaningCn: '乌龟', meaningEn: 'turtle', strokeCount: 7, animation: 'https://bishun.gjcha.com/9F9F.gif', audio: 'audio/words/龟.mp3' },
        { hanzi: '赛', pinyin: 'sài', meaningCn: '比赛', meaningEn: 'race, competition', strokeCount: 14, animation: 'https://bishun.gjcha.com/8D5B.gif', audio: 'audio/words/赛.mp3' },
        { hanzi: '乌', pinyin: 'wū', meaningCn: '乌鸦', meaningEn: 'crow', strokeCount: 4, animation: 'https://bishun.gjcha.com/4E4C.gif', audio: 'audio/words/乌.mp3' }
    ],
    'level-1-2': [
        { hanzi: '步', pinyin: 'bù', meaningCn: '步伐', meaningEn: 'step', strokeCount: 7, animation: 'https://bishun.gjcha.com/6B65.gif', audio: 'audio/words/步.mp3' },
        { hanzi: '爬', pinyin: 'pá', meaningCn: '爬行', meaningEn: 'to crawl', strokeCount: 8, animation: 'https://bishun.gjcha.com/722C.gif', audio: 'audio/words/爬.mp3' },
        { hanzi: '回', pinyin: 'huí', meaningCn: '返回', meaningEn: 'to return', strokeCount: 6, animation: 'https://bishun.gjcha.com/56DE.gif', audio: 'audio/words/回.mp3' }
    ],
    'level-1-3': [
        { hanzi: '得', pinyin: 'dé', meaningCn: '获得', meaningEn: 'to get', strokeCount: 11, animation: 'https://bishun.gjcha.com/5F97.gif', audio: 'audio/words/得.mp3' },
        { hanzi: '意', pinyin: 'yì', meaningCn: '意思', meaningEn: 'meaning, intention', strokeCount: 13, animation: 'https://bishun.gjcha.com/610F.gif', audio: 'audio/words/意.mp3' }
    ],
    'level-2-1': [
        { hanzi: '慢', pinyin: 'màn', meaningCn: '缓慢', meaningEn: 'slow', strokeCount: 14, animation: 'https://bishun.gjcha.com/6162.gif', audio: 'audio/words/慢.mp3' },
        { hanzi: '追', pinyin: 'zhuī', meaningCn: '追赶', meaningEn: 'to chase', strokeCount: 12, animation: 'https://bishun.gjcha.com/8FFD.gif', audio: 'audio/words/追.mp3' },
        { hanzi: '仍', pinyin: 'réng', meaningCn: '仍然', meaningEn: 'still', strokeCount: 4, animation: 'https://bishun.gjcha.com/4ECD.gif', audio: 'audio/words/仍.mp3' }
    ],
    'level-2-2': [
        { hanzi: '然', pinyin: 'rán', meaningCn: '这样', meaningEn: 'thus, so', strokeCount: 12, animation: 'https://bishun.gjcha.com/7136.gif', audio: 'audio/words/然.mp3' },
        { hanzi: '第', pinyin: 'dì', meaningCn: '次序', meaningEn: 'ordinal number (e.g., first)', strokeCount: 11, animation: 'https://bishun.gjcha.com/7B2C.gif', audio: 'audio/words/第.mp3' }
    ],
    'level-2-3': [
        { hanzi: '龟', pinyin: 'guī', meaningCn: '乌龟', meaningEn: 'turtle', strokeCount: 7, animation: 'https://bishun.gjcha.com/9F9F.gif', audio: 'audio/words/龟.mp3' },
        { hanzi: '赛', pinyin: 'sài', meaningCn: '比赛', meaningEn: 'race, competition', strokeCount: 14, animation: 'https://bishun.gjcha.com/8D5B.gif', audio: 'audio/words/赛.mp3' }
    ],
    'level-3-1': [
        { hanzi: '乌', pinyin: 'wū', meaningCn: '乌鸦', meaningEn: 'crow', strokeCount: 4, animation: 'https://bishun.gjcha.com/4E4C.gif', audio: 'audio/words/乌.mp3' },
        { hanzi: '步', pinyin: 'bù', meaningCn: '步伐', meaningEn: 'step', strokeCount: 7, animation: 'https://bishun.gjcha.com/6B65.gif', audio: 'audio/words/步.mp3' },
        { hanzi: '爬', pinyin: 'pá', meaningCn: '爬行', meaningEn: 'to crawl', strokeCount: 8, animation: 'https://bishun.gjcha.com/722C.gif', audio: 'audio/words/爬.mp3' },
        { hanzi: '回', pinyin: 'huí', meaningCn: '返回', meaningEn: 'to return', strokeCount: 6, animation: 'https://bishun.gjcha.com/56DE.gif', audio: 'audio/words/回.mp3' },
        { hanzi: '得', pinyin: 'dé', meaningCn: '获得', meaningEn: 'to get', strokeCount: 11, animation: 'https://bishun.gjcha.com/5F97.gif', audio: 'audio/words/得.mp3' }
    ],
    'level-3-2': [
        { hanzi: '意', pinyin: 'yì', meaningCn: '意思', meaningEn: 'meaning, intention', strokeCount: 13, animation: 'https://bishun.gjcha.com/610F.gif', audio: 'audio/words/意.mp3' },
        { hanzi: '慢', pinyin: 'màn', meaningCn: '缓慢', meaningEn: 'slow', strokeCount: 14, animation: 'https://bishun.gjcha.com/6162.gif', audio: 'audio/words/慢.mp3' },
        { hanzi: '追', pinyin: 'zhuī', meaningCn: '追赶', meaningEn: 'to chase', strokeCount: 12, animation: 'https://bishun.gjcha.com/8FFD.gif', audio: 'audio/words/追.mp3' },
        { hanzi: '仍', pinyin: 'réng', meaningCn: '仍然', meaningEn: 'still', strokeCount: 4, animation: 'https://bishun.gjcha.com/4ECD.gif', audio: 'audio/words/仍.mp3' },
        { hanzi: '然', pinyin: 'rán', meaningCn: '这样', meaningEn: 'thus, so', strokeCount: 12, animation: 'https://bishun.gjcha.com/7136.gif', audio: 'audio/words/然.mp3' }
    ],
    'level-3-3': [
        { hanzi: '第', pinyin: 'dì', meaningCn: '次序', meaningEn: 'ordinal number (e.g., first)', strokeCount: 11, animation: 'https://bishun.gjcha.com/7B2C.gif', audio: 'audio/words/第.mp3' },
        { hanzi: '龟', pinyin: 'guī', meaningCn: '乌龟', meaningEn: 'turtle', strokeCount: 7, animation: 'https://bishun.gjcha.com/9F9F.gif', audio: 'audio/words/龟.mp3' },
        { hanzi: '赛', pinyin: 'sài', meaningCn: '比赛', meaningEn: 'race, competition', strokeCount: 14, animation: 'https://bishun.gjcha.com/8D5B.gif', audio: 'audio/words/赛.mp3' },
        { hanzi: '乌', pinyin: 'wū', meaningCn: '乌鸦', meaningEn: 'crow', strokeCount: 4, animation: 'https://bishun.gjcha.com/4E4C.gif', audio: 'audio/words/乌.mp3' },
        { hanzi: '步', pinyin: 'bù', meaningCn: '步伐', meaningEn: 'step', strokeCount: 7, animation: 'https://bishun.gjcha.com/6B65.gif', audio: 'audio/words/步.mp3' }
    ]
};

const allUniqueWords = [
    { hanzi: '龟', pinyin: 'guī', meaningCn: '乌龟', meaningEn: 'turtle', strokeCount: 7, animation: 'https://bishun.gjcha.com/9F9F.gif', audio: 'audio/words/龟.mp3' },
    { hanzi: '赛', pinyin: 'sài', meaningCn: '比赛', meaningEn: 'race, competition', strokeCount: 14, animation: 'https://bishun.gjcha.com/8D5B.gif', audio: 'audio/words/赛.mp3' },
    { hanzi: '乌', pinyin: 'wū', meaningCn: '乌鸦', meaningEn: 'crow', strokeCount: 4, animation: 'https://bishun.gjcha.com/4E4C.gif', audio: 'audio/words/乌.mp3' },
    { hanzi: '步', pinyin: 'bù', meaningCn: '步伐', meaningEn: 'step', strokeCount: 7, animation: 'https://bishun.gjcha.com/6B65.gif', audio: 'audio/words/步.mp3' },
    { hanzi: '爬', pinyin: 'pá', meaningCn: '爬行', meaningEn: 'to crawl', strokeCount: 8, animation: 'https://bishun.gjcha.com/722C.gif', audio: 'audio/words/爬.mp3' },
    { hanzi: '回', pinyin: 'huí', meaningCn: '返回', meaningEn: 'to return', strokeCount: 6, animation: 'https://bishun.gjcha.com/56DE.gif', audio: 'audio/words/回.mp3' },
    { hanzi: '得', pinyin: 'dé', meaningCn: '获得', meaningEn: 'to get', strokeCount: 11, animation: 'https://bishun.gjcha.com/5F97.gif', audio: 'audio/words/得.mp3' },
    { hanzi: '意', pinyin: 'yì', meaningCn: '意思', meaningEn: 'meaning, intention', strokeCount: 13, animation: 'https://bishun.gjcha.com/610F.gif', audio: 'audio/words/意.mp3' },
    { hanzi: '慢', pinyin: 'màn', meaningCn: '缓慢', meaningEn: 'slow', strokeCount: 14, animation: 'https://bishun.gjcha.com/6162.gif', audio: 'audio/words/慢.mp3' },
    { hanzi: '追', pinyin: 'zhuī', meaningCn: '追赶', meaningEn: 'to chase', strokeCount: 12, animation: 'https://bishun.gjcha.com/8FFD.gif', audio: 'audio/words/追.mp3' },
    { hanzi: '仍', pinyin: 'réng', meaningCn: '仍然', meaningEn: 'still', strokeCount: 4, animation: 'https://bishun.gjcha.com/4ECD.gif', audio: 'audio/words/仍.mp3' },
    { hanzi: '然', pinyin: 'rán', meaningCn: '这样', meaningEn: 'thus, so', strokeCount: 12, animation: 'https://bishun.gjcha.com/7136.gif', audio: 'audio/words/然.mp3' },
    { hanzi: '第', pinyin: 'dì', meaningCn: '次序', meaningEn: 'ordinal number (e.g., first)', strokeCount: 11, animation: 'https://bishun.gjcha.com/7B2C.gif', audio: 'audio/words/第.mp3' }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 课文模式
function startArticleMode() {
    // 清除其他模式的内容
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'block';
    readingMode.style.display = 'block';
    showArticleContent();
    console.log('Article Mode started');
}

function playFullArticle() {
    console.log('Attempting to play full article audio...');
    fullAudio.src = 'audio/full_article.mp3';
    fullAudio.load();
    console.log('Full audio source set to:', fullAudio.src);
    fullAudio.play()
        .then(() => {
            console.log('Full article audio playing successfully');
            isAudioPlaying = true;
            setTimeout(() => {
                if (isAudioPlaying) {
                    document.addEventListener('click', stopAudioOnClick);
                }
            }, 500); // 延迟 500ms 绑定监听器
        })
        .catch(error => {
            console.error('Full audio play failed:', error);
            alert('无法播放课文音频，请检查浏览器权限设置或确认音频文件是否存在。\nError: ' + error.message);
        });
}

function playSegment(articleId) {
    const segment = articleSegments.find(seg => seg.articleId === articleId);
    if (!segment) {
        console.error('Segment not found for articleId:', articleId);
        return;
    }

    // 同步停止全篇音频
    if (!fullAudio.paused) {
        fullAudio.pause();
        fullAudio.currentTime = 0;
        console.log('Full article audio stopped for segment play');
    }

    // 移除现有的全局点击监听器
    document.removeEventListener('click', stopAudioOnClick);

    if (currentHighlightedSegment) {
        currentHighlightedSegment.classList.remove('highlight');
    }
    const newHighlightedSegment = articleContent.querySelector(`.segment[data-article-id="${articleId}"]`);
    newHighlightedSegment.classList.add('highlight');
    currentHighlightedSegment = newHighlightedSegment;

    segmentAudio.src = segment.audio;
    segmentAudio.load(); // 确保音频加载
    segmentAudio.play()
        .then(() => {
            console.log('Segment audio playing successfully');
            isAudioPlaying = true;
            setTimeout(() => {
                if (isAudioPlaying) {
                    document.addEventListener('click', stopAudioOnClick);
                }
            }, 500); // 延迟 500ms 绑定监听器
        })
        .catch(error => {
            console.error('Segment audio play failed:', error);
            if (error.message.includes('interrupted by a call to pause')) {
                console.warn('Playback interrupted, retrying...');
                segmentAudio.play(); // 尝试再次播放
            } else {
                alert('无法播放分段音频，请检查音频文件或网络连接。\nError: ' + error.message);
            }
        });
}

function stopAudioOnClick(event) {
    // 排除 #play-article 按钮和 .segment 元素
    if (!event.target.closest('#play-article') && !event.target.closest('.segment')) {
        fullAudio.pause();
        fullAudio.currentTime = 0;
        segmentAudio.pause();
        segmentAudio.currentTime = 0;
        isAudioPlaying = false;
        console.log('Audio stopped by click');
        document.removeEventListener('click', stopAudioOnClick);
    }
}

function showArticleContent() {
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

    const punctuation = [',', '。', ':', '!', '"', '“', '”', ' ', '，'];

    let result = '';
    articleSegments.forEach(segment => {
        const chars = segment.text.split('');
        let pinyinLine = '';
        let hanziLine = '';

        for (let i = 0; i < chars.length; i++) {
            if (chars[i] === '会' && chars[i + 1] === '儿') {
                pinyinLine += `<span class="char-pair"><span class="pinyin">huìr</span><span class="hanzi">会儿</span></span> `;
                hanziLine += '会儿';
                i++;
            } else if (chars[i] === '那' && chars[i + 1] === '儿') {
                pinyinLine += `<span class="char-pair"><span class="pinyin">nàr</span><span class="hanzi">那儿</span></span> `;
                hanziLine += '那儿';
                i++;
            } else if (punctuation.includes(chars[i])) {
                pinyinLine += `<span class="char-pair"><span class="pinyin"></span><span class="hanzi">${chars[i]}</span></span> `;
                hanziLine += chars[i];
            } else {
                const pinyin = pinyinMap[chars[i]] || chars[i];
                pinyinLine += `<span class="char-pair"><span class="pinyin">${pinyin}</span><span class="hanzi">${chars[i]}</span></span> `;
                hanziLine += chars[i];
            }
        }

        result += `
            <div class="segment" data-article-id="${segment.articleId}">
                <div class="pinyin-line">${pinyinLine.trim()}</div>
            </div>
        `;
    });

    articleContent.innerHTML = result;
    console.log('Article content generated:', articleContent.innerHTML);

    const segments = articleContent.querySelectorAll('.segment');
    segments.forEach(segment => {
        segment.addEventListener('click', () => {
            const articleId = segment.getAttribute('data-article-id');
            playSegment(articleId);
        });
    });
}

function exitArticleMode() {
    fullAudio.pause();
    fullAudio.currentTime = 0;
    segmentAudio.pause();
    segmentAudio.currentTime = 0;
    isAudioPlaying = false;
    document.removeEventListener('click', stopAudioOnClick);
    articleMode.style.display = 'none';
    readingMode.style.display = 'none';
    articleContent.innerHTML = ''; // 清除课文内容
}

// 单字模式
function startSingleWordMode() {
    fullAudio.pause();
    fullAudio.currentTime = 0;
    segmentAudio.pause();
    segmentAudio.currentTime = 0;
    document.removeEventListener('click', stopAudioOnClick);
    wordAudio.pause();
    wordAudio.currentTime = 0;
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    articleMode.style.display = 'none';
    singleWordMode.style.display = 'block';
    showSingleWordList();
    console.log('Single Word Mode started');
}

function showSingleWordList() {
    let clickCountMap = new Map();

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

    const handleWordClick = (event) => {
        const hanzi = event.currentTarget.getAttribute('data-hanzi');
        const word = allUniqueWords.find(w => w.hanzi === hanzi);
        let clickCount = clickCountMap.get(hanzi) || 0;
        clickCount++;
        clickCountMap.set(hanzi, clickCount);

        if (word) {
            wordItems.forEach(i => i.classList.remove('highlight'));
            event.currentTarget.classList.add('highlight');
            singleHanzi.textContent = word.hanzi;
            singlePinyin.textContent = `拼音: ${word.pinyin} (Pinyin: ${word.pinyin})`;
            singleMeaning.innerHTML = `含义: ${word.meaningCn}<br>Meaning: ${word.meaningEn}`;
            singleStrokes.textContent = `笔画数: ${word.strokeCount} (Stroke Count: ${word.strokeCount})`;
            singleAnimationGif.src = word.animation;
            singleAnimationGif.style.display = 'block';
            singleAnimationFallback.style.display = 'none';
            wordAudio.src = word.audio;
            wordAudio.play().catch(error => console.error('Word audio play failed:', error));
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

            if (clickCount === 2) {
                event.currentTarget.removeEventListener('click', handleWordClick);
                console.log(`移除全局点击监听器 for ${hanzi}`);
            }
        }
    };

    wordItems.forEach(item => item.addEventListener('click', handleWordClick));
}

function animateSingleStrokeOrder() {
    if (singleHanziWriter) singleHanziWriter.animateCharacter();
}

function exitSingleWordMode() {
    wordAudio.pause();
    wordAudio.currentTime = 0;
    singleWordMode.style.display = 'none';
}

// 练习模式
function startPracticeMode() {
    fullAudio.pause();
    fullAudio.currentTime = 0;
    segmentAudio.pause();
    segmentAudio.currentTime = 0;
    document.removeEventListener('click', stopAudioOnClick);
    wordAudio.pause();
    wordAudio.currentTime = 0;
    practiceIndex = 0;
    practiceWords = shuffle([...allUniqueWords]);
    gameMode.style.display = 'none';
    articleMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    practiceMode.style.display = 'block';
    showPracticeWord();
    console.log('Practice Mode started');
}

function showPracticeWord() {
    const word = practiceWords[practiceIndex];
    flashcardHanzi.textContent = word.hanzi;
    flashcardPinyin.textContent = `拼音: ${word.pinyin} (Pinyin: ${word.pinyin})`;
    flashcardMeaning.innerHTML = `含义: ${word.meaningCn}<br>Meaning: ${word.meaningEn}`;
    isFlipped = false;
    flashcard.classList.remove('flipped');
    wordAudio.src = word.audio;

    const playButton = document.querySelector('#practice-controls button:nth-child(1)');
    let clickCount = 0;
    const handlePlayClick = () => {
        clickCount++;
        if (wordAudio.src) {
            wordAudio.play().catch(error => console.error('Word audio play failed:', error));
            if (clickCount === 2) {
                playButton.removeEventListener('click', handlePlayClick);
                console.log(`移除全局点击监听器 for ${word.hanzi} audio`);
            }
        } else {
            console.error('Word audio source not set');
        }
    };
    playButton.removeEventListener('click', handlePlayClick);
    playButton.addEventListener('click', handlePlayClick);
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
    wordAudio.pause();
    wordAudio.currentTime = 0;
    practiceMode.style.display = 'none';
}

// 游戏模式
function startGameMode() {
    fullAudio.pause();
    fullAudio.currentTime = 0;
    segmentAudio.pause();
    segmentAudio.currentTime = 0;
    document.removeEventListener('click', stopAudioOnClick);
    wordAudio.pause();
    wordAudio.currentTime = 0;
    practiceMode.style.display = 'none';
    articleMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    gameMode.style.display = 'block';
    setLevel(currentLevel, currentSubLevel);
    console.log('Game Mode started');
}

function exitGameMode() {
    gameMode.style.display = 'none';
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
        level1WrongWords = gameState.wrongWords;
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

    let shuffledHanzi = [...words];
    let shuffledPinyin = [...words];
    for (let i = 0; i < 3; i++) {
        shuffledHanzi = shuffle(shuffledHanzi);
        shuffledPinyin = shuffle(shuffledPinyin);
    }

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

// 绑定模式选择按钮事件
document.addEventListener('DOMContentLoaded', function() {
    // 默认隐藏所有模式，只显示模式选择
    practiceMode.style.display = 'none';
    gameMode.style.display = 'none';
    singleWordMode.style.display = 'none';
    articleMode.style.display = 'none';
    readingMode.style.display = 'none';

    // 绑定按钮点击事件
    const articleButton = document.querySelector('#mode-selection button:nth-child(1)');
    const practiceButton = document.querySelector('#mode-selection button:nth-child(2)');
    const gameButton = document.querySelector('#mode-selection button:nth-child(3)');
    const singleWordButton = document.querySelector('#mode-selection button:nth-child(4)');

    articleButton.addEventListener('click', startArticleMode);
    practiceButton.addEventListener('click', startPracticeMode);
    gameButton.addEventListener('click', startGameMode);
    singleWordButton.addEventListener('click', startSingleWordMode);

    // 初始化单字模式列表（仅生成 DOM，不显示）
    showSingleWordList();
});
