/* eslint-disable @typescript-eslint/unbound-method */
import { ChangeDetectionStrategy, Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FocusTriggerDirective } from './focus-trigger.directive';

describe('FocusTriggerDirective', () => {
  @Component({
    imports: [FocusTriggerDirective],
    template: `
      <button
        type="button"
        appFocus
        [appFocus]="inputRef"
        [id]="buttonId"
        (elementFocus)="onFocus()"
        (elementBlur)="onBlur()"
      >
        Trigger
      </button>
      <input #inputRef type="text" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class HostComponent {
    @ViewChild(FocusTriggerDirective, { static: true })
    directive!: FocusTriggerDirective;

    buttonId = 'buttonId';
    focusCount = 0;
    blurCount = 0;

    onFocus(): void {
      this.focusCount++;
    }

    onBlur(): void {
      this.blurCount++;
    }
  }

  let fixture: ComponentFixture<HostComponent>;
  let hostComp: HostComponent;
  let buttonEl: DebugElement;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FocusTriggerDirective, HostComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    hostComp = fixture.componentInstance;
    fixture.detectChanges();

    buttonEl = fixture.debugElement.query(By.directive(FocusTriggerDirective));
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should expose hostElement as the native button', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(hostComp.directive.hostElement).toBe(buttonEl.nativeElement);
  });

  it('should emit elementFocus on focus event', () => {
    buttonEl.triggerEventHandler('focus', {});
    expect(hostComp.focusCount).toBe(1);
  });

  it('should emit elementBlur on blur event', () => {
    buttonEl.triggerEventHandler('blur', {});
    expect(hostComp.blurCount).toBe(1);
  });

  it('focusTarget should focus the input when not disabled', () => {
    const inputNative = inputEl.nativeElement as HTMLInputElement;
    spyOn(inputNative, 'focus');
    buttonEl.triggerEventHandler('click', {});
    expect(inputNative.focus).toHaveBeenCalled();
  });

  it('focusItem should focus the host button when not disabled', () => {
    const btnNative = buttonEl.nativeElement as HTMLButtonElement;
    spyOn(btnNative, 'focus');
    hostComp.directive.focusItem();
    expect(btnNative.focus).toHaveBeenCalled();
  });

  it('should report disabled when input element is disabled', () => {
    const inputNative = inputEl.nativeElement as HTMLInputElement;
    inputNative.disabled = true;
    fixture.detectChanges();
    expect(hostComp.directive.disabled).toBeTrue();
  });

  it('should not focus input when disabled and clicked', () => {
    const inputNative = inputEl.nativeElement as HTMLInputElement;
    inputNative.disabled = true;
    spyOn(inputNative, 'focus');
    buttonEl.triggerEventHandler('click', {});
    expect(inputNative.focus).not.toHaveBeenCalled();
  });

  it('should not focus host when disabled and focusItem called', () => {
    const inputNative = inputEl.nativeElement as HTMLInputElement;
    inputNative.disabled = true;
    const btnNative = buttonEl.nativeElement as HTMLButtonElement;
    spyOn(btnNative, 'focus');
    hostComp.directive.focusItem();
    expect(btnNative.focus).not.toHaveBeenCalled();
  });

  it('should use custom id when provided', () => {
    const custom = 'buttonId';
    hostComp.buttonId = custom;
    fixture.detectChanges();
    expect(hostComp.directive.id).toBe(custom);
  });
});
