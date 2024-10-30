import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiEvents } from '../types/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  loadEvents() {
    return this.http.get<ApiEvents>(
      'https://br-fe-assignment.github.io/customer-events/events.json'
    );
  }
}
