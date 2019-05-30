import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { HomePage } from '../home/home.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss'],
})
export class FormAddComponent implements OnInit {

  born;
  first;
  last;

  @Input() doc;


  constructor(private firebase: FirebaseService, private popoverController :PopoverController) { }

  ngOnInit() {
    console.log(this.doc)
    if(this.doc){
        this.born = this.doc.born;
        this.first = this.doc.first;
        this.last = this.doc.last;
    }
  }

  addDocumento(){
    this.firebase.create(HomePage.collectionName,{first:this.first,last: this.last,born: this.born});
    this.popoverController.dismiss()
  }


  
  ionPopoverDidDismiss(){
    console.log('ok');
  };

}
