import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MapObject } from "../types/MapObject.interface";

@Injectable({
  providedIn: "root"
})
export class ObjectService {

    public isPopUpActive$ = new Subject<boolean>();

    public newObject$ = new Subject<MapObject>();

    public deleteObject$ = new Subject<MapObject>(); 

    public currentObject$ = new Subject<MapObject>();
    // private MapObjects: MapObject[] = [
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

    private MapObjects: MapObject[] = [];
    
    public get objects(): MapObject[] {
        return this.MapObjects;
    }

    public changeCurrentObject(object: MapObject): void{
        this.currentObject$.next(object);
    }

    public changePopUpStatus(status: boolean): void {
        this.isPopUpActive$.next(status);
    }

    public addObject(object: MapObject): void{
        this.MapObjects.push(object);
        this.newObject$.next(object);
    }

    public deleteObject(object: MapObject): void{
        console.log(this.MapObjects.splice(this.MapObjects.indexOf(object), 1));
        this.deleteObject$.next(object);
    }
}
