/**
 * 各種定数
 */
export const Consts = {
    TITLE: "TAG BALLS",
    VERSION: "202303171402",

    //画面サイズ
    Screen: {
        WIDTH: 800,
        HEIGHT: 600,
        BGCOLOR: 0xE0E0E0,
    },


    // ゲーム設定
    Game: {
        LIFE: 2,    // 残機
        TIME: (3 * 60 * 1000),  //3分
        // ゲームモード
        Mode: {
            NOMAL: 1,   // 通常
            TIMEATTACK: 2,  // タイムアタック
        },
        REDUCE_TIME: 10000, //タイムアタックでミスしたときに減る時間
    },

    // 背景
    BG: {
        DEPTH: 0,   // 表示優先度
    },

    // タイルマップ
    Map: {
        // ベースレイヤー
        Base: {
            DEPTH: 0,   // 表示優先度
        },
        // 透過レイヤー
        Trans: {
            DEPTH: 1,   // 表示優先度
        },
    },

    // プレーヤー
    Player: {
        DEPTH: 2,   // 表示優先度
    },

    // エネミー
    Enemy: {
        DEPTH: 2,   // 表示優先度

        // 敵の状態
        Stat: {
            NONE: 0,    // なし
            NORMAL: 1,  // 通常
            ESCAPE: 2,  // プレーヤーから逃げる
            STAY: 3,    // スポーン地点に留まる
            OUT: 4,     // スポーン地点から出る
            POWERUP: 5, // 強化除隊
        },

        SCORE: 100, // 倒した際のベーススコア

        SPWN_STAY_TIME: 1000,   // スポーン地点に留まる時間
        RESPWN_STAY_TIME: 5000, // リスポーン時に留まる時間
    },

    // ビット
    Bit: {
        // 通常
        Small: {
            SCORE: 10   // 獲得時のスコア
        },
        // パワービット
        Power: {
            SCORE: 100, // 獲得時のスコア
        },
    },

    // エフェクト
    Effects: {
        // 黃
        Ring: {
            DEPTH: 1,       // 表示優先度
            DURATION: 800,  // ループ時間
            COUNT: 3,       // 表示する個数
            LOOPDELAY: 200, // ループ時のディレイ時間
            SPAN: 200,      // 生成感覚
        },
        // 赤
        Ring_r: {
            DEPTH: 3,       // 表示優先度
            DURATION: 400,  // ループ時間
            COUNT: 1,       // 表示する個数
            LOOPDELAY: 0,   // ループ時のディレイ時間
            SPAN: 100,      // 生成間隔
        },
    },

    //タイルセット各画像のインデックス
    Tiles: {
        TILE: 1,    // 通常タイル
        PLAYER_START: 2,    // プレーヤーのスタート位置
        ENEMY_GOAL: 3,  // 敵のゴール（未使用）
        PLAYER_GOAL: 4, // プレーヤーのゴール
        ENEMY_START: 5, // 敵のスタート地点
        WALL: 6,        // 壁
        OBSTACLE: 7,    // 障害物
        REVERSE: 8,     // ギミック（リバース）
        TRANS_WALL: 9,  // 透過壁（敵が通過可能な壁）

    },

    //ギミック
    Gimics: {
        // タイプ
        Type: {
            NONE: 0,    // なし
            REVERSE: 1, // 行動反転
        },
    },

    //タイム
    Time: {
        SCORE: 100.
    },

    //UI
    UI: {
        /*  共通パラメータ
            Position 表示位置(x:X座標、y:Y座標)
            Origin  中心位置(0-1)(x:X中心位置、y:Y中心位置)
            Scale   スケーリング(x:Xスケーリング、y:Yスケーリング)
            Size    サイズ(x:横サイズ、y:縦サイズ)
            DEPTH   表示優先度
        */

        // スコア
        Score: {
            Text: {
                Position: {
                    x: 20,
                    y: 20,
                },
                Origin: {
                    x: 0,
                    y: 0,
                },
                DEPTH: 3,
            },
            // 得点によって大きさを変えるしきい値
            Threshold: {
                Small: {
                    VALUE: 100,
                    // DELAY: 0,
                    DELAY: 100,
                },
                Middle: {
                    VALUE: 1000,
                    // DELAY: 100,
                    DELAY: 500,
                },
                Large: {
                    VALUE: 9999999,
                    DELAY: 1000
                },
            },
        },
        // 残機数
        Lives: {
            // ボール部分
            Ball: {
                Position: {
                    x: 730,
                    y: 20,
                },
                Origin: {
                    x: 0,
                    y: 0,
                },
                Scale: {
                    x: 0.6,
                    y: 0.6,
                },
                DEPTH: 3,
            },
            // テキスト部分
            Text: {
                Position: {
                    x: 750,
                    y: 20,
                },
                Origin: {
                    x: 0,
                    y: 0,
                },
                DEPTH: 3,
            },
        },
        // ステージ数表示
        Stage: {
            Text: {
                Position: {
                    x: 400,
                    y: 20,
                },
                Origin: {
                    x: 0.5,
                    y: 0,
                },
                DEPTH: 3,
            },
        },
        // タイマーゲージ
        TimerGuage: {
            // 枠
            Frame: {
                Position: {
                    x: 15,
                    y: 530,
                },
                Origin: {
                    x: 0,
                    y: 0,
                },
                DEPTH: 4,
            },
            // ゲージ
            Guage: {
                Position: {
                    x: 20,
                    y: 535,
                },
                Size: {
                    x: 760,
                    y: 20,
                },
                Origin: {
                    x: 0,
                    y: 0,
                },
                DEPTH: 2,
            },
        },
        // シェード
        Shade: {
            Position: {
                x: 15,
                y: 18,
            },
            Scale: {
                x: 16.1,
                y: 0.5,
            },
            Origin: {
                x: 0,
                y: 0,
            },
            DEPTH: 2,
        },

        // 各種UI
        Ready: {
            DEPTH: 3,
        },
        Start: {
            DEPTH: 3,
        },
        Clear: {
            DEPTH: 3,
        },
        GameOver: {
            DEPTH: 3,
        },
        Congratulations: {
            DEPTH: 3,
        },
        ReturnTitle: {
            DEPTH: 3,
        },
    },

    //ボリューム表示
    SoundVolume: {
        Base: {
            Pos: {
                X: 732,
                Y: 580,
            },
        },
        Icon: {
            Pos: {
                X: -40,
                Y: 0,
            },
            Scale: {
                X: 0.6,
                Y: 0.6,
            },
            DEPTH: 2,
        },
        Handle: {
            Size: {
                W: 10,
                H: 25,
            },
            Color: {
                NORMAL: 0xF0F0F0,
                DISABLED: 0x808080,
                GRABED: 0xA0A0A0,
            },
            DEPTH: 4,
        },
        Guage: {
            Pos: {
                X: -24,
                Y: 0,
            },
            Size: {
                W: 72,
                H: 10,
            },
            Color: {
                NORMAL: 0xFFFFFF,
                DISABLED: 0x808080,
            },
            DEPTH: 3,
        },
        GuageBg: {
            COLOR: 0x000000,
            DEPTH: 2,
        },
        Panel: {
            Pos: {
                X: -58,
                Y: 0,
            },
            Size: {
                W: 116,
                H: 40,
            },
            COLOR: 0x404040,
            ALPHA: 0.5,
            DEPTH: 1,
        },
    },

    // 言語
    Localizable: {
        ENGLISH: 1,
        JAPANEASE: 2,
    },
}

/**
 * アセット定義
 */
export const Assets = {
    BASE: 'assets/',

    //グラフィック
    Graphic: {
        Objects: {
            KEY: 'objects',
            ATLAS: 'image/objects_atlas.json',
            FILE: 'image/objects.png',

            RED: 'red',
            BLUE: 'bule',
            YELLOW: 'orange',
            BIT: 'bit',
            POWERBIT: 'powerbit',
        },

        Effects: {
            KEY: 'effects',
            ATLAS: 'image/effects_atlas.json',
            FILE: 'image/effects.png',

            RING: 'ring',
            RING_R: 'power32_2',
        },

        Tiles: {
            KEY: 'tiles',
            ATLAS: 'image/tiles_atlas.json',
            FILE: 'image/tiles.png',

            TILE: 'tile',
            PLAYER_START: 'player_start',
            PLAYER_GOAL: 'player_goal',
            ENEMY_START: 'enemy_start',
            ENEMY_GOAL: 'enemy_goal',
            WALL: 'wall',
            OBSTACLE: 'obstacle',
            REVERSE: 'reverse',
        },

        UIs: {
            KEY: 'uis',
            ATLAS: 'image/uis_atlas.json',
            FILE: 'image/uis.png',

            GUAGE_FRAME: 'guage_frame',
            SHADE: 'shade',
            READY: 'ready',
            START: 'start',
            CLEAR: 'clear',
            TIMEUP: 'timeup',
            GAMEOVER: 'gameover',
            CONGRA: 'congra',
            PANEL: 'panel',
            RETURN_TITLE: 'returntitle'
        },

        // ニコニコ
        // TitleUIs: {
        //     KEY: 'title_uis',
        //     ATLAS: 'image/title_uis_atlas.json',
        //     FILE: 'image/title_uis.png',

        //     TITLE: 'title',
        //     START: 'gamestart',
        //     TIMEATTACK: 'timeattack',
        // },
        // 海外
        TitleUIs: {
            KEY: 'title_uis',
            ATLAS: 'image2/title_uis_atlas.json',
            FILE: 'image2/title_uis.png',

            TITLE: 'title',
            START: 'gamestart',
            TIMEATTACK: 'timeattack',
        },

        // ニコニコ
        // TitleBG: {
        //     KEY: 'title_bg',
        //     FILE: 'image/title_bg.png',
        // },
        // 海外
        TitleBG: {
            KEY: 'title_bg',
            FILE: 'image2/title_bg.png',
        },

        // サウンドボリューム
        SoundIcons: {
            Atlas: {
                NAME: "sound_icons",
                FILE: "image/sound_icons.png",
                ATLAS: "image/sound_icons_atlas.json",
            },

            Volume: {
                ON: "sound_w",
                OFF: "sound_w",
                GRAY: "sound_g",
            },
            Mute: {
                ON: "mute_w",
                OFF: "mute_w",
                GRAY: "mute_g",
            },
        },

        // ニコニコ
        // GameBGs: [
        //     { KEY: 'gamebg01', FILE: 'image/gamebg01.png' },
        //     { KEY: 'gamebg02', FILE: 'image/gamebg02.png' },
        // ],
        // 海外
        GameBGs: [
            { KEY: 'gamebg01', FILE: 'image2/gamebg01.png' },
            { KEY: 'gamebg02', FILE: 'image2/gamebg02.png' },
        ],
    },

    //サウンド
    Audio: {
        SEs: [
            { KEY: 'se_01_01', MP3: 'audio/se/se_01_01.mp3', OGG: 'audio/se/se_01_01.ogg' },
            { KEY: 'se_01_02', MP3: 'audio/se/se_01_02.mp3', OGG: 'audio/se/se_01_02.ogg' },
            { KEY: 'se_01_03', MP3: 'audio/se/se_01_03.mp3', OGG: 'audio/se/se_01_03.ogg' },
            { KEY: 'se_01_04', MP3: 'audio/se/se_01_04.mp3', OGG: 'audio/se/se_01_04.ogg' },
            { KEY: 'se_01_08', MP3: 'audio/se/se_01_08.mp3', OGG: 'audio/se/se_01_08.ogg' },
            { KEY: 'se_01_11', MP3: 'audio/se/se_01_11.mp3', OGG: 'audio/se/se_01_11.ogg' },
            { KEY: 'se_01_14', MP3: 'audio/se/se_01_14.mp3', OGG: 'audio/se/se_01_14.ogg' },
            { KEY: 'se_01_16', MP3: 'audio/se/se_01_16.mp3', OGG: 'audio/se/se_01_16.ogg' },
            { KEY: 'se_01_17', MP3: 'audio/se/se_01_17.mp3', OGG: 'audio/se/se_01_17.ogg' },
            { KEY: 'se_01_18', MP3: 'audio/se/se_01_18.mp3', OGG: 'audio/se/se_01_18.ogg' },
            { KEY: 'se_02_10', MP3: 'audio/se/se_02_10.mp3', OGG: 'audio/se/se_02_10.ogg' },
            { KEY: 'se_02_13', MP3: 'audio/se/se_02_13.mp3', OGG: 'audio/se/se_02_13.ogg' },
            // ニコニコ
            // { KEY: 'se_03_02', MP3: 'audio/se/se_03_02.mp3', OGG: 'audio/se/se_03_02.ogg' },
            // 海外
            { KEY: 'se_02_01', MP3: 'audio/se2/se_02_01.mp3', OGG: 'audio/se2/se_02_01.ogg' },
        ],
        SE: {
            SELECT: "se_02_13",
            DECIDE: "se_02_10",
            // ニコニコ
            // BIT: "se_03_02",
            // 海外
            BIT: "se_02_01",
            POWERBIT: "se_01_08",
            POWEREND: "se_01_11",
            WALL: "se_01_03",
            MISS: "se_01_16",
            READY: "se_01_04",
            START: "se_01_17",
            ATACK: "se_01_18",
            CLEAR: "se_01_01",
            ALLCLEAR: "se_01_02",
            GAMEOVER: "se_01_14",
        },

        BGMs: [
            { KEY: 'bgm_01_01', MP3: 'audio/bgm/bgm_01_01.mp3', OGG: 'audio/bgm/bgm_01_01.ogg' },
            { KEY: 'bgm_01_02', MP3: 'audio/bgm/bgm_01_02.mp3', OGG: 'audio/bgm/bgm_01_02.ogg' },
            { KEY: 'bgm_01_03', MP3: 'audio/bgm/bgm_01_03.mp3', OGG: 'audio/bgm/bgm_01_03.ogg' },
            { KEY: 'bgm_01_04', MP3: 'audio/bgm/bgm_01_04.mp3', OGG: 'audio/bgm/bgm_01_04.ogg' },
            { KEY: 'bgm_01_07', MP3: 'audio/bgm/bgm_01_07.mp3', OGG: 'audio/bgm/bgm_01_07.ogg' },
            { KEY: 'bgm_01_06', MP3: 'audio/bgm/bgm_01_06.mp3', OGG: 'audio/bgm/bgm_01_06.ogg' },
        ],
        BGM: {
            BGMOP: 'bgm_01_02',
            BGM01: 'bgm_01_04',
            BGM02: 'bgm_01_07',
            BGM03: 'bgm_01_06',
        },
    },

    //タイルマップ
    Tilemaps: [
        { KEY: 'stage01', FILE: 'map/pac01.json', TILESET: 'tiles', BASELAYER: 'map', TRANSLAYER: 'trans', },
        { KEY: 'stage02', FILE: 'map/pac02.json', TILESET: 'tiles', BASELAYER: 'map', TRANSLAYER: 'trans', },
        { KEY: 'stage03', FILE: 'map/pac03.json', TILESET: 'tiles', BASELAYER: 'map', TRANSLAYER: 'trans', },
        { KEY: 'stage04', FILE: 'map/pac04.json', TILESET: 'tiles', BASELAYER: 'map', TRANSLAYER: 'trans', },
        { KEY: 'stage05', FILE: 'map/pac05.json', TILESET: 'tiles', BASELAYER: 'map', TRANSLAYER: 'trans', },
        { KEY: 'stage06', FILE: 'map/pac06.json', TILESET: 'tiles', BASELAYER: 'map', TRANSLAYER: 'trans', },
        { KEY: 'stage07', FILE: 'map/pac07.json', TILESET: 'tiles', BASELAYER: 'map', TRANSLAYER: 'trans', },
    ],

    //言語
    Localizable: {
        KEY: "localizable",
        File: {
            ENGLISH: "",
            JAPANEASE: "",
            DEFAULT: "",
        },

        Sentence: {
        },
    },
}
