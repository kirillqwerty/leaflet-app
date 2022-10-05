import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { myObject } from "../types/myObject.interface";

@Injectable({
  providedIn: "root"
})
export class PopUpDataService {

    public isPopUpActive$ = new Subject<boolean>();

    public newObject$ = new Subject<myObject>();

    public deleteObject$ = new Subject<myObject>(); 

    private myObjects: myObject[] = [];

    public get objects(): myObject[] {
        return this.myObjects;
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
