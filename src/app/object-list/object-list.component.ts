import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PopUpDataService } from "../services/pop-up-data.service";
import { myObject } from "../types/myObject.interface";

@Component({
  selector: "app-object-list",
  templateUrl: "./object-list.component.html",
  styleUrls: ["./object-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectListComponent implements OnInit {

    public currentObjects: myObject[] = [];

    public searchResult: myObject[] = [];

    public searchWord = "";

    public searchControl = new FormControl("");
    // public searchResult: myObject[] = [
    //     {
    //         objectName: "123123",
    //         coordinateX: 213,
    //         coordinateY: 4321
    //     },
    //     {
    //         objectName: "adsfsdf",
    //         coordinateX: 456,
    //         coordinateY: 175
    //     },
    //     {
    //         objectName: "fasd",
    //         coordinateX: 4856,
    //         coordinateY: 1634
    //     }]

    constructor(private popUpService: PopUpDataService,
                private cdr: ChangeDetectorRef) { }

    public ngOnInit(): void {
        this.currentObjects = this.popUpService.objects;

        this.searchControl.valueChanges
            .subscribe(
                (data) => {
                    this.searchWord = data as string;
                    this.search(this.searchWord);
                    console.log(this.currentObjects);
                }
            )
        this.cdr.detectChanges();    
    }

    public addObject(): void{
        this.searchControl.setValue("");
        this.popUpService.changePopUpStatus(true);
        this.searchResult = this.popUpService.objects;
        this.cdr.detectChanges();
    }

    public deleteObject(object: myObject): void {
        this.popUpService.deleteObject(object);
        this.search(this.searchWord);
        this.cdr.detectChanges();
    }

    public search(searchWord: string): void{
        this.searchResult = [];
        if(searchWord !== "") {
            for (const object of this.currentObjects) {
                if (object.objectName.includes(searchWord.toLowerCase())) {
                    this.searchResult.push(object)
                }
            }
        } 
        
        if (this.searchResult.length === 0 && searchWord === "") {
            this.searchResult = this.popUpService.objects;
        }
        this.cdr.detectChanges();
    }

}
