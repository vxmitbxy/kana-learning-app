// Данные японской каны по группам
const KANA_DATA = {
    hiragana: {
        1: [
            { kana: 'あ', romaji: 'a' },
            { kana: 'い', romaji: 'i' },
            { kana: 'う', romaji: 'u' },
            { kana: 'え', romaji: 'e' },
            { kana: 'お', romaji: 'o' }
        ],
        2: [
            { kana: 'か', romaji: 'ka' },
            { kana: 'き', romaji: 'ki' },
            { kana: 'く', romaji: 'ku' },
            { kana: 'け', romaji: 'ke' },
            { kana: 'こ', romaji: 'ko' }
        ],
        3: [
            { kana: 'さ', romaji: 'sa' },
            { kana: 'し', romaji: 'shi' },
            { kana: 'す', romaji: 'su' },
            { kana: 'せ', romaji: 'se' },
            { kana: 'そ', romaji: 'so' }
        ],
        4: [
            { kana: 'た', romaji: 'ta' },
            { kana: 'ち', romaji: 'chi' },
            { kana: 'つ', romaji: 'tsu' },
            { kana: 'て', romaji: 'te' },
            { kana: 'と', romaji: 'to' }
        ],
        5: [
            { kana: 'な', romaji: 'na' },
            { kana: 'に', romaji: 'ni' },
            { kana: 'ぬ', romaji: 'nu' },
            { kana: 'ね', romaji: 'ne' },
            { kana: 'の', romaji: 'no' }
        ],
        6: [
            { kana: 'は', romaji: 'ha' },
            { kana: 'ひ', romaji: 'hi' },
            { kana: 'ふ', romaji: 'fu' },
            { kana: 'へ', romaji: 'he' },
            { kana: 'ほ', romaji: 'ho' }
        ],
        7: [
            { kana: 'ま', romaji: 'ma' },
            { kana: 'み', romaji: 'mi' },
            { kana: 'む', romaji: 'mu' },
            { kana: 'め', romaji: 'me' },
            { kana: 'も', romaji: 'mo' }
        ],
        8: [
            { kana: 'や', romaji: 'ya' },
            { kana: 'ゆ', romaji: 'yu' },
            { kana: 'よ', romaji: 'yo' }
        ],
        9: [
            { kana: 'ら', romaji: 'ra' },
            { kana: 'り', romaji: 'ri' },
            { kana: 'る', romaji: 'ru' },
            { kana: 'れ', romaji: 're' },
            { kana: 'ろ', romaji: 'ro' }
        ],
        10: [
            { kana: 'わ', romaji: 'wa' },
            { kana: 'を', romaji: 'wo' }
        ],
        11: [
            { kana: 'ん', romaji: 'n' }
        ],
        12: [
            { kana: 'が', romaji: 'ga' },
            { kana: 'ぎ', romaji: 'gi' },
            { kana: 'ぐ', romaji: 'gu' },
            { kana: 'げ', romaji: 'ge' },
            { kana: 'ご', romaji: 'go' }
        ],
        13: [
            { kana: 'ざ', romaji: 'za' },
            { kana: 'じ', romaji: 'ji' },
            { kana: 'ず', romaji: 'zu' },
            { kana: 'ぜ', romaji: 'ze' },
            { kana: 'ぞ', romaji: 'zo' }
        ],
        14: [
            { kana: 'だ', romaji: 'da' },
            { kana: 'ぢ', romaji: 'ji' },
            { kana: 'づ', romaji: 'zu' },
            { kana: 'で', romaji: 'de' },
            { kana: 'ど', romaji: 'do' }
        ],
        15: [
            { kana: 'ば', romaji: 'ba' },
            { kana: 'び', romaji: 'bi' },
            { kana: 'ぶ', romaji: 'bu' },
            { kana: 'べ', romaji: 'be' },
            { kana: 'ぼ', romaji: 'bo' }
        ],
        16: [
            { kana: 'ぱ', romaji: 'pa' },
            { kana: 'ぴ', romaji: 'pi' },
            { kana: 'ぷ', romaji: 'pu' },
            { kana: 'ぺ', romaji: 'pe' },
            { kana: 'ぽ', romaji: 'po' }
        ],
        17: [
            { kana: 'きゃ', romaji: 'kya' },
            { kana: 'きゅ', romaji: 'kyu' },
            { kana: 'きょ', romaji: 'kyo' }
        ],
        18: [
            { kana: 'しゃ', romaji: 'sha' },
            { kana: 'しゅ', romaji: 'shu' },
            { kana: 'しょ', romaji: 'sho' }
        ],
        19: [
            { kana: 'ちゃ', romaji: 'cha' },
            { kana: 'ちゅ', romaji: 'chu' },
            { kana: 'ちょ', romaji: 'cho' }
        ],
        20: [
            { kana: 'にゃ', romaji: 'nya' },
            { kana: 'にゅ', romaji: 'nyu' },
            { kana: 'にょ', romaji: 'nyo' }
        ],
        21: [
            { kana: 'ひゃ', romaji: 'hya' },
            { kana: 'ひゅ', romaji: 'hyu' },
            { kana: 'ひょ', romaji: 'hyo' }
        ],
        22: [
            { kana: 'みゃ', romaji: 'mya' },
            { kana: 'みゅ', romaji: 'myu' },
            { kana: 'みょ', romaji: 'myo' }
        ],
        23: [
            { kana: 'りゃ', romaji: 'rya' },
            { kana: 'りゅ', romaji: 'ryu' },
            { kana: 'りょ', romaji: 'ryo' }
        ],
        24: [
            { kana: 'ぎゃ', romaji: 'gya' },
            { kana: 'ぎゅ', romaji: 'gyu' },
            { kana: 'ぎょ', romaji: 'gyo' }
        ],
        25: [
            { kana: 'じゃ', romaji: 'ja' },
            { kana: 'じゅ', romaji: 'ju' },
            { kana: 'じょ', romaji: 'jo' }
        ],
        26: [
            { kana: 'びゃ', romaji: 'bya' },
            { kana: 'びゅ', romaji: 'byu' },
            { kana: 'びょ', romaji: 'byo' }
        ],
        27: [
            { kana: 'ぴゃ', romaji: 'pya' },
            { kana: 'ぴゅ', romaji: 'pyu' },
            { kana: 'ぴょ', romaji: 'pyo' }
        ]
    },
    katakana: {
        1: [
            { kana: 'ア', romaji: 'a' },
            { kana: 'イ', romaji: 'i' },
            { kana: 'ウ', romaji: 'u' },
            { kana: 'エ', romaji: 'e' },
            { kana: 'オ', romaji: 'o' }
        ],
        2: [
            { kana: 'カ', romaji: 'ka' },
            { kana: 'キ', romaji: 'ki' },
            { kana: 'ク', romaji: 'ku' },
            { kana: 'ケ', romaji: 'ke' },
            { kana: 'コ', romaji: 'ko' }
        ],
        3: [
            { kana: 'サ', romaji: 'sa' },
            { kana: 'シ', romaji: 'shi' },
            { kana: 'ス', romaji: 'su' },
            { kana: 'セ', romaji: 'se' },
            { kana: 'ソ', romaji: 'so' }
        ],
        4: [
            { kana: 'タ', romaji: 'ta' },
            { kana: 'チ', romaji: 'chi' },
            { kana: 'ツ', romaji: 'tsu' },
            { kana: 'テ', romaji: 'te' },
            { kana: 'ト', romaji: 'to' }
        ],
        5: [
            { kana: 'ナ', romaji: 'na' },
            { kana: 'ニ', romaji: 'ni' },
            { kana: 'ヌ', romaji: 'nu' },
            { kana: 'ネ', romaji: 'ne' },
            { kana: 'ノ', romaji: 'no' }
        ],
        6: [
            { kana: 'ハ', romaji: 'ha' },
            { kana: 'ヒ', romaji: 'hi' },
            { kana: 'フ', romaji: 'fu' },
            { kana: 'ヘ', romaji: 'he' },
            { kana: 'ホ', romaji: 'ho' }
        ],
        7: [
            { kana: 'マ', romaji: 'ma' },
            { kana: 'ミ', romaji: 'mi' },
            { kana: 'ム', romaji: 'mu' },
            { kana: 'メ', romaji: 'me' },
            { kana: 'モ', romaji: 'mo' }
        ],
        8: [
            { kana: 'ヤ', romaji: 'ya' },
            { kana: 'ユ', romaji: 'yu' },
            { kana: 'ヨ', romaji: 'yo' }
        ],
        9: [
            { kana: 'ラ', romaji: 'ra' },
            { kana: 'リ', romaji: 'ri' },
            { kana: 'ル', romaji: 'ru' },
            { kana: 'レ', romaji: 're' },
            { kana: 'ロ', romaji: 'ro' }
        ],
        10: [
            { kana: 'ワ', romaji: 'wa' },
            { kana: 'ヲ', romaji: 'wo' }
        ],
        11: [
            { kana: 'ン', romaji: 'n' }
        ],
        12: [
            { kana: 'ガ', romaji: 'ga' },
            { kana: 'ギ', romaji: 'gi' },
            { kana: 'グ', romaji: 'gu' },
            { kana: 'ゲ', romaji: 'ge' },
            { kana: 'ゴ', romaji: 'go' }
        ],
        13: [
            { kana: 'ザ', romaji: 'za' },
            { kana: 'ジ', romaji: 'ji' },
            { kana: 'ズ', romaji: 'zu' },
            { kana: 'ゼ', romaji: 'ze' },
            { kana: 'ゾ', romaji: 'zo' }
        ],
        14: [
            { kana: 'ダ', romaji: 'da' },
            { kana: 'ヂ', romaji: 'ji' },
            { kana: 'ヅ', romaji: 'zu' },
            { kana: 'デ', romaji: 'de' },
            { kana: 'ド', romaji: 'do' }
        ],
        15: [
            { kana: 'バ', romaji: 'ba' },
            { kana: 'ビ', romaji: 'bi' },
            { kana: 'ブ', romaji: 'bu' },
            { kana: 'ベ', romaji: 'be' },
            { kana: 'ボ', romaji: 'bo' }
        ],
        16: [
            { kana: 'パ', romaji: 'pa' },
            { kana: 'ピ', romaji: 'pi' },
            { kana: 'プ', romaji: 'pu' },
            { kana: 'ペ', romaji: 'pe' },
            { kana: 'ポ', romaji: 'po' }
        ],
        17: [
            { kana: 'キャ', romaji: 'kya' },
            { kana: 'キュ', romaji: 'kyu' },
            { kana: 'キョ', romaji: 'kyo' }
        ],
        18: [
            { kana: 'シャ', romaji: 'sha' },
            { kana: 'シュ', romaji: 'shu' },
            { kana: 'ショ', romaji: 'sho' }
        ],
        19: [
            { kana: 'チャ', romaji: 'cha' },
            { kana: 'チュ', romaji: 'chu' },
            { kana: 'チョ', romaji: 'cho' }
        ],
        20: [
            { kana: 'ニャ', romaji: 'nya' },
            { kana: 'ニュ', romaji: 'nyu' },
            { kana: 'ニョ', romaji: 'nyo' }
        ],
        21: [
            { kana: 'ヒャ', romaji: 'hya' },
            { kana: 'ヒュ', romaji: 'hyu' },
            { kana: 'ヒョ', romaji: 'hyo' }
        ],
        22: [
            { kana: 'ミャ', romaji: 'mya' },
            { kana: 'ミュ', romaji: 'myu' },
            { kana: 'ミョ', romaji: 'myo' }
        ],
        23: [
            { kana: 'リャ', romaji: 'rya' },
            { kana: 'リュ', romaji: 'ryu' },
            { kana: 'リョ', romaji: 'ryo' }
        ],
        24: [
            { kana: 'ギャ', romaji: 'gya' },
            { kana: 'ギュ', romaji: 'gyu' },
            { kana: 'ギョ', romaji: 'gyo' }
        ],
        25: [
            { kana: 'ジャ', romaji: 'ja' },
            { kana: 'ジュ', romaji: 'ju' },
            { kana: 'ジョ', romaji: 'jo' }
        ],
        26: [
            { kana: 'ビャ', romaji: 'bya' },
            { kana: 'ビュ', romaji: 'byu' },
            { kana: 'ビョ', romaji: 'byo' }
        ],
        27: [
            { kana: 'ピャ', romaji: 'pya' },
            { kana: 'ピュ', romaji: 'pyu' },
            { kana: 'ピョ', romaji: 'pyo' }
        ]
    }
};

// Описания групп
const GROUP_INFO = {
    1: { name: 'あ', romaji: 'a, i, u, e, o' },
    2: { name: 'か', romaji: 'ka, ki, ku, ke, ko' },
    3: { name: 'さ', romaji: 'sa, shi, su, se, so' },
    4: { name: 'た', romaji: 'ta, chi, tsu, te, to' },
    5: { name: 'な', romaji: 'na, ni, nu, ne, no' },
    6: { name: 'は', romaji: 'ha, hi, fu, he, ho' },
    7: { name: 'ま', romaji: 'ma, mi, mu, me, mo' },
    8: { name: 'や', romaji: 'ya, yu, yo' },
    9: { name: 'ら', romaji: 'ra, ri, ru, re, ro' },
    10: { name: 'わ', romaji: 'wa, wo' },
    11: { name: 'ん', romaji: 'n' },
    12: { name: 'が', romaji: 'ga, gi, gu, ge, go' },
    13: { name: 'ざ', romaji: 'za, ji, zu, ze, zo' },
    14: { name: 'だ', romaji: 'da, ji, zu, de, do' },
    15: { name: 'ば', romaji: 'ba, bi, bu, be, bo' },
    16: { name: 'ぱ', romaji: 'pa, pi, pu, pe, po' },
    17: { name: 'きゃ', romaji: 'kya, kyu, kyo' },
    18: { name: 'しゃ', romaji: 'sha, shu, sho' },
    19: { name: 'ちゃ', romaji: 'cha, chu, cho' },
    20: { name: 'にゃ', romaji: 'nya, nyu, nyo' },
    21: { name: 'ひゃ', romaji: 'hya, hyu, hyo' },
    22: { name: 'みゃ', romaji: 'mya, myu, myo' },
    23: { name: 'りゃ', romaji: 'rya, ryu, ryo' },
    24: { name: 'ぎゃ', romaji: 'gya, gyu, gyo' },
    25: { name: 'じゃ', romaji: 'ja, ju, jo' },
    26: { name: 'びゃ', romaji: 'bya, byu, byo' },
    27: { name: 'ぴゃ', romaji: 'pya, pyu, pyo' }
};

// Простые японские слова для режима слов
const WORDS = [
    { kana: 'あい', romaji: 'ai', meaning: 'любовь / привязанность' },
    { kana: 'あき', romaji: 'aki', meaning: 'осень' },
    { kana: 'いえ', romaji: 'ie', meaning: 'дом' },
    { kana: 'うえ', romaji: 'ue', meaning: 'верх / наверху' },
    { kana: 'おか', romaji: 'oka', meaning: 'холм' },
    { kana: 'かお', romaji: 'kao', meaning: 'лицо' },
    { kana: 'かさ', romaji: 'kasa', meaning: 'зонт' },
    { kana: 'かみ', romaji: 'kami', meaning: 'волосы / бумага / бог*' },
    { kana: 'きた', romaji: 'kita', meaning: 'север' },
    { kana: 'くち', romaji: 'kuchi', meaning: 'рот' },
    { kana: 'くに', romaji: 'kuni', meaning: 'страна' },
    { kana: 'こえ', romaji: 'koe', meaning: 'голос' },
    { kana: 'さけ', romaji: 'sake', meaning: 'сакэ / алкогольный напиток / лосось*' },
    { kana: 'しお', romaji: 'shio', meaning: 'соль' },
    { kana: 'すし', romaji: 'sushi', meaning: 'суши' },
    { kana: 'そら', romaji: 'sora', meaning: 'небо' },
    { kana: 'たけ', romaji: 'take', meaning: 'бамбук' },
    { kana: 'ちち', romaji: 'chichi', meaning: 'отец (о своём отце, когда говорят с другими)' },
    { kana: 'つき', romaji: 'tsuki', meaning: 'луна' },
    { kana: 'てら', romaji: 'tera', meaning: 'буддийский храм' },
    { kana: 'なつ', romaji: 'natsu', meaning: 'лето' },
    { kana: 'にし', romaji: 'nishi', meaning: 'запад' },
    { kana: 'ねこ', romaji: 'neko', meaning: 'кошка' },
    { kana: 'のみ', romaji: 'nomi', meaning: 'блоха' },
    { kana: 'はな', romaji: 'hana', meaning: 'цветок / нос*' },
    { kana: 'ひと', romaji: 'hito', meaning: 'человек' },
    { kana: 'ふね', romaji: 'fune', meaning: 'корабль' },
    { kana: 'まち', romaji: 'machi', meaning: 'город / населённый пункт' },
    { kana: 'みず', romaji: 'mizu', meaning: 'вода' },
    { kana: 'むし', romaji: 'mushi', meaning: 'насекомое' },
    { kana: 'やま', romaji: 'yama', meaning: 'гора' },
    { kana: 'ゆき', romaji: 'yuki', meaning: 'снег' },
    { kana: 'よる', romaji: 'yoru', meaning: 'ночь' },

    // 3 символа
    { kana: 'さかな', romaji: 'sakana', meaning: 'рыба' },
    { kana: 'たまご', romaji: 'tamago', meaning: 'яйцо' },
    { kana: 'やすみ', romaji: 'yasumi', meaning: 'отдых / перерыв / выходной' },
    { kana: 'みかん', romaji: 'mikan', meaning: 'мандарин' },
    { kana: 'とけい', romaji: 'tokei', meaning: 'часы / наручные часы' },
    { kana: 'てがみ', romaji: 'tegami', meaning: 'письмо' },
    { kana: 'こども', romaji: 'kodomo', meaning: 'ребёнок' },
    { kana: 'ほんや', romaji: 'honya', meaning: 'книжный магазин' },
    { kana: 'でんわ', romaji: 'denwa', meaning: 'телефон' },
    { kana: 'ざっし', romaji: 'zasshi', meaning: 'журнал' },

    // 4 символа
    { kana: 'ともだち', romaji: 'tomodachi', meaning: 'друг' },
    { kana: 'おんがく', romaji: 'ongaku', meaning: 'музыка' },
    { kana: 'せんせい', romaji: 'sensei', meaning: 'учитель' },
    { kana: 'えんぴつ', romaji: 'enpitsu', meaning: 'карандаш' },
    { kana: 'ひこうき', romaji: 'hikouki', meaning: 'самолёт' },
    { kana: 'はちがつ', romaji: 'hachigatsu', meaning: 'август' },
    { kana: 'おおさか', romaji: 'oosaka', meaning: 'Осака' },
    { kana: 'ひらがな', romaji: 'hiragana', meaning: 'хирагана' },
    { kana: 'やきとり', romaji: 'yakitori', meaning: 'якитори' },
    { kana: 'りょこう', romaji: 'ryokou', meaning: 'путешествие' },
    { kana: 'がっこう', romaji: 'gakkou', meaning: 'школа' },
    { kana: 'にほんご', romaji: 'nihongo', meaning: 'японский язык' },

    // 5 символов
    { kana: 'こんにちは', romaji: 'konnichiwa', meaning: 'здравствуйте / добрый день' },
    { kana: 'いっしょに', romaji: 'isshoni', meaning: 'вместе' },
    { kana: 'せんたくき', romaji: 'sentakuki', meaning: 'стиральная машина' },
    { kana: 'びょういん', romaji: 'byouin', meaning: 'больница' },
    { kana: 'ありがとう', romaji: 'arigatou', meaning: 'спасибо' },
    { kana: 'としょかん', romaji: 'toshokan', meaning: 'библиотека' },
    { kana: 'じてんしゃ', romaji: 'jitensha', meaning: 'велосипед' },
    { kana: 'おかあさん', romaji: 'okaasan', meaning: 'мама / мать (обращение или о матери собеседника)' },
    { kana: 'おとうさん', romaji: 'otousan', meaning: 'папа / отец (обращение или об отце собеседника)' },

    // 6 символов и более
    { kana: 'ひゃくえん', romaji: 'hyakuen', meaning: 'сто иен' },
    { kana: 'ぎゅうにゅう', romaji: 'gyuunyuu', meaning: 'молоко' },
    { kana: 'たんじょうび', romaji: 'tanjoubi', meaning: 'день рождения' },
    { kana: 'かいしゃいん', romaji: 'kaishain', meaning: 'сотрудник компании' },
    { kana: 'しんかんせん', romaji: 'shinkansen', meaning: 'синкансэн (скоростной поезд)' },
    { kana: 'ちゅうごくご', romaji: 'chuugokugo', meaning: 'китайский язык' }
];

// Таблицы для отображения
const KANA_TABLES = {
    hiragana: [
        ['', 'a', 'i', 'u', 'e', 'o'],
        ['', 'あ', 'い', 'う', 'え', 'お'],
        ['k', 'か', 'き', 'く', 'け', 'こ'],
        ['s', 'さ', 'し', 'す', 'せ', 'そ'],
        ['t', 'た', 'ち', 'つ', 'て', 'と'],
        ['n', 'な', 'に', 'ぬ', 'ね', 'の'],
        ['h', 'は', 'ひ', 'ふ', 'へ', 'ほ'],
        ['m', 'ま', 'み', 'む', 'め', 'も'],
        ['y', 'や', '', 'ゆ', '', 'よ'],
        ['r', 'ら', 'り', 'る', 'れ', 'ろ'],
        ['w', 'わ', '', '', '', 'を'],
        ['n', 'ん', '', '', '', '']
    ],
    katakana: [
        ['', 'a', 'i', 'u', 'e', 'o'],
        ['', 'ア', 'イ', 'ウ', 'エ', 'オ'],
        ['k', 'カ', 'キ', 'ク', 'ケ', 'コ'],
        ['s', 'サ', 'シ', 'ス', 'セ', 'ソ'],
        ['t', 'タ', 'チ', 'ツ', 'テ', 'ト'],
        ['n', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
        ['h', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
        ['m', 'マ', 'ミ', 'ム', 'メ', 'モ'],
        ['y', 'ヤ', '', 'ユ', '', 'ヨ'],
        ['r', 'ラ', 'リ', 'ル', 'レ', 'ロ'],
        ['w', 'ワ', '', '', '', 'ヲ'],
        ['n', 'ン', '', '', '', '']
    ]
};
