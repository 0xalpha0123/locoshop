import { StoreType } from "../types/store";

const storageItemName = "visited-stores";

export const VisitedStores = {

    add: function(store:StoreType){ 
        let storesArr = this.get();  
        const maxLength = 15;

        //remove the store if it exists
        storesArr = storesArr.filter((s:StoreType, index:number) => s.place_id != store.place_id && index < maxLength)
        
        //add the store at the first position
        storesArr.unshift(store);  

        //keep it into localStorage
        localStorage.setItem(storageItemName, JSON.stringify(storesArr));

        return storesArr;      
    },

    get: function() :StoreType[] { 
        let storesArr = localStorage.getItem(storageItemName);
        return storesArr ? JSON.parse(storesArr) : [];
    }
};