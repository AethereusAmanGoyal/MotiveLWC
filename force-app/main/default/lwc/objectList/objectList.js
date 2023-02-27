import { LightningElement, api, wire,track } from 'lwc';
import showRecord from '@salesforce/apex/ShowObjectName.showRecord';

export default class ObjectList extends LightningElement {
@api obj;
@track objectList = [];
@track columns = [{label: 'Name',fieldName: 'Name', type: 'text',sortable: true},
                  {label: 'Phone',fieldName: 'Phone',type: 'phone',sortable: true}];

@wire(showRecord,{obj:'$obj'})
    wireProperty({error , data}){
        if(data){
            this.objectList = data; 
        } 
        else if(error){
            console.log(error); 
        }    
    }
}