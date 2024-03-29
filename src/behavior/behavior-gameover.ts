import { atsumaru_displayScoreBoard, atsumaru_saveScoreBoard } from "../atsumaru/atsumaru";
import { Assets, Consts } from "../consts";
import { Globals } from "../globals";
import { SceneMain } from "../scene/scene-main";
import { Behavior } from "./behavior";

/**
 * ゲームオーバー演出
 */
export class BehaviorGameOver extends Behavior {

    private scene: SceneMain;
    private gameover: Phaser.GameObjects.Image;
    private tween: Phaser.Tweens.Tween | null;
    private finished: boolean;

    /**
     * コンストラクタ
     * @param scene シーン
     */
    constructor(scene: SceneMain) {
        super('BehaviorGameOver');
        this.scene = scene;
        this.tween = null;
        this.finished = false;

        const x = scene.game.canvas.width * 0.5;
        const y = scene.game.canvas.height * 0.5;
        const imageKey = Assets.Graphic.UIs.KEY;

        //ready
        {
            const frame = Assets.Graphic.UIs.GAMEOVER;
            const depth = Consts.UI.Ready.DEPTH;

            this.gameover = scene.add.image(x, y, imageKey, frame);
            this.gameover.setVisible(false);   //まだ表示しない
            this.gameover.setPosition(x, y);
            this.gameover.setOrigin(0.5, 0.5);
            this.gameover.setDepth(depth)
        }
    }

    //extends Behavior
    /**
     * 初期化処理
     */
    initialize(): void {
        this._gameOverInStart();
    }

    /**
     * 更新処理
     */
    update(): void {
    }

    /**
     * 終了処理
     */
    finalize(): void {
        if (this.tween != null) {
            this.tween.remove();
        }
        this.gameover.destroy();
    }

    /**
     * ビヘイビア終了したかどうかを返す。
     * @returns 終了していた場合は true、そうでない場合はfalseを返す。
     */
    isFinished(): boolean {
        return this.finished;
    }


    // 「Game Over」の表示開始を行う
    private _gameOverInStart(): void {
        const start = -this.gameover.height;
        const end = this.gameover.y;
        //開始位置に移動しておく
        this.gameover.setPosition(this.gameover.x, start);

        this.tween = this.scene.tweens.add({
            targets: this.gameover,
            ease: 'Power',
            delay: 500,
            duration: 500,
            props: {
                y: { from: start, to: end },
            },
            onStart: () => {
                this.gameover.setVisible(true);
                this.scene.sound.play(Assets.Audio.SE.GAMEOVER);
            },
            onStartScope: this,
            onComplete: this._gameOverOutStart,
            onCompleteScope: this,
        });
    }

    // 「Game Over」の表示終了を行う
    private _gameOverOutStart(): void {
        const start = 1.0;
        const end = 0;

        this.tween = this.scene.tweens.add({
            targets: this.gameover,
            ease: 'Linear',
            delay: 1000,
            duration: 500,
            props: {
                alpha: { from: start, to: end },
            },
            onComplete: this._delay,
            onCompleteScope: this,
        });
    }

    // なにもしない処理
    private _delay(): void {
        const start = 0.0;
        const end = 0;

        //なにもしないけど余韻を入れる
        this.tween = this.scene.tweens.add({
            targets: this.gameover,
            duration: 1000,
            props: {
                alpha: { from: start, to: end },
            },
            onComplete: this._onEnd,
            onCompleteScope: this,
        });
    }

    // 演出が全て終了した際の処理
    private _onEnd(): void {
        this.scene.onDisplayScoreBoard();
        this.finished = true;
    }
}