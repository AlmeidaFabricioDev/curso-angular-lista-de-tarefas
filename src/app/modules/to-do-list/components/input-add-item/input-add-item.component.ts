import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, Input, ViewChild, inject } from '@angular/core';

//interfaces
import { IListItems } from '../../interface/IListItems.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public inputText!: ElementRef;
  
  @Input({required: true}) public inputListItems: IListItems[] = [];
  @Output() public outputAddListItems = new EventEmitter<IListItems>();
  public focusAndAddItem(value: string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date();
      const timeStamp = currentDate.getTime();
      const id =`ID ${timeStamp}`; 
      this.outputAddListItems.emit({
        id,
        checked: false,
        value
      });

      return this.inputText.nativeElement.focus();
    }
  }
}
