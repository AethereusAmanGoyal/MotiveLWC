import { LightningElement, api, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ObjectForm extends LightningElement {
@api obj;
@api recordTypeId ;


 objFields = [NAME_FIELD, PHONE_FIELD];

 @wire(getObjectInfo, { objectApiName: '$obj' })
handleObjectInfo({error, data}) {
    if (data) {
        this.recordTypeId = data.defaultRecordTypeId;
      }
    else if(error){
       console.log(error);
   }
   }

   handleRecordCreated(){
    const evt = new ShowToastEvent({
      title: 'Record Created',
      message:'Record from the form is been created',
      variant: 'success',
  });
  this.dispatchEvent(evt);
}
   


}