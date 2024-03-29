import { Assets, Consts } from "../consts";
import { SceneMain } from "../scene/scene-main";
import { Behavior } from "./behavior";

/**
 * ゲーム開始演出
 */
export class BehaviorStart extends Behavior {

    private scene: SceneMain;
    private ready: Phaser.GameObjects.Image;
    private start: Phaser.GameObjects.Image;
    private tween: Phaser.Tweens.Tween | null;
    private finished: boolean;

    /**
     * コンストラクタ
     * @param scene シーン
     */
    constructor(scene: SceneMain) {
        super('BehaviorStart');
        this.scene = scene;
        this.tween = null;
        this.finished = false;

        const x = scene.game.canvas.width * 0.5;
        const y = scene.game.canvas.height * 0.5;
        const imageKey = Assets.Graphic.UIs.KEY;

        //ready
        {
            const frame = Assets.Graphic.UIs.READY;
            const depth = Consts.UI.Ready.DEPTH;

            this.ready = scene.add.image(x, y, imageKey, frame);
            this.ready.setVisible(false);   //まだ表示しない
            this.ready.setPosition(x, y);
            this.ready.setOrigin(0.5, 0.5);
            this.ready.setDepth(depth)
        }
        //start
        {
            const frame = Assets.Graphic.UIs.START;
            const depth = Consts.UI.Start.DEPTH;

            this.start = scene.add.image(x, y, imageKey, frame);
            this.start.setVisible(false);   //まだ表示しない
            this.start.setPosition(x, y);
            this.start.setOrigin(0.5, 0.5);
            this.start.setDepth(depth)

        }
    }

    //extends Behavior
    /**
     * 初期化処理
     */
    initialize(): void {
        this._readyInStart();
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
        this.ready.destroy();
        this.start.destroy();
    }

    /**
     * ビヘイビア終了したかどうかを返す。
     * @returns 終了していた場合は true、そうでない場合はfalseを返す。
     */
    isFinished(): boolean {
        return this.finished;
    }

    // 「Ready」の表示開始を行う
    private _readyInStart(): void {
        const start = -this.ready.height;
        const end = this.ready.y;
        //開始位置に移動しておく
        this.ready.setPosition(this.ready.x, start);

        this.tween = this.scene.tweens.add({
            targets: this.ready,
            ease: 'Power',
            duration: 500,
            props: {
                y: { from: start, to: end },
            },
            onStart: () => {
                this.ready.setVisible(true);
                this.scene.sound.play(Assets.Audio.SE.READY);
            },
            onStartScope: this,
            onComplete: this._readyOutStart,
            onCompleteScope: this,
        });
    }

    // 「Ready」の表示終了を行う
    private _readyOutStart(): void {
        const start = 1.0;
        const end = 0;

        this.tween = this.scene.tweens.add({
            targets: this.ready,
            ease: 'Linear',
            delay: 500,
            duration: 500,
            props: {
                alpha: { from: start, to: end },
            },
            onComplete: this._startInStart,
            onCompleteScope: this,
        });
    }

    // 「Start」の表示開始を行う
    private _startInStart(): void {
        const start = 0.5;
        const end = 1;
        //初期状態にしておく
        this.start.setScale(start);

        this.tween = this.scene.tweens.add({
            targets: this.start,
            ease: 'Linear',
            duration: 500,
            props: {
                scale: { from: start, to: end },
            },
            onStart: () => {
                this.start.setVisible(true);
                this.scene.onPlay();
                this.scene.sound.play(Assets.Audio.SE.START);
            },
            onStartScope: this,
            onComplete: this._startOutStart,
            onCompleteScope: this,
        })
    }

    // 「Start」の表示終了を行う
    private _startOutStart(): void {
        const start = 1.0;
        const end = 0;

        this.tween = this.scene.tweens.add({
            targets: this.start,
            ease: 'Linear',
            delay: 500,
            duration: 500,
            props: {
                alpha: { from: start, to: end },
            },
            onComplete: this._onEnd,
            onCompleteScope: this,
        });
    }

    // 演出が全て終了した際の処理
    private _onEnd(): void {
        this.finished = true;
    }
}