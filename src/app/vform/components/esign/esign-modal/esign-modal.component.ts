import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {IESignature} from '../../../interfaces/IESignature';
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-esign-modal',
  templateUrl: './esign-modal.component.html'
})
export class ESignModalComponent {

  header: string;
  dialogClass: string;
  username: string;
  password: string;
  private dialogUsernameLabel: string;
  private dialogPasswordLabel: string;

  constructor(private dialog: MdDialogRef<ESignModalComponent>, @Optional() @Inject(MD_DIALOG_DATA) data: any) {
    this.header = data.header || 'E-Sign';
    this.dialogClass = data.dialogClass;
    this.dialogUsernameLabel = data.dialogUsernameLabel;
    this.dialogPasswordLabel = data.dialogPasswordLabel;
  }

  sign() {
    if (this.username && this.password) {
      this.dialog.close(<IESignature>{user: {username: this.username, resourceSer: ''}, signedOn: new Date()});
    }
  }

  cancel() {
    this.dialog.close();
  }

}
