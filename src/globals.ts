import { Consts } from "./consts";
import { IntervalTimer, Timer } from "./service/timer";

/**
 * グローバル変数
 * シーンをまたいで使用するもの
 */
export class Globals {

    //シングルトンで使用するインスタンス
    private static instance: Globals | null = null;

    //シングルトンのインスタンスを取得
    static get(): Globals {
        if (Globals.instance === null) {
            Globals.instance = new Globals();
        }
        return Globals.instance;
    }

    //--------------------------------------------
    private mode: number;   // 選択したモード
    private stage: number;  // ステージ数
    private score: number;  // スコア
    private life: number;   // 残機数
    private timer: IntervalTimer | null;    // タイマー


    //外部からインスタンス化できないようにコンストラクタは private にする
    private constructor() {
        this.mode = Consts.Game.Mode.NOMAL;
        this.score = 0;
        this.stage = 0;
        this.life = Consts.Game.LIFE;
        this.timer = null;

        this.reset();

    }

    /**
     * 値をリセット
     */
    reset(): void {
        this.mode = Consts.Game.Mode.NOMAL;
        this.score = 0;
        this.stage = 0;
        this.life = Consts.Game.LIFE;
        if (this.timer != null) {
            this.timer = null;
        }
    }

    /**
     * 更新処理
     * @param delta 前フレームからの経過時間
     */
    update(delta: number): void {
        this.timer?.update(delta);
    }

    /**
     * モードをセットする
     * @param mode モード
     */
    setMode(mode: number): void {
        this.mode = mode;
    }

    /**
     * モードを取得する
     * @returns モード
     */
    getMode(): number {
        return this.mode;
    }

    /**
     * ステージ数を設定する
     * @param stage ステージ数
     */
    setStage(stage: number): void {
        this.stage = Math.min(stage, 0);
    }
    /**
     * ステージ数を加算する
     * @param add 加算する値
     */
    addStage(add: number): void {
        this.stage += add;
    }
    /**
     * ステージ集を取得する
     * @returns ステージ数
     */
    getStage(): number {
        return this.stage;
    }

    /**
     * スコアを設定する
     * @param score スコア
     */
    setScore(score: number): void {
        this.score = Math.max(score, 0);
    }
    /**
     * スコアを加算する
     * @param add 加算するスコア
     */
    addScore(add: number): void {
        this.score += add;
    }
    /**
     * スコアを取得する
     * @returns スコア
     */
    getScore(): number {
        return this.score;
    }

    /**
     * 残機数を設定する
     * @param life 残機数
     */
    setLife(life: number): void {
        this.life = Math.max(life, 0);
    }
    /**
     * 残機数を加算する
     * @param add 残機数
     */
    addLife(add: number): void {
        this.life += add;
    }
    /**
     * 残機数を取得する
     * @returns 残機数
     */
    getLife(): number {
        return this.life;
    }

    /**
     * タイマーを開始する
     * @param scene シーン
     */
    startTimer(scene: Phaser.Scene): void {
        if (this.timer == null) {
            this.timer = new IntervalTimer(Consts.Game.TIME);
            this.timer.start();
        }
        else {
            this.timer.resume();
        }
    }
    /**
     * タイマーをポーズする
     */
    pauseTimer(): void {
        if (this.timer != null) {
            this.timer.pause();
        }
    }
    /**
     * タイマーの残り時間を取得する
     * @returns 残り時間
     */
    getRemamin(): number {
        if (this.timer == null) {
            return Consts.Game.TIME;
        }
        else {
            return this.timer.getRemain();
        }
    }
    /**
     * タイマーの残り時間を％で取得する
     * @returns タイマーの残り時間を0-1の間の値にしたもの
     */
    getRemainPercent(): number {
        if (this.timer != null) {
            if (Consts.Game.TIME > 0) {
                const percent = this.timer.getRemainPercentage();
                return percent;
            }
        }
        return 1;
    }
    /**
     * 残り時間を減らす
     * @param value 減らす値
     */
    reduceRemain(value: number) {
        if (this.timer != null) {
            this.timer.add(value);
        }
    }
}