import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { EventEditorFormGroupAttribute } from '../../../types/form';
import { EventEditorAttributeParamsRangeComponent } from '../attribute-params-range/attribute-params-range.component';

@Component({
  selector: 'app-event-editor-attribute-params',
  templateUrl: './attribute-params.component.html',
  styleUrl: './attribute-params.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    EventEditorAttributeParamsRangeComponent,
  ],
})
export class EventEditorAttributeParamsComponent implements OnInit {
  readonly control = input.required<EventEditorFormGroupAttribute>();
  readonly selectedType = input.required<string>();

  readonly signs = {
    string: ['equals', 'does not equal', 'contains', 'does not contain'],
    number: ['equal to', 'in between', 'less than', 'greater than'],
  };

  ngOnInit() {
    if (this.selectedType() === 'string') {
      this.control().controls.symbol.setValue(this.signs.string[0]);
    } else if (this.selectedType() === 'number') {
      this.control().controls.symbol.setValue(this.signs.number[0]);
    }
  }
}
