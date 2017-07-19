import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {IESignature} from '../../../interfaces/IESignature';
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from '@angular/material';
import {IAuthenticationService} from '../../../interfaces/IAuthenticationService';
import {IAuthenticationResult} from '../../../interfaces/IAuthenticationResult';
import {AuthenticationServiceInjectionToken} from '../../../interfaces/AuthenticationServiceInjectionToken';
import {TranslateService} from 'ng2-translate';

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
  private error: string;

  constructor(private dialog: MdDialogRef<ESignModalComponent>, private translateService: TranslateService, @Inject(AuthenticationServiceInjectionToken) private authenticationService: IAuthenticationService, @Optional() @Inject(MD_DIALOG_DATA) data: any) {
    this.header = data.header || this.translateService.instant('esign-modal-title');
    this.dialogClass = data.dialogClass;
    this.dialogUsernameLabel = data.dialogUsernameLabel;
    this.dialogPasswordLabel = data.dialogPasswordLabel;
  }

  sign() {
    if (this.username && this.password) {
      this.authenticationService.authenticate(this.username, this.password).subscribe((result: IAuthenticationResult) => {
        if (result.successful) {
          this.dialog.close(<IESignature>{user: {username: this.username, resourceSer: ''}, signedOn: new Date()});
        } else {
          this.error = result.errorMessage;
        }
      });
    }
  }

  cancel() {
    this.dialog.close();
  }
}
