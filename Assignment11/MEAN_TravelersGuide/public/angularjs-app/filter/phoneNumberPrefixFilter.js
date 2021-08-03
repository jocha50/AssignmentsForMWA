angular.module('travelersGuide').filter('PrefixFilter',prefixFilter);


function prefixFilter(){
    return function(phoneNumber){
        if(!isNaN(phoneNumber)){
            
            return "+"+phoneNumber;
        }
        return '';
    }
}