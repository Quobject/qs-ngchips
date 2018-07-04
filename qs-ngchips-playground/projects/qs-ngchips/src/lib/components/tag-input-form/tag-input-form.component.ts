import { Component, EventEmitter, Input, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'tag-input-form',
  styleUrls: ['./tag-input-form.style.scss'],
  templateUrl: './tag-input-form.template.html'
})
export class TagInputForm implements OnChanges {
  @Output() public onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() public onBlur: EventEmitter<any> = new EventEmitter();
  @Output() public onFocus: EventEmitter<any> = new EventEmitter();
  @Output() public onKeyup: EventEmitter<any> = new EventEmitter();
  @Output() public onKeydown: EventEmitter<any> = new EventEmitter();
  @Output() public inputTextChange: EventEmitter<string> = new EventEmitter();

  @Input() public placeholder: string;
  @Input() public validators: ValidatorFn[] = [];
  @Input() public asyncValidators: AsyncValidatorFn[] = [];
  @Input() public inputId: string;
  @Input() public inputClass: string;
  @Input() public tabindex = '';
  @Input() public disabled = false;

  @ViewChild('input') public input;
  public form: FormGroup;

  public inputTextValue = '';

  @Input() public get inputText(): string {
    //console.log('tag-input-form.component get inputText() this.inputTextValue', this.inputTextValue);
    return this.inputTextValue;
  }

  public set inputText(text: string) {
    //console.log('tag-input-form.component set inputText text =', text);
    this.inputTextValue = text;
    this.inputTextChange.emit(text);
  }



  public ngOnInit() {
    // creating form
    this.form = new FormGroup({
      item: new FormControl({ value: '', disabled: this.disabled }, this.validators, this.asyncValidators)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled && !changes.disabled.firstChange) {
      if (changes.disabled.currentValue) {
        this.form.controls['item'].disable();
      } else {
        this.form.controls['item'].enable();
      }
    }
  }

	/**
     * @name value
     */
  public get value(): FormControl {
    return this.form.get('item') as FormControl;
  }

	/**
     * @name isInputFocused
     */
  public isInputFocused(): boolean {
    return document.activeElement === this.input.nativeElement;
  }

	/**
     * @name getErrorMessages
     * @param messages
     */
  public getErrorMessages(messages: { [key: string]: string }): string[] {
    return Object.keys(messages)
      .filter(err => this.value.hasError(err))
      .map(err => messages[err]);
  }

  /**
   * @name hasErrors
   */
  public hasErrors(): boolean {
    const { dirty, value, valid } = this.form;
    return dirty && value.item && !valid;
  }

	/**
     * @name focus
     */
  public focus(): void {
    this.input.nativeElement.focus();
  }

  /**
   * @name blur
   */
  public blur(): void {
    this.input.nativeElement.blur();
  }

	/**
     * @name getElementPosition
     */
  public getElementPosition(): ClientRect {
    return this.input.nativeElement.getBoundingClientRect();
  }

  /**
   * - removes input from the component
   * @name destroy
   */
  public destroy(): void {
    const input = this.input.nativeElement;
    input.parentElement.removeChild(input);
  }

  /**
   * @name onKeyDown
   * @param $event
   */
  public onKeyDown($event: KeyboardEvent) {
    
    //console.log('tag-input-form.component onKeyDown', $event, this.value.value);
    this.inputText = this.value.value;
    if ($event.key === "Enter") {
      this.submit($event);
    }
    return this.onKeydown.emit($event);
  }


  /**
   * @name onKeyUp
   * @param $event
   */
  public onKeyUp($event) {
    this.inputText = this.value.value;
    //console.log('tag-input-form.component onKeyUp', $event, this.value.value);
    return this.onKeyup.emit($event);
  }


  /**
   * @name submit
   */
  public submit($event: any): void {
    $event.preventDefault();
    //console.log('tag-input-form.component submit', $event, this.value.value);
    if (this.form.valid) {
      this.onSubmit.emit($event);
    }
  }
}
