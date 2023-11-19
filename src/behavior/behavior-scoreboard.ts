import { atsumaru_displayScoreBoard, atsumaru_saveScoreBoard } from "../atsumaru/atsumaru";
import { Globals } from "../globals";
import { Log } from "../service/logwithstamp";
import { Behavior } from "./behavior";

/**
 * スコアボード表示処理
 */
export class BehaviorScoreBoard extends Behavior {

    private finished: boolean;

    /**
     * コンストラクタ
     */
    constructor() {
        super('BehaviorScoreBoard');
        this.finished = false;
    }

    /**
    * 初期化処理
    */
    initialize(): void {
        this._setScore();
        // this._displayScore();
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
    }

    /**
     * 終了処理
     */
    isFinished(): boolean {
        return this.finished;
    }

    // 今回のスコアを登録する
    private _setScore(): void {
        const mode = Globals.get().getMode();
        const score = Globals.get().getScore();
        atsumaru_saveScoreBoard(
            {
                mode: mode,
                score: score,
            },
            (result) => {
                this._displayScore();
            }
        );
    }

    // スコアボードを表示する
    private _displayScore(): void {
        const mode = Globals.get().getMode();
        atsumaru_displayScoreBoard(
            {
                mode: mode,
            },
            (result) => {
            }
        );
    }
}