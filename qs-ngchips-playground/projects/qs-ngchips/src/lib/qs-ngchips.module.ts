import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { TagInputComponent, DeleteIconComponent, TagInputForm, TagComponent, TagInputDropdown, TagRipple } from './components';
import { HighlightPipe } from './core';
import { OptionsProvider, Options } from './core/providers/options-provider';
import { DragProvider } from './core/providers/drag-provider';

const optionsProvider = new OptionsProvider();


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2DropdownModule
  ],
  declarations: [
    TagInputComponent,
    DeleteIconComponent,
    TagInputForm,
    TagComponent,
    HighlightPipe,
    TagInputDropdown,
    TagRipple
  ],
  exports: [
    TagInputComponent,
    DeleteIconComponent,
    TagInputForm,
    TagComponent,
    HighlightPipe,
    TagInputDropdown,
    TagRipple
  ],
  providers: [
    DragProvider,
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
  ]
})
export class QsNgchipsModule {
  /**
      * @name withDefaults
      * @param options {Options}
      */
  public static withDefaults(options: Options): void {
    optionsProvider.setOptions(options);
  }
}
