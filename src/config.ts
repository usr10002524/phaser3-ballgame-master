import { Consts } from "./consts";
import { SceneLoading } from "./scene/scene-loading";
import { SceneTitle } from "./scene/scene-title";
import { SceneMain } from "./scene/scene-main";
import { SceneGameClear } from "./scene/scene-gameclear";
import { SceneGameOver } from "./scene/scene-gameover";
import { SceneTest } from "./scene/scene-test";
import { SceneSoundTest } from "./scene/scene-soundtest";

export const GameConfig: Phaser.Types.Core.GameConfig = {
    // レンダラーは自動設定
    type: Phaser.AUTO,
    // タイトル
    title: Consts.TITLE,
    // バージョン
    version: Consts.VERSION,
    // ウィンドウの幅
    width: Consts.Screen.WIDTH,
    // ウィンドウの高さ
    height: Consts.Screen.HEIGHT,
    // 物理シミュレーション設定
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            // debug: true
        }
    },
    // スクリーンのスケール設定
    scale: {
        // ウィンドウに追従
        mode: Phaser.Scale.ScaleModes.FIT,
        // 縦横合わせる
        autoCenter: Phaser.Scale.Center.CENTER_BOTH,
        // 最大はウィンドウサイズに合わせる
        max: {
            width: Consts.Screen.WIDTH,
            height: Consts.Screen.HEIGHT
        }
    },
    // 背景色
    backgroundColor: Consts.Screen.BGCOLOR,
    // サウンド
    audio: {
        disableWebAudio: false, // WebGL audio を使用する
    },
    // 使用するシーン
    scene: [SceneLoading, SceneTitle, SceneMain],
    // scene: [SceneSoundTest],
};
