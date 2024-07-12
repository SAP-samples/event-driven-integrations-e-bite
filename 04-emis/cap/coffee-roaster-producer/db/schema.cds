namespace ebite;

using { cuid } from '@sap/cds/common';

// Unit of Measure
type UOM : String enum {
    g; // grams
    kg; // kilograms
}

type Species : String enum {
    Arabica;
    Robusta;
}

type ProcessingMethod : String enum {
    Anaerobic;
    Honey;
    Natural;
    Washed;
}

type Variety : String enum {
    Bourbon;
    Catuai;
    Caturra;
    Geisha;
    SL28;
    SL34;
}

type ProducingCountry : String enum {
    Brazil;
    Cameroon;
    China;
    Colombia;
    CostaRica;
    ElSalvador;
    Ethiopia;
    Guatemala;
    Honduras;
    India;
    Indonesia;
    IvoryCoast;
    Kenya;
    Laos;
    Malaysia;
    Mexico;
    Nicaragua;
    PapuaNewGuinea;
    Peru;
    Philippines;
    Tanzania;
    Thailand;
    Uganda;
    Venezuela;
    Vietnam;
}

entity CoffeeBatch: cuid {
	key ID : UUID;
	Country : ProducingCountry;
	ProcessingMethod : ProcessingMethod;
	Species : Species;
	Variety : Variety;
	Quantity : Integer;
	UOM : UOM;
}
