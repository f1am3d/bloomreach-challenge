import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EventEditorFormGroupAttributeRange } from '../../../types/form';

@Component({
  selector: 'app-event-editor-attribute-params-range',
  templateUrl: './attribute-params-range.component.html',
  styleUrl: './attribute-params-range.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputTextModule, ReactiveFormsModule],
})
export class EventEditorAttributeParamsRangeComponent {
  readonly control = input.required<EventEditorFormGroupAttributeRange>();
}
