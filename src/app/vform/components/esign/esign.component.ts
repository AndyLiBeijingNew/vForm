import {Component, ComponentRef, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IVFormComponent} from '../../services/IVFormComponent';
import {VFormMetadata} from '../../services/VFormMetadata';
import {IESignature} from '../../interfaces/IESignature';
import {MdDialog} from '@angular/material';
import {HelperService} from '../../editors/property-editor/helper.service';
import {ESignModalComponent} from './esign-modal/esign-modal.component';
import {FormComponent} from '../form/form.component';

@Component({
  selector: 'vform-esign',
  templateUrl: './esign.component.html'
})
export class ESignComponent extends FormControl implements IVFormComponent, OnInit {

  children: IVFormComponent[];
  componentRef: ComponentRef<any>;
  form: FormComponent;
  metadata: VFormMetadata;
  oldName: string;

  constructor(private stateService: HelperService, private dialog: MdDialog) {
    super();
    stateService.propertyChanged.subscribe(tuple => {
      if (tuple[0] === this && tuple[1] === 'name') {
        this.nameChanged(tuple[2]);
      }
    });
  }

  ngOnInit(): void {
    this.form.addControl(this.metadata.properties.name, this);
    this.oldName = this.metadata.properties.name;
  }

  showESignatureDialog() {
    this.dialog.open(ESignModalComponent, {data: {
      heading: this.metadata.properties.heading,
      dialogClass: this.metadata.properties.dialogClass,
      dialogUsernameLabel: this.metadata.properties.dialogUsernameLabel,
      dialogPasswordLabel: this.metadata.properties.dialogPasswordLabel
    }})
      .afterClosed().subscribe(data => {
        if (data) {
          this.setValue(data);
        }
    });
  }

  isSigned() {
    const signature: IESignature = this.value;
    return signature && signature.user;
  }

  nameChanged(newName: any) {
    if (this.oldName) {
      this.form.removeControl(this.oldName);
    }
    this.form.addControl(newName, this);
  }


}
