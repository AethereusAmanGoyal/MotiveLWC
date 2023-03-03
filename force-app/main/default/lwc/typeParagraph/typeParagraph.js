import { LightningElement,track } from 'lwc';
import paragraph from '@salesforce/resourceUrl/paragraph';

export default class TypeParagraph extends LightningElement {

   @track Paragraphs=[];
    @track mainArr=[];
   
    @track outputArr=[];
    @track indexArr=[];
    index=0;
    error=0;
    totalError=0;
    @track mainArrLenght=0;
    @track Accuracy=0;
    timeCall=0;

    @track time =60;
    wordPerMin=0;
    @track disable =false;
   
   
   
   

    connectedCallback(){
        let request = new XMLHttpRequest();
        request.open("GET", paragraph, false);
        request.send(null);
        this.Paragraphs= JSON.parse(request.responseText);
        const random = Math.floor(Math.random() * this.Paragraphs.length);
        this.mainArr=this.Paragraphs[random];
        this.mainArrLenght=this.mainArr.length;
        
    }

    handleInputChange(event) { 
        this.timeCall++;
        if(this.timeCall==1){
        const countDown =setInterval(()=>{
            this.time--;
            if(this.time<=0 || this.time < 1){
                clearInterval(countDown)
            }
        },1000)
    }

        let textValue = event.detail.value;
        console.log(event.detail.value);
        

        if(textValue.length>this.outputArr.length){
            if(this.mainArr[this.index]!=textValue[this.index]){
                this.outputArr =textValue;
                this.error++;
                this.totalError++;
                this.indexArr.push(this.index);
            }
            else{
                this.outputArr=textValue;
            }
            this.index++;
        }
        else if(textValue.length<this.outputArr.length){
                let tempArr=[...this.outputArr];
                tempArr.splice(tempArr.length-1,1);
                this.outputArr=tempArr;
                this.index--;
                console.log('index value',JSON.stringify(this.indexArr));
                console.log('Index',this.index);
                
                if(this.indexArr.includes(this.index)){
                    const i=this.indexArr.indexOf(this.index)
                    console.log('Before splice',JSON.stringify(this.indexArr));
                    if(i>-1){
                        this.indexArr.splice(i,1);
                        this.error--;
                        console.log('After splice',JSON.stringify(this.indexArr));
                    }
                }
            }
		
		}

        handleClick(event){
            this.disable=true;
            this.time=1;
            
            
                
            if(this.index>this.totalError){
                this.Accuracy=Math.round(((this.index-this.totalError)*100)/this.index);
            }
            if(this.time==0){
            this.wordPerMin =Math.round((this.index))
            }
            else{
                this.wordPerMin =Math.round((this.index/(60-this.time))*10);
            }   
        }
   }
