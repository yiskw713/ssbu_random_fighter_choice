// 厳密なエラーチェック
"use strict";

const fighters = [
    "mario",
    "donkey_kong",
    "link",
    "samus",
    "dark_samus",
    "yoshi",
    "kirby",
    "fox",
    "pikachu",
    "luigi",
    "ness",
    "captain_falcon",
    "jigglypuff",
    "peach",
    "daisy",
    "bowser",
    "ice_climbers",
    "sheik",
    "zelda",
    "dr_mario",
    "pichu",
    "falco",
    "marth",
    "lucina",
    "young_link",
    "ganondorf",
    "mewtwo",
    "roy",
    "chrom",
    "mr_game_and_watch",
    "meta_knight",
    "pit",
    "dark_pit",
    "zero_suit_samus",
    "wario",
    "snake",
    "ike",
    "pokemon_trainer",
    "diddy_kong",
    "lucas",
    "sonic",
    "king_dedede",
    "olimar",
    "lucario",
    "rob",
    "toon_link",
    "wolf",
    "villager",
    "mega_man",
    "wii_fit_trainer",
    "rosalina_and_luma",
    "little_mac",
    "greninja",
    "mii_brawler",
    "mii_swordfighter",
    "mii_gunner",
    "palutena",
    "pac_man",
    "robin",
    "shulk",
    "bowser_jr",
    "duck_hunt",
    "ryu",
    "ken",
    "cloud",
    "corrin",
    "bayonetta",
    "inkling",
    "ridley",
    "simon",
    "richter",
    "king_k_rool",
    "isabelle",
    "incineroar",
    "piranha_plant",
    "joker",
    "hero",
    "banjo_and_kazooie",
    "terry",
    "byleth"
]

const displayName = [
    "mario",
    "donkey kong",
    "link",
    "samus",
    "dark samus",
    "yoshi",
    "kirby",
    "fox",
    "pikachu",
    "luigi",
    "ness",
    "captain falcon",
    "jigglypuff",
    "peach",
    "daisy",
    "bowser",
    "ice climbers",
    "sheik",
    "zelda",
    "dr. mario",
    "pichu",
    "falco",
    "marth",
    "lucina",
    "young link",
    "ganondorf",
    "mewtwo",
    "roy",
    "chrom",
    "mr. game & watch",
    "meta knight",
    "pit",
    "dark pit",
    "zero suit samus",
    "wario",
    "snake",
    "ike",
    "pokemon trainer",
    "diddy kong",
    "lucas",
    "sonic",
    "king dedede",
    "olimar",
    "lucario",
    "rob",
    "toon link",
    "wolf",
    "villager",
    "mega man",
    "wii fit trainer",
    "rosalina & luma",
    "little mac",
    "greninja",
    "mii brawler",
    "mii swordfighter",
    "mii gunner",
    "palutena",
    "pac man",
    "robin",
    "shulk",
    "bowser jr.",
    "duck hunt",
    "ryu",
    "ken",
    "cloud",
    "corrin",
    "bayonetta",
    "inkling",
    "ridley",
    "simon",
    "richter",
    "king k. rool",
    "isabelle",
    "incineroar",
    "piranha plant",
    "joker",
    "hero",
    "banjo & kazooie",
    "terry",
    "byleth"
]

const numFighters = fighters.length;
const candidate = document.getElementById("candidateList");
const bannedFighters = new Set();
const usedFighters = new Set();
let useHistory = false;

// キャラクタボックスの配列
const fighterBoxes = [];

// i番目のキャラクターボックスを作成
const makeFighterBox = (i) => {
    // 全体
    const fighterBox = document.createElement("div");

    // 画像をいれる
    const imgDiv = document.createElement("div");

    const img = document.createElement("img");
    // 画像のパス
    img.src = "./icon_imgs/" + fighters[i] + ".png";

    // 画像を追加
    imgDiv.appendChild(img);

    // クラスの付与
    imgDiv.classList.add("imgBox")

    // fighter名の追加
    const p = document.createElement("p");
    p.textContent = displayName[i].toUpperCase();
    p.classList.add("nameBox");

    fighterBox.appendChild(imgDiv)
    fighterBox.appendChild(p);
    fighterBox.classList.add("fighterBox");

    fighterBoxes.push(fighterBox);

    return fighterBox
}

// 初期化
for (let i = 0; i < numFighters; i++) {
    const li = document.createElement("li");

    const fighterBox = makeFighterBox(i);

    // クリックしたら色をつける
    fighterBox.addEventListener("click", () => {
        if (fighterBox.classList.contains("clicked")) {
            fighterBox.classList.remove("clicked");
            bannedFighters.delete(i);
        } else {
            fighterBox.classList.add("clicked");
            bannedFighters.add(i);
        }
    });

    li.appendChild(fighterBox);

    candidate.appendChild(li);
}


// buttonがクリックされた時にキャラクターを選ぶ
const randomButton = document.getElementById("randomButton");

randomButton.addEventListener("click", () => {
    const selectedFighters = [];
    const result = document.getElementById("resultList");

    // もし子要素が存在したら削除
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }

    // radio button の値を取得
    const radioButton = document.getElementsByName("radio");
    let numSelectedFighters = 1

    // 選択状態の値を取得
    for (let i = 0; i < 3; i++) {
        if (radioButton[i].checked) {
            numSelectedFighters = radioButton[i].value;
            break;
        }
    }

    // もし指定された個数文表示できなかったら
    const union = new Set([...bannedFighters, ...usedFighters]);
    const numAvailable = useHistory ? numFighters - union.size : numFighters - bannedFighters.size;

    if (numAvailable < numSelectedFighters) {
        const numUnbanned = numSelectedFighters - numAvailable;
        if (useHistory) {
            if (numUnbanned === 1) {
                alert(`You have to unban at least 1 fighter or reset your history.`);
                return
            } else {
                alert(`You have to unban at least ${numUnbanned} fighters or reset your history.`);
                return
            }
        } else {
            if (numUnbanned === 1) {
                alert(`You have to unban at least 1 fighter.`);
                return
            } else {
                alert(`You have to unban at least ${numUnbanned} fighters.`);
                return
            }
        }

    }

    while (selectedFighters.length < numSelectedFighters) {
        const i = Math.floor(Math.random() * numFighters);
        if (useHistory) {
            if (bannedFighters.has(i) || selectedFighters.includes(i) || usedFighters.has(i)) {
                continue;
            } else {
                // キャラクタボックスを作成
                const fighterBox = makeFighterBox(i);

                result.appendChild(fighterBox);

                // 決定済みキャラに追加
                selectedFighters.push(i);

                // 使用済みキャラに追加
                usedFighters.add(i);
                fighterBoxes[i].classList.add("used");
            }
        }
        else {
            if (bannedFighters.has(i) || selectedFighters.includes(i)) {
                continue;
            } else {
                // キャラクタボックスを作成
                const fighterBox = makeFighterBox(i);

                result.appendChild(fighterBox);

                // 決定済みキャラに追加
                selectedFighters.push(i);

                // 使用済みキャラに追加
                usedFighters.add(i);
            }
        }
    }
});

// historyを使う場合は，used class を付与
const addUsedClass = (i) => {
    const candidateChildren = candidate.children;
    if (usedFighters.has(i)) {
        const child = candidateChildren[i];

        // used class を削除
        const boxDiv = child.children[0];
        boxDiv.classList.add("used");
    }

    return;
}

// historyを使わない場合は，used class を削除する．set型の中身は消さない
const removeUsedClass = (i) => {
    const candidateChildren = candidate.children;
    if (usedFighters.has(i)) {
        const child = candidateChildren[i];

        // used class を削除
        const boxDiv = child.children[0];
        boxDiv.classList.remove("used");
    }

    return;
}

// historyを使うかどうか
const checkIfUseHistory = () => {
    if (historyCheckbox.checked) {
        useHistory = true;
        for (let i = 0; i < numFighters; i++) {
            addUsedClass(i);
        }
    } else {
        useHistory = false;
        for (let i = 0; i < numFighters; i++) {
            removeUsedClass(i);
        }
    }
}

// allButtonがクリックされたら全てのiconをbanする
const banAllFighters = () => {
    const candidateChildren = candidate.children;
    for (let i = 0; i < numFighters; i++) {
        if (bannedFighters.has(i)) {
            continue;
        } else {
            const child = candidateChildren[i];
            bannedFighters.add(i);

            // clicked classの付与
            const boxDiv = child.children[0];
            boxDiv.classList.add("clicked");
        }
    }
}

// i番目のキャラクターをunbanする関数
const unbanIthFighter = (i) => {
    const candidateChildren = candidate.children;
    if (bannedFighters.has(i)) {
        const child = candidateChildren[i];
        bannedFighters.delete(i);

        // clicked classを削除
        const boxDiv = child.children[0];
        boxDiv.classList.remove("clicked");
    }
}

// i番目のキャラクターのhistoryを削除する関数
const deleteIthFighterHistory = (i) => {
    const candidateChildren = candidate.children;
    if (usedFighters.has(i)) {
        const child = candidateChildren[i];
        usedFighters.delete(i);

        // used class を削除
        const boxDiv = child.children[0];
        boxDiv.classList.remove("used");
    }
}

// 全てのキャラクターをunbanする
const unban = () => {
    for (let i = 0; i < numFighters; i++) {
        unbanIthFighter(i);
    }
}

// historyを削除する
const deleteHistory = () => {
    const result = confirm("Are you sure you want to delete history?")
    if (result) {
        for (let i = 0; i < numFighters; i++) {
            deleteIthFighterHistory(i);
        }
    }
}

// resetButtonがクリックされたら全てのiconをunbanする
const reset = () => {
    const result = confirm("Are you sure you want to reset?")
    if (result) {
        for (let i = 0; i < numFighters; i++) {
            unbanIthFighter(i);
            deleteIthFighterHistory(i);
        }
    }
}

const historyCheckbox = document.getElementById("historyCheckbox");
const allButton = document.getElementById("allButton");
const unbanButton = document.getElementById("unbanButton");
const deleteHistoryButton = document.getElementById("deleteHistoryButton");
const resetButton = document.getElementById("resetButton");

historyCheckbox.addEventListener("click", checkIfUseHistory);
allButton.addEventListener("click", banAllFighters);
unbanButton.addEventListener("click", unban);
deleteHistoryButton.addEventListener("click", deleteHistory);
resetButton.addEventListener("click", reset);
