import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { myObject } from "../types/myObject.interface";

@Injectable({
  providedIn: "root"
})
export class ObjectService {

    public isPopUpActive$ = new Subject<boolean>();

    public newObject$ = new Subject<myObject>();

    public deleteObject$ = new Subject<myObject>(); 

    public currentObject$ = new Subject<myObject>();
    // private myObjects: myObject[] = [
    //     {
    //         objectName: "1",
    //         coordinateX: 213,
    //         coordinateY: 4321
    //     },
    //     {
    //         objectName: "2",
    //         coordinateX: 456,
    //         coordinateY: 175
    //     },
    //     {
    //         objectName: "3",
    //         coordinateX: 4856,
    //         coordinateY: 1634
    //     },
    //     {
    //         objectName: "4",
    //         coordinateX: 213,
    //         coordinateY: 4321
    //     },
    //     {
    //         objectName: "5",
    //         coordinateX: 456,
    //         coordinateY: 175
    //     },
    //     {
    //         objectName: "6",
    //         coordinateX: 4856,
    //         coordinateY: 1634
    //     },{
    //         objectName: "7",
    //         coordinateX: 213,
    //         coordinateY: 4321
    //     },
    //     {
    //         objectName: "8",
    //         coordinateX: 456,
    //         coordinateY: 175
    //     },
    //     {
    //         objectName: "9",
    //         coordinateX: 4856,
    //         coordinateY: 1634
    //     },{
    //         objectName: "11",
    //         coordinateX: 213,
    //         coordinateY: 4321
    //     },
    //     {
    //         objectName: "22",
    //         coordinateX: 456,
    //         coordinateY: 175
    //     },
    //     {
    //         objectName: "33",
    //         coordinateX: 4856,
    //         coordinateY: 1634
    //     }]

    private myObjects: myObject[] = [];
    
    public get objects(): myObject[] {
        return this.myObjects;
    }

    public changeCurrentObject(object: myObject): void{
        this.currentObject$.next(object);
    }

    public changePopUpStatus(status: boolean): void {
        this.isPopUpActive$.next(status);
    }

    public addObject(object: myObject): void{
        this.myObjects.push(object);
        this.newObject$.next(object);
    }

    public deleteObject(object: myObject): void{
        console.log(this.myObjects.splice(this.myObjects.indexOf(object), 1));
        this.deleteObject$.next(object);
    }
}
