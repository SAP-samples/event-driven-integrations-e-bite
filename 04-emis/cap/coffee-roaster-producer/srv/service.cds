namespace ebite;

using ebite as my from '../db/schema';

service ProducerService {
    
    entity CoffeeBatch as projection on my.CoffeeBatch actions {
        
    };

    function produceEvent() returns CoffeeBatch;

    // function produceEvent() returns CoffeeBatch;

    // event CoffeeBatchRoasted : {
    //     key ID : UUID;
    //     key Timestamp : DateTime;
    //     key Data : String;
    // }
};
