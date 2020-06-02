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
    "mega_man",
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
const candidate = document.getElementById("container");
const bannedFighters = new Set();

for (let i = 0; i < numFighters; i++) {
    // 全体
    const boxDiv = document.createElement("div");

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

    // クリックしたら色をつける
    boxDiv.addEventListener("click", () => {
        if (boxDiv.classList.contains("clicked")) {
            boxDiv.classList.remove("clicked");
            imgDiv.classList.remove("clickedImgBox");
            bannedFighters.delete(i);
        } else {
            boxDiv.classList.add("clicked");
            imgDiv.classList.add("clickedImgBox");
            bannedFighters.add(i);
        }
    });

    boxDiv.appendChild(imgDiv)
    boxDiv.appendChild(p);
    boxDiv.classList.add("box");

    candidate.appendChild(boxDiv);
}



const winner = Math.floor(Math.random() * numFighters);

// buttonがクリックされた時にキャラクターを選ぶ
const button = document.getElementById("button");

button.addEventListener("click", () => {
    const selectedFighters = [];
    const selected = document.getElementById("selected");

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

    while (selectedFighters.length < numSelectedFighters) {
        const i = Math.floor(Math.random() * numFighters);
        if ((bannedFighters.has(i)) || (selectedFighters.includes(i))) {
            continue;
        } else {
            //ファイターを表示
            // 全体
            const boxDiv = document.createElement("div");

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

            boxDiv.appendChild(imgDiv)
            boxDiv.appendChild(p);
            boxDiv.classList.add("box");

            selected.appendChild(boxDiv);

            selectedFighters.push(i);
        }
    }
});
