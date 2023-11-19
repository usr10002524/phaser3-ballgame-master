import { Assets, Consts } from "../consts";
import { Globals } from "../globals";
import { SceneMain } from "../scene/scene-main";
import { Behavior } from "./behavior";

/**
 * 的にやられた際の演出
 */
export class BehaviorMiss extends Behavior {

    private scene: SceneMain;
    private timer: Phaser.Time.TimerEvent | null;
    private finished: boolean;

    /**
     * コンストラクタ
     * @param scene シーン
     */
    constructor(scene: SceneMain) {
        super('BehaviorMiss');
        this.scene = scene;
        this.timer = null;
        this.finished = false;
    }

    //extends Behavior
    /**
    * 初期化処理
    */
    initialize(): void {
        const sound = this.scene.sound.add(Assets.Audio.SE.MISS);
        if (sound != null) {
            sound.play();
            this.timer = this.scene.time.addEvent({
                delay: sound.duration + 1000,
                callback: () => { this._onEnd(); },
                callbackScope: this
            });

            //タイムアタック時は残り時間を減らす
            const mode = Globals.get().getMode();
            if (mode === Consts.Game.Mode.TIMEATTACK) {
                Globals.get().reduceRemain(Consts.Game.REDUCE_TIME);
            }
        }
        else {
            this._onEnd();
        }
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
        if (this.timer != null) {
            this.timer.remove();
        }
    }

    /**
     * ビヘイビア終了したかどうかを返す。
     * @returns 終了していた場合は true、そうでない場合はfalseを返す。
     */
    isFinished(): boolean {
        return this.finished;
    }

    // 演出が全て終了した際の処理
    private _onEnd(): void {
        this.scene.onRestart();
        this.finished = true;
    }

}