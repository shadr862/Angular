export interface Room{
    totalrooms:number;
    availablerooms:number;
    bookedrooms:number;
}

export interface RoomDetails{
    roomnumber:number;
    roomtype:string;
    amenities:string;
    price:number;
    checkinTime:string;
    checkoutTime:string;
    rating : number;
}