import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';
import { Dictionary } from '../../models/dictionary';
import { Observable, Subscription } from 'rxjs';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { DictionaryFile } from '../../models/dictionary-file';

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
  public displayedColumns: string[] = ['DictionaryKey', 'DictionaryValue', 'Actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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

  // submited(dictionary: Dictionary) {
  //   if (!dictionary.DictionaryID) {
  //     this.subscriptions.push(this.dictionarySvc.add(dictionary).subscribe((response) => {
  //       this.dictionary = null;
  //       this.refresh();
  //       this.closeForm();
  //     }, (error) => this.errors = error));
  //   } else {
  //     this.subscriptions.push(this.dictionarySvc.update(dictionary).subscribe((response) => {
  //       this.dictionary = null;
  //       this.refresh();
  //       this.closeForm();
  //     }, (error) => this.errors = error));
  //   }
  // }

  submited(dictionary: DictionaryFile) {
    if (dictionary.DictionaryFile) {
      this.subscriptions.push(this.dictionarySvc.addExcel(dictionary).subscribe((response) => {
        this.dictionary = null;
        this.refresh();
        this.closeForm();
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
    document.getElementById('edit-btn').click();
  }

  openForm(): void {
    this.dictionary = {};
    document.getElementById('edit-btn').click();
  }

  closeForm(): void {
    this.dictionary = null;
    document.getElementById('modal-close').click();
  }

}
