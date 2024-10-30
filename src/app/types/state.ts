export interface State {
  events: StateEvent[];
}

export interface StateEvent {
  type: string;
  attributes: StateEventAttribute[];
}

export interface StateEventAttribute {
  type: string | null;
  sign: string | null;
}
