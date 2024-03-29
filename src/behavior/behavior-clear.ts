import { Assets, Consts } from "../consts";
import { SceneMain } from "../scene/scene-main";
import { Behavior } from "./behavior";

/**
 * ステージクリア演出
 */
export class BehaviorClear extends Behavior {

    private scene: SceneMain;
    private clear: Phaser.GameObjects.Image;
    private seClear: Phaser.Sound.BaseSound;
    private tween: Phaser.Tweens.Tween | null;
    private spacer: Phaser.Time.TimerEvent | null;
    private finished: boolean;

    /**
     * コンストラクタ
     * @param scene シーン
     */
    constructor(scene: SceneMain) {
        super('BehaviorClear');
        this.scene = scene;
        this.tween = null;
        this.spacer = null;
        this.finished = false;

        const x = scene.game.canvas.width * 0.5;
        const y = scene.game.canvas.height * 0.5;
        const imageKey = Assets.Graphic.UIs.KEY;

        //clear
        {
            const frame = Assets.Graphic.UIs.CLEAR;
            const depth = Consts.UI.Clear.DEPTH;

            this.clear = scene.add.image(x, y, imageKey, frame);
            this.clear.setVisible(false);   //まだ表示しない
            this.clear.setPosition(x, y);
            this.clear.setOrigin(0.5, 0.5);
            this.clear.setDepth(depth)
        }
        //se
        {
            this.seClear = scene.sound.add(Assets.Audio.SE.CLEAR);
        }
    }

    //extends Behavior
    /**
     * 初期化処理
     */
    initialize(): void {
        this._clearInStart();
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
        this.clear.destroy();
    }

    /**
     * ビヘイビア終了したかどうかを返す。
     * @returns 終了していた場合は true、そうでない場合はfalseを返す。
     */
    isFinished(): boolean {
        return this.finished;
    }

    // 「Clear」の表示開始を行う
    private _clearInStart(): void {
        const start = 2.0;
        const end = 1.0;
        const tweenDuration = 500;
        const spaceDuration = 5000;//(this.seClear.duration * 1000) + 500;
        //初期状態にしておく
        this.clear.setScale(start);

        this.tween = this.scene.tweens.add({
            targets: this.clear,
            ease: 'Power',
            duration: tweenDuration,
            props: {
                scale: { from: start, to: end },
            },
            onStart: () => {
                this.clear.setVisible(true);
                this.seClear.play();
            },
            onStartScope: this,
        });

        //次の演出への間をとる
        this.spacer = this.scene.time.addEvent({
            delay: spaceDuration,
            callback: this._clearOutStart,
            callbackScope: this,
        });
    }

    // 「Clear」の表示終了を行う
    private _clearOutStart(): void {
        const start = 1.0;
        const end = 0;
        const tweenDuration = 1000;
        const spaceDuration = 2000;

        this.tween = this.scene.tweens.add({
            targets: this.clear,
            ease: 'Linear',
            duration: tweenDuration,
            props: {
                alpha: { from: start, to: end },
            },
        });

        //次の演出への間をとる
        this.spacer = this.scene.time.addEvent({
            delay: spaceDuration,
            callback: this._onEnd,
            callbackScope: this,
        });
    }

    // 演出が全て終了した際の処理
    private _onEnd(): void {
        this.scene.onNextStage();
        this.finished = true;
    }
}