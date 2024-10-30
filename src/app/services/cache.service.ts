import { Injectable } from '@angular/core';
import { ApiEvent, ApiEvents } from '../types/api';

@Injectable()
export class CacheService {
  private readonly eventsBuffer = new Map<string, ApiEvent>();

  precacheEventData(apiResponse: ApiEvents) {
    for (const event of apiResponse.events) {
      this.eventsBuffer.set(event.type, event);
    }
  }

  getEventByType(type: string): ApiEvent | undefined {
    return this.eventsBuffer.get(type);
  }
}
