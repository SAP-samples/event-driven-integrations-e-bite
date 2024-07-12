namespace ebite;

using ebite as my from '../db/schema';

@path: '/roaster'
service ProducerService {
    
    entity CoffeeBatch as projection on my.CoffeeBatch actions {
        
    };

    function CoffeeBatchRoastedEvent() returns CoffeeBatch;
    function TryMeEvent() returns String;

    // function produceEvent() returns CoffeeBatch;

    // event CoffeeBatchRoasted : {
    //     key ID : UUID;
    //     key Timestamp : DateTime;
    //     key Data : String;
    // }
};
