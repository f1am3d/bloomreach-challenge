import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { ApiEvent } from '../../types/api';
import {
  EventEditorFormGroup,
  EventEditorFormGroupAttribute,
} from '../../types/form';
import { EventEditorAttributeComponent } from './attribute/attribute.component';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrl: './event-editor.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CardModule,
    DropdownModule,
    Button,
    FormsModule,
    InputTextModule,
    JsonPipe,
    EventEditorAttributeComponent,
  ],
})
export class EventEditorComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly formBuilder = inject(FormBuilder);

  readonly formGroup = input.required<FormGroup<EventEditorFormGroup>>();
  readonly index = input.required<number>();
  readonly onRemoveEvent = output<FormGroup<EventEditorFormGroup>>();

  readonly eventList = signal<ApiEvent[]>([]);

  ngOnInit() {
    this.apiService
      .loadEvents()
      .pipe(
        map((response) => {
          return response.events;
        })
      )
      .subscribe((events: ApiEvent[]) => {
        this.eventList.set(events);
      });
  }

  onSelectEventType() {
    if (this.formGroup().controls.attributes.length === 0) {
      this.addAttributeControl();
    }
  }

  addEventAttribute() {
    this.addAttributeControl();
  }

  private addAttributeControl() {
    this.formGroup().controls.attributes.push(
      this.formBuilder.group({
        property: this.formBuilder.control<string | null>(null),
        symbol: this.formBuilder.control<string | null>(null),
        value: this.formBuilder.control<string | null>(null),
        range: this.formBuilder.group({
          from: this.formBuilder.control<number | null>(0),
          to: this.formBuilder.control<number | null>(0),
        }),
      })
    );
  }

  removeAttribute(attributeControl: EventEditorFormGroupAttribute) {
    const index =
      this.formGroup().controls.attributes.controls.indexOf(attributeControl);
    this.formGroup().controls.attributes.removeAt(index);
  }

  onRemoveEventClick() {
    this.onRemoveEvent.emit(this.formGroup());
  }
}
