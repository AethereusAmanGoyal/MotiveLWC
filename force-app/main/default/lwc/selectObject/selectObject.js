import { LightningElement,wire,track } from 'lwc';
import showObject from '@salesforce/apex/ShowObjectName.showObject';
export default class SelectObject extends LightningElement {

@track options;
@track objName='';
@track handleobjectapi=false;

 @wire(showObject)
 wireproperty({error, data}){
   if(data){
       console.log('data----->',JSON.stringify(data));
   this.options = data.map(item=>{
    return{
      label: item,
      value: item
    }
  })
   }
   else if(error){
       console.log(error);
   }
 }
 handleChange(event){
     this.handleobjectapi = true;
     this.objName = event.detail.value;
     console.log('objectName'+this.objName);
 }
}