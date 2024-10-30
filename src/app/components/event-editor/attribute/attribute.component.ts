import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CacheService } from '../../../services/cache.service';
import { ApiEventProperties } from '../../../types/api';
import { EventEditorFormGroupAttribute } from '../../../types/form';
import { EventEditorAttributeParamsComponent } from '../attribute-params/attribute-params.component';

@Component({
  selector: 'app-event-editor-attribute',
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    EventEditorAttributeParamsComponent,
    Button,
  ],
})
export class EventEditorAttributeComponent {
  private readonly stateService = inject(CacheService);

  readonly control = input.required<EventEditorFormGroupAttribute>();
  readonly type = input<string | null>();
  readonly onRemoveEvent = output<EventEditorFormGroupAttribute>();

  readonly attributeList = computed((): ApiEventProperties[] => {
    const type = this.type();

    if (type) {
      return this.stateService.getEventByType(type)?.properties ?? [];
    }

    return [];
  });

  onRemoveButtonClick() {
    this.onRemoveEvent.emit(this.control());
  }
}
