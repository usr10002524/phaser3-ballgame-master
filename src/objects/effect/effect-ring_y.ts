import { Assets, Consts } from "../../consts";
import { EffectRing, EffectConfig } from "./effect-ring";

/**
 * リングエフェクト（黃）クラス
 */
export class EffectRingYellow extends EffectRing {

    /**
     * コンストラクタ
     * @param scene シーン
     * @param config コンフィグ
     */
    constructor(scene: Phaser.Scene, config: EffectConfig) {
        super(scene, config);
    }

    /**
     * Imageオブジェクトを作成する
     * @returns Imageオブジェクト
     */
    protected _createImage(): Phaser.GameObjects.Image {
        const ring = this.scene.add.image(0, 0, Assets.Graphic.Effects.KEY);
        ring.setFrame(Assets.Graphic.Effects.RING);
        ring.setDepth(this.config.depth);
        ring.setOrigin(0.5, 0.5);
        ring.setBlendMode(Phaser.BlendModes.ADD);
        ring.setVisible(this.visibled);

        return ring;
    }

    /**
     * Tweenオブジェクトを作成する
     * @param parent Imageオブジェクト
     * @returns Tweenオブジェクト
     */
    protected _createTween(parent: Phaser.GameObjects.Image): Phaser.Tweens.Tween {
        const tween = this.scene.add.tween({
            targets: parent,
            ease: 'Linear',
            duration: this.config.duration,
            paused: true,
            loop: -1,
            props: {
                scale: { from: 2.0, to: 0.5 },
                alpha: { from: 1.0, to: 0.5 },
            },
            loopDelay: this.config.loopDelay,
        });
        return tween;
    }
}