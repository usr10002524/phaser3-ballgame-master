import { atsumaru_getVolume, atsumaru_isValid, atsumaru_onChangeVolume, atsumaru_setScreenshoScene } from "../atsumaru/atsumaru";
import { SoundVolume, SoundVolumeConfig } from "../common/sound-volume";
import { Assets, Consts } from "../consts";
import { Globals } from "../globals";

/**
 * タイトルシーン
 */
export class SceneTitle extends Phaser.Scene {

    private bg: Phaser.GameObjects.Image | null;
    private title: Phaser.GameObjects.Image | null;
    private start: Phaser.GameObjects.Image | null;
    private timeattack: Phaser.GameObjects.Image | null;
    private panel: Phaser.GameObjects.Rectangle[];
    private bgm: Phaser.Sound.BaseSound | null;
    private soundVolume: SoundVolume | null;

    /**
     * コンストラクタ
     */
    constructor() {
        super({ key: "Title" });

        this.bg = null;
        this.title = null;
        this.start = null;
        this.timeattack = null;
        this.panel = [];
        this.bgm = null;
        this.soundVolume = null;
    }

    /**
     * ロード処理
     */
    preload() {
    }

    /**
     * 初期化
     */
    create() {
        this.cameras.main.setBackgroundColor(0x101010);
        Globals.get().reset();

        this._initVolume();
        this._createPanel();
        this._createImage();

        this.bgm = this.sound.add(Assets.Audio.BGM.BGMOP);
        this.bgm.play();

        //スクリーンショット撮影のシーン登録
        atsumaru_setScreenshoScene(this);
    }

    /**
     * 更新処理
     */
    update(): void {
    }

    // ボリュームの初期化
    private _initVolume(): void {
        if (atsumaru_isValid()) {
            //現在のボリュームを取得し設定
            const volume = atsumaru_getVolume();
            if (volume) {
                this.sound.volume = volume;
            }
            //ボリュームが変わったときのコールバックを設定
            atsumaru_onChangeVolume((volume: number) => {
                this.sound.volume = volume;
            });
        }
        else {
            this._createSoundVolume();
        }
    }

    // サウンドボリュームUIの作成
    private _createSoundVolume(): void {
        const config: SoundVolumeConfig = {
            pos: {
                x: Consts.SoundVolume.Base.Pos.X,
                y: Consts.SoundVolume.Base.Pos.Y,
            },
            depth: Consts.SoundVolume.Panel.DEPTH,

            icon: {
                atlas: Assets.Graphic.SoundIcons.Atlas.NAME,
                frame: {
                    volume: Assets.Graphic.SoundIcons.Volume.ON,
                    mute: Assets.Graphic.SoundIcons.Mute.ON,
                },
                pos: {
                    x: Consts.SoundVolume.Icon.Pos.X,
                    y: Consts.SoundVolume.Icon.Pos.Y,
                },
                scale: {
                    x: Consts.SoundVolume.Icon.Scale.X,
                    y: Consts.SoundVolume.Icon.Scale.Y,
                },
                depth: Consts.SoundVolume.Icon.DEPTH,
            },

            guage: {
                pos: {
                    x: Consts.SoundVolume.Guage.Pos.X,
                    y: Consts.SoundVolume.Guage.Pos.Y,
                },
                size: {
                    w: Consts.SoundVolume.Guage.Size.W,
                    h: Consts.SoundVolume.Guage.Size.H,
                },
                color: {
                    normal: Consts.SoundVolume.Guage.Color.NORMAL,
                    disabled: Consts.SoundVolume.Guage.Color.DISABLED,
                    bg: Consts.SoundVolume.GuageBg.COLOR,
                },
                depth: {
                    bar: Consts.SoundVolume.Guage.DEPTH,
                    bg: Consts.SoundVolume.GuageBg.DEPTH,
                }

            },

            handle: {
                size: {
                    w: Consts.SoundVolume.Handle.Size.W,
                    h: Consts.SoundVolume.Handle.Size.H,
                },
                color: {
                    normal: Consts.SoundVolume.Handle.Color.NORMAL,
                    disabled: Consts.SoundVolume.Handle.Color.DISABLED,
                    grabed: Consts.SoundVolume.Handle.Color.GRABED,
                },
                depth: Consts.SoundVolume.Handle.DEPTH,
            },

            panel: {
                pos: {
                    x: Consts.SoundVolume.Panel.Pos.X,
                    y: Consts.SoundVolume.Panel.Pos.Y,
                },
                size: {
                    w: Consts.SoundVolume.Panel.Size.W,
                    h: Consts.SoundVolume.Panel.Size.H,
                },
                color: {
                    normal: Consts.SoundVolume.Panel.COLOR,
                },
                alpha: {
                    normal: Consts.SoundVolume.Panel.ALPHA,
                },
                depth: Consts.SoundVolume.Panel.DEPTH,
            },
        }
        this.soundVolume = new SoundVolume(this, config);
    }

    // 画像の作成
    private _createImage(): void {
        //背景
        {
            const x = this.game.canvas.width * 0.5;
            const y = this.game.canvas.height * 0.5;
            const depth = 0;
            this.bg = this.add.image(x, y, Assets.Graphic.TitleBG.KEY);
            this.bg.setDepth(depth);
        }
        //TITLE
        {
            const x = this.game.canvas.width * 0.5;
            const y = 200;
            const depth = 3;
            this.start = this.add.image(x, y, Assets.Graphic.TitleUIs.KEY, Assets.Graphic.TitleUIs.TITLE);
            this.start.setDepth(depth);
        }
        //START
        {
            const x = this.game.canvas.width * 0.5;
            const y = 420;
            const depth = 3;
            const panelIndex = 0;
            this.start = this.add.image(x, y, Assets.Graphic.TitleUIs.KEY, Assets.Graphic.TitleUIs.START);
            this.start.setDepth(depth);
            this.start.setInteractive();
            this.start.on("pointerout", () => {
                if (panelIndex < this.panel.length) {
                    this.panel[panelIndex].setFillStyle(0x0000FF);
                }
            });
            this.start.on("pointerdown", () => {
                if (panelIndex < this.panel.length) {
                    this.panel[panelIndex].setFillStyle(0x00FF7F);
                }
                this.sound.play(Assets.Audio.SE.DECIDE);
            });
            this.start.on("pointerup", () => {
                if (panelIndex < this.panel.length) {
                    this.panel[panelIndex].setFillStyle(0x0000FF);
                }
                this._onStart(Consts.Game.Mode.NOMAL);
            });
        }
        //TIME ATTACH
        {
            const x = this.game.canvas.width * 0.5;
            const y = 500;
            const depth = 3;
            const panelIndex = 1;

            this.timeattack = this.add.image(x, y, Assets.Graphic.TitleUIs.KEY, Assets.Graphic.TitleUIs.TIMEATTACK);
            this.timeattack.setDepth(depth);
            this.timeattack.setInteractive();
            this.timeattack.on("pointerout", () => {
                if (panelIndex < this.panel.length) {
                    this.panel[panelIndex].setFillStyle(0x0000FF);
                }
            });
            this.timeattack.on("pointerdown", () => {
                if (panelIndex < this.panel.length) {
                    this.panel[panelIndex].setFillStyle(0x00FF7F);
                }
                this.sound.play(Assets.Audio.SE.DECIDE);
            });
            this.timeattack.on("pointerup", () => {
                if (panelIndex < this.panel.length) {
                    this.panel[panelIndex].setFillStyle(0x0000FF);
                }
                this._onStart(Consts.Game.Mode.TIMEATTACK);
            });
        }
    }

    // パネルの作成
    private _createPanel(): void {

        //パネル表示
        {
            const x = this.game.canvas.width * 0.5;
            const y = 430;
            const w = 300;
            const h = 20;

            const rect = this.add.rectangle(x, y, w, h, 0x0000FF);
            rect.setOrigin(0.5, 0);
            rect.setDepth(2);

            this.panel.push(rect);
        }
        {
            const x = this.game.canvas.width * 0.5;
            const y = 510;
            const w = 515;
            const h = 20;

            const rect = this.add.rectangle(x, y, w, h, 0x0000FF);
            rect.setOrigin(0.5, 0);
            rect.setDepth(2);

            this.panel.push(rect);
        }
    }

    // メインシーンへ遷移する
    private _onStart(mode: number) {
        Globals.get().setMode(mode);
        this.scene.start("Main");
        this.bgm?.stop();
    }
}