/**
 * タイマークラス
 */
export class Timer {
    protected active: boolean;
    protected current: number;

    constructor() {
        this.active = false;
        this.current = 0;
    }

    // タイマーをリセットする
    reset(): void {
        this.active = false;
        this.current = 0;
    }
    // タイマーを解する
    start(): void {
        this.active = true;
        this.current = 0;
    }
    // タイマーをポーズする
    pause(): void {
        this.active = false;
    }
    // タイマーを再開する
    resume(): void {
        this.active = true;
    }
    // 現在の時間を取得する
    get(): number {
        return this.current;
    }
    // タイマーを更新する
    update(delta: number): void {
        if (this.active) {
            this.current += delta;
        }
    }
}

/**
 * インターバルタイマークラス
 */
export class IntervalTimer extends Timer {
    protected duration: number;

    /**
     * コンストラクタ
     * @param duration 計測する時間
     */
    constructor(duration: number) {
        super();
        this.duration = duration;
    }

    // タイマーを更新する
    update(delta: number): void {
        if (this.active) {
            this.current += delta;
            this.current = Math.min(this.current, this.duration);
        }
    }

    // 残り時間を取得する
    getRemain(): number {
        return this.duration - this.current;
    }
    // 残り時間を％で取得する
    getRemainPercentage(): number {
        if (this.duration > 0) {
            return (this.duration - this.current) / this.duration;
        }
        else {
            return 0;
        }
    }

    // タイマーを加算する
    add(value: number): void {
        this.current += value;
        this.current = Math.min(this.current, this.duration);
        this.current = Math.max(this.current, 0);
    }
}