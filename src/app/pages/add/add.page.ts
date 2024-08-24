import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { ReasonsService } from 'src/app/services/reason.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  constructor(public reasonsService: ReasonsService, public historyService: HistoryService) { }

}
