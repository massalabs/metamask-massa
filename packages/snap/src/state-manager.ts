export type State = Record<string, any>;

export class StateManager {
  private static state: State | undefined = undefined;

  public static getState(key: string) {
    if (!this.state) {
      this.state = this.retrieveState();
    }
    return this.state[key];
  }

  public static async setState(key: string, value: any) {
    if (!this.state) {
      this.state = await this.retrieveState();
    }
    this.state[key] = value;
    await this.persistState();
  }

  private static retrieveState(): Promise<State> {
    return snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' },
    }) as Promise<State>;
  }

  private static persistState() {
    return snap.request({
      method: 'snap_manageState',
      params: { operation: 'update', newState: this.state! },
    });
  }
}
