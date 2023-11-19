import { Assets, Consts } from "../../consts";
import { Ball } from "../ball/ball";
import { EffectConfig } from "../effect/effect-ring";
import { EffectRingRed } from "../effect/effect-ring_r";
import { Gimic, GimicConfig, GimicManager } from "./gimic";

/**
 * コンフィグ
 */
export type gimicReverseConfig = {
    gimic: GimicConfig; // 基底のコンフィグ
    effect: EffectConfig;   // エフェクトコンフィグ
    delay: number;  // 表示開始までの遅延時間
}

/**
 * 行動反転ギミック
 */
export class gimicReverse implements Gimic {

    private scene: Phaser.Scene;
    private parent: Ball;
    private config: gimicReverseConfig;
    private effect: EffectRingRed;
    private guageBack: Phaser.GameObjects.Rectangle;
    private guageBar: Phaser.GameObjects.Rectangle;
    private timer: Phaser.Time.TimerEvent | null;
    private active: boolean;
    private remove: boolean;

    private static guageWidth = 30;
    private static guageHeight = 5;
    private static guageOffsetX = 10;
    private static guageOffsetY = 10;
    private static baseColor = 0x0000FF;
    private static guageColor = 0x00FFFF;
    private static noticeColor = 0xFFFF00;
    private static warnColor = 0xFF0000;

    /**
     * コンストラクタ
     * @param scene シーン
     * @param parent ギミックを適応する先
     * @param config コンフィグ
     */
    constructor(scene: Phaser.Scene, parent: Ball, config: gimicReverseConfig) {
        this.scene = scene;
        this.parent = parent;
        this.config = config
        this.timer = null;
        this.active = false;
        this.remove = false;

        this.effect = new EffectRingRed(scene, config.effect);
        this.startGimic();
        this._startTimer();

        //ゲージ
        {
            //ベース部分
            this.guageBack = scene.add.rectangle(0, 0, gimicReverse.guageWidth, gimicReverse.guageHeight,
                gimicReverse.baseColor);
            this.guageBack.setOrigin(0, 0);
            this.guageBack.setDepth(config.effect.depth + 1);

            //バー部分
            this.guageBar = scene.add.rectangle(0, 0, gimicReverse.guageWidth, gimicReverse.guageHeight,
                gimicReverse.guageColor);
            this.guageBar.setOrigin(0, 0);
            this.guageBar.setDepth(config.effect.depth + 2);

            this._updateGuage();
        }
    }

    // タイマーを開始する
    private _startTimer(): void {
        if (this.timer != null) {
            this.timer.remove();
        }
        this.timer = this.scene.time.addEvent({
            delay: this.config.delay,
            callback: this._endTimer,
            callbackScope: this,
        });
    }

    // タイマーを終了する
    private _endTimer(): void {
        this.removeGimic();
    }

    // ゲージ部分の更新処理
    private _updateGuage(): void {
        let progress = this.timer?.getProgress();
        if (progress == null) {
            progress = 1;
        }
        const remain = Math.max(1 - progress, 0);
        const guageW = gimicReverse.guageWidth * remain;
        const guageH = gimicReverse.guageHeight;
        this.guageBar.setSize(guageW, guageH);

        // 残り時間に応じてゲージの色を変える
        let color = gimicReverse.guageColor;
        if (remain < 0.1) {
            color = gimicReverse.warnColor;
        }
        else if (remain < 0.2) {
            color = gimicReverse.noticeColor;
        }
        else {
            color = gimicReverse.guageColor;
        }
        this.guageBar.setFillStyle(color);

        const postion = this.parent.getPosition();
        const x = postion.x + gimicReverse.guageOffsetX;
        const y = postion.y + gimicReverse.guageOffsetY;
        this.guageBack.setPosition(x, y);
        this.guageBar.setPosition(x, y);
    }

    //-----------------------------------------------------
    //imprements Gimic
    /**
     * ギミックタイプを取得する
     * @returns ギミックタイプ
     */
    getGimicType(): number {
        return this.config.gimic.type;
    }

    /**
     * ギミックの更新処理
     */
    updateGimic(): void {
        if (!this.isGimicActive()) { return; }
        if (this.isGimicRemoved()) { return; }

        const postion = this.parent.getPosition();
        this.effect.setPosition(postion.x, postion.y);
        this._updateGuage();
    }

    /**
     * ギミックの残り時間をリセットする
     */
    rechargeGimic(): void {
        if (!this.isGimicActive()) { return; }
        if (this.isGimicRemoved()) { return; }

        //タイマーをリセットする
        this._startTimer();
    }

    /**
     * ギミックを開始する
     */
    startGimic(): void {
        this.active = true;
        this.effect.setVisible(true);
    }

    /**
     * ギミックを停止する
     */
    stopGimic(): void {
        this.active = false;
        this.effect.setVisible(false);
        //効果終了音
        this.scene.sound.play(Assets.Audio.SE.POWEREND);

        this.guageBar.setVisible(false);
        this.guageBack.setVisible(false);
    }

    /**
     * ギミックが有効かどうか確認する
     * @returns ギミックが有効な場合はtrue、そうでない場合はfalseを返す
     */
    isGimicActive(): boolean {
        return this.active;
    }

    /**
     * ギミックをマネージャから外す
     */
    removeGimic(): void {
        this.stopGimic();
        this.remove = true;
    }

    /**
     * ギミックがマネージャから外れているか確認する
     * @returns ギミックが取り外されている場合はtrue、そうでない場合はfalseを返す
     */
    isGimicRemoved(): boolean {
        return this.remove;
    }

    /**
     * ギミックを破棄する
     */
    destroyGimic(): void {
        this.effect.destory();
        this.timer?.remove();
        this.guageBar.destroy();
        this.guageBack.destroy();
    }
}