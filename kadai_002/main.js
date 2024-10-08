// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let gameEnded = false; // ゲーム終了のフラグ

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typecount = document.getElementById('typecount'); // 現在のタイプ数を表示する要素
const timeoutMessage = document.getElementById('timeout-message'); // タイムアップメッセージの要素

// 複数のテキストを格納する配列
const textLists = [
    'Hello World', 'This is my App', 'How are you?', 'Today is sunny',
    'I love JavaScript!', 'Good morning', 'I am Japanese', 'Let it be',
    'Samurai', 'Typing Game', 'Information Technology', 'I want to be a programmer',
    'What day is today?', 'I want to build a web app', 'Nice to meet you',
    'Chrome Firefox Edge Safari', 'machine learning', 'Brendan Eich',
    'John Resig', 'React Vue Angular', 'Netscape Communications',
    'undefined null NaN', 'Thank you very much', 'Google Apple Facebook Amazon',
    'ECMAScript', 'console.log', 'for while if switch', 'var let const',
    'Windows Mac Linux iOS Android', 'programming'
];

// ランダムなテキストを表示
const createText = () => {
    if (gameEnded) return; // ゲーム終了時には新しいテキストを表示しない
    typed = '';
    typedfield.textContent = typed;
    let random = Math.floor(Math.random() * textLists.length);
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
    if (gameEnded) return; // ゲーム終了時にはキー入力を無視する

    if (e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }
    score++;
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // 現在のタイプ数を更新
    typecount.textContent = score;

    if (untyped === '') {
        createText();
    }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
    let text = '';
    if (score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if (score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if (score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else {
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }
    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);
    gameEnded = true; // ゲーム終了フラグを設定
    untypedfield.textContent = ''; // ランダム文字をクリア	timeoutMessage.textContent = 'タイムアップ!';
    typedfield.textContent = ''; // 正しくタイプされた文字もクリア
    timeoutMessage.textContent = 'タイムアップ!';
    setTimeout(() => {
        const result = confirm(rankCheck(score));
        if (result) {
            window.location.reload();
        }
    }, 2000); // タイムアップメッセージが表示されてから2秒後にゲームオーバー処理を実行
};

// カウントダウンタイマー
const timer = () => {
    let time = parseInt(count.textContent, 10); // 数値に変換
    timeoutMessage.textContent = ''; // タイムアップメッセージをクリア
    const id = setInterval(() => {
        time--;
        count.textContent = time;
        if (time <= 0) {
            gameOver(id); // タイムアップメッセージを表示してからゲームオーバー処理を呼び出す
        }
    }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
    timer();
    createText();
    start.style.display = 'none';
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
