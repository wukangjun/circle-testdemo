export type DispatchToken = string;
export type DispatchCallback<P> = (payload: P) => void;

const PREFIX: string = 'ID__';

export class Dispatcher<TPayload> {
  private _callbacks: Record<DispatchToken, DispatchCallback<TPayload>> = {};

  private _isDispatching: boolean = false;

  private _isHandled: Record<DispatchToken, boolean> = {};

  private _isPending: Record<DispatchToken, boolean> = {};

  private _lastID: number = 1;

  private _pendingPayload: TPayload | null = null;

  public register(callback: DispatchCallback<TPayload>): DispatchToken {
    let id = PREFIX + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  }

  public unregister(id: DispatchToken): void {
    if (this._callbacks[id]) {
      delete this._callbacks[id];
    }
  }

  public dispatch(payload: TPayload): void {
    this._startDispatcing(payload);
    try {
      for (let id in this._callbacks) {
        // 保证回调只能通过dispatch触发
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  }

  public isDispatching(): boolean {
    return this._isDispatching;
  }

  private _invokeCallback(id: DispatchToken): void {
    this._isPending[id] = true;
    this._pendingPayload && this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  }

  private _startDispatcing(payload: TPayload): void {
    // 初始化重置
    // 将等待状态和处理完成状态全部设置false
    for (let id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }

    // 当前正在等待执行的action
    this._pendingPayload = payload;
    this._isDispatching = true;
  }

  private _stopDispatching(): void {
    this._pendingPayload = null;
    this._isDispatching = false;
  }
}
