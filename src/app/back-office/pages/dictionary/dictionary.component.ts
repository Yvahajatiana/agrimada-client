import { Component, OnInit, OnDestroy } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';
import { Dictionary } from '../../models/dictionary';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit, OnDestroy {

  public dictionaries: Observable<Dictionary[]>;
  public subscriptions: Subscription[] = [];
  public dictionary: Dictionary;
  public errors: any[];

  constructor(private dictionarySvc: DictionaryService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.dictionaries = this.dictionarySvc.getAll({});
  }

  ngOnDestroy() {
    this.subscriptions.map((item) => item.unsubscribe());
  }

  initForm() {
    this.dictionary = {};
  }

  submited(dictionary: Dictionary) {
    if (!dictionary.DictionaryID) {
      this.subscriptions.push(this.dictionarySvc.add(dictionary).subscribe((response) => {
        this.dictionary = null;
        this.refresh();
      }, (error) => this.errors = error));
    } else {
      this.subscriptions.push(this.dictionarySvc.update(dictionary).subscribe((response) => {
        this.dictionary = null;
        this.refresh();
      }, (error) => this.errors = error));
    }
  }

  deleteDictionary(dictionary: Dictionary) {
    if (confirm(`Would your realy want to delete ${dictionary.DictionaryValue}?`)) {
      this.subscriptions.push(this.dictionarySvc.delete(dictionary.DictionaryID).subscribe((response) => {
        this.refresh();
      }));
    }
  }

  editDictionary(dictionary: Dictionary) {
    this.dictionary = dictionary;
  }

}
