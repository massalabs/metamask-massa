export type State = Record<string, any>;

export class StateManager {
  static #state: State | undefined = undefined;

  public static async getState(key: string) {
    if (!this.#state) {
      this.#state = await this.#retrieveState();
    }
    return this.#state[key];
  }

  public static async setState(key: string, value: any) {
    if (!this.#state) {
      this.#state = await this.#retrieveState();
    }
    this.#state[key] = value;
    await this.#persistState();
  }

  static async #retrieveState(): Promise<State> {
    return snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' },
    }) as Promise<State>;
  }

  static async #persistState() {
    if (this.#state !== undefined) {
      await snap.request({
        method: 'snap_manageState',
        params: { operation: 'update', newState: this.#state },
      });
    }
  }
}
