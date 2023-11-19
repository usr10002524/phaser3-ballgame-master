import "phaser";
import { GameConfig } from "./config"
import { Consts } from "./consts";
import { Log } from "./service/logwithstamp";

/*
 *  html から呼ばれるファイル
 *  ここからゲームを起動する 
 */

window.addEventListener("load", () => {
    // タイトルバージョンをログに出しておく
    const text = `${Consts.TITLE}:${Consts.VERSION}`;
    console.log(text);
    // ゲーム起動
    var game: Phaser.Game = new Phaser.Game(GameConfig);
});

