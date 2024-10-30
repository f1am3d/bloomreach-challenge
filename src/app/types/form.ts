import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type EventEditorFormGroup = {
  event: FormControl<string | null>;
  attributes: FormArray<EventEditorFormGroupAttribute>;
};

export type EventEditorFormGroupAttribute = FormGroup<{
  property: FormControl<string | null>;
  symbol: FormControl<string | null>;
  value: FormControl<string | null>;
  range: EventEditorFormGroupAttributeRange;
}>;

export type EventEditorFormGroupAttributeRange = FormGroup<{
  from: FormControl<number | null>;
  to: FormControl<number | null>;
}>;
