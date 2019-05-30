import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormAddComponent } from '../form-add/form-add.component';
import { FirebaseService } from '../firebase.service';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  static collectionName ="documentos";
  
  docs = [];

  constructor(private popoverController: PopoverController, private firebase: FirebaseService) {

  }


  ngOnInit(){
  this.list();

  }

  
  atualizarDoc(doc){
    this.firebase.update(HomePage.collectionName, doc);
  }

 
  removeDocumento(doc){
    this.firebase.remove(HomePage.collectionName, doc.id);
    this.list();

  }

  list(){
    this.docs = []
    this.firebase.list(HomePage.collectionName).then((snapshot) => {      
      snapshot.forEach((doc) => {
        this.docs.push(doc)
      });
    })
  }

  
  async presentPopover(doc) {
    let me = this;
    const popover = await this.popoverController.create({
      component: FormAddComponent,
      event: null,
      translucent: true,
      componentProps: {doc:doc}
      
    });
    popover.onDidDismiss().then(()=>{
      // console.log('duismiss')
      me.list();
    })
    return await popover.present();
  }

}
