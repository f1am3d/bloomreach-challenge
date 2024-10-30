import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ApiService } from '../../services/api.service';
import { CacheService } from '../../services/cache.service';
import {
  EventEditorFormGroup,
  EventEditorFormGroupAttribute,
} from '../../types/form';
import { EventEditorComponent } from '../event-editor/event-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EventEditorComponent, CardModule, Button, DividerModule, JsonPipe],
  providers: [CacheService],
})
export class AppComponent implements OnInit {
  private readonly stateService = inject(CacheService);
  private readonly apiService = inject(ApiService);
  private readonly formBuilder = inject(FormBuilder);

  readonly formArray = this.formBuilder.array<FormGroup<EventEditorFormGroup>>(
    []
  );

  ngOnInit() {
    this.apiService.loadEvents().subscribe((response) => {
      this.stateService.precacheEventData(response);
    });

    this.addEvent();
  }

  addEvent() {
    this.formArray.push(
      this.formBuilder.group<EventEditorFormGroup>({
        event: this.formBuilder.control<string | null>(null),
        attributes: this.formBuilder.array(
          [] as EventEditorFormGroupAttribute[]
        ),
      })
    );
  }

  removeEvent(event: FormGroup<EventEditorFormGroup>) {
    const index = this.formArray.controls.indexOf(event);
    this.formArray.removeAt(index);
  }

  discardFilters() {
    this.formArray.clear();
  }

  applyFilters() {
    console.log('RESULT: ', this.formArray.getRawValue());
  }
}
