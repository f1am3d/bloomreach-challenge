export interface ApiEvents {
  events: ApiEvent[];
}

export interface ApiEvent {
  type: string;
  properties: ApiEventProperties[];
}

export interface ApiEventProperties {
  property: string;
  type: string;
}
