public with sharing class ShowObjectName {
    @AuraEnabled(Cacheable=true)
    public static List<String> showObject(){
        
        List<Schema.SObjectType> sObjectList = Schema.getGlobalDescribe().Values();
            
        Map<String,String> objMap = new Map<String,String>();
        
        for(Schema.SObjectType sb:sObjectList){
            if(sb.getDescribe().getLabel() =='Account'){
                objMap.put(sb.getDescribe().getLabel(),sb.getDescribe().getName());
            }
            if(sb.getDescribe().getLabel() =='Contact'){
                objMap.put(sb.getDescribe().getLabel(),sb.getDescribe().getName());
            }
            if(sb.getDescribe().getLabel() =='Task'){
                objMap.put(sb.getDescribe().getLabel(),sb.getDescribe().getName());
            }
            if(sb.getDescribe().getLabel() =='Lead'){
                objMap.put(sb.getDescribe().getLabel(),sb.getDescribe().getName());
            }
            
            
        }
        system.debug('Value in String'+objMap.values());
        return objMap.values() ;
    }
    @AuraEnabled(Cacheable=true)
    public static List<SObject> showRecord(String obj){
        String query ='Select Id,Name From '+obj;
         
        return Database.query(query) ;
    }
}