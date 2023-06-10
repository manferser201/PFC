import { Component, Input  } from '@angular/core';
import { dishesList } from 'src/app/modules/home/dishesList.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  dishes: dishesList[] = [];
}
