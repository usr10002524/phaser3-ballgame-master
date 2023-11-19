import { Globals } from "../../globals";
import { Coord2 } from "../../types";

/**
 * コンフィグ
 */
export type uiTimerGuageConfig = {
    frame: {
        key: string;    // ファイルのキー
        frame: string;  // 表示フレーム
        position: Coord2;   // 表示位置
        origin: Coord2; // 中心座標(0-1)
        depth: number;  // 表示優先順位
    },
    guage: {
        position: Coord2;   // 表示位置
        size: Coord2;   // 表示サイズ
        origin: Coord2; // 中心座標(0-1)
        depth: number;  // 表示優先順位
    }
}

/**
 * ゲージの状態
 */
const GuageStat = {
    NORMAL: 0,  // 通常
    NOTICE: 1,  // 注意
    WARN: 2,    // 警告
}
/**
 * ゲージ状態のしきい値
 */
const GuageStatThreshold = {
    NORMAL: 0,
    NOTICE: 0.2,
    WARN: 0.1,
}

/**
 * ゲージUIクラス
 */
export class uiTimerGuage {

    private scene: Phaser.Scene;
    private config: uiTimerGuageConfig;
    private base: Phaser.GameObjects.Rectangle;
    private guage: Phaser.GameObjects.Rectangle;
    private frame: Phaser.GameObjects.Image;
    private stat: number;

    private static baseColor = 0x0000FF;
    private static guageColor = 0x00FFFF;
    private static noticeColor = 0xFFFF00;
    private static warnColor = 0xFF0000;

    /**
     * コンストラクタ
     * @param scene シーン
     * @param config コンフィグ
     */
    constructor(scene: Phaser.Scene, config: uiTimerGuageConfig) {
        this.scene = scene;
        this.config = config;

        //枠
        this.frame = scene.add.image(config.frame.position.x, config.frame.position.y, config.frame.key, config.frame.frame);
        this.frame.setOrigin(config.frame.origin.x, config.frame.origin.y);
        this.frame.setDepth(config.frame.depth);

        //ベース部分
        this.base = scene.add.rectangle(config.guage.position.x, config.guage.position.y,
            config.guage.size.x, config.guage.size.y, uiTimerGuage.baseColor);
        this.base.setOrigin(config.guage.origin.x, config.guage.origin.y);
        this.base.setDepth(config.guage.depth);

        //ゲージ部分
        this.guage = scene.add.rectangle(config.guage.position.x, config.guage.position.y,
            config.guage.size.x, config.guage.size.y, uiTimerGuage.guageColor);
        this.guage.setOrigin(config.guage.origin.x, config.guage.origin.y);
        this.guage.setDepth(config.guage.depth + 1);

        this.stat = GuageStat.NORMAL;
    }

    /**
     * 更新処理
     */
    update(): void {
        const percent = Globals.get().getRemainPercent();
        const w = this.config.guage.size.x * percent;
        const h = this.config.guage.size.y;
        this.guage.setSize(w, h);

        const stat = this._getStat(percent);
        if (this.stat != stat) {
            this.stat = stat;
            if (this.stat === GuageStat.NOTICE) {
                this.guage.setFillStyle(uiTimerGuage.noticeColor);
            }
            else if (this.stat === GuageStat.WARN) {
                this.guage.setFillStyle(uiTimerGuage.warnColor);
            }
        }
    }

    // ゲージ状態を取得する
    private _getStat(percent: number) {
        if (percent < GuageStatThreshold.WARN) {
            return GuageStat.WARN;
        }
        else if (percent < GuageStatThreshold.NOTICE) {
            return GuageStat.NOTICE;
        }
        else {
            return GuageStat.NORMAL;
        }
    }

}