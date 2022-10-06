import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ObjectService } from "../services/object-data.service";
import { myObject } from "../types/myObject.interface";

@Component({
  selector: "app-object-list",
  templateUrl: "./object-list.component.html",
  styleUrls: ["./object-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectListComponent implements OnInit, OnDestroy {

    public currentObjects: myObject[] = [];

    public searchResult: myObject[] = [];

    public searchWord = "";

    public searchControl = new FormControl("");

    public deletion = "";

    private readonly unsubscribe$: Subject<void> = new Subject();


    constructor(private objectService: ObjectService,
                private cdr: ChangeDetectorRef) { }

    public ngOnInit(): void {
        this.currentObjects = this.objectService.objects;

        this.searchControl.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
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
        this.objectService.changePopUpStatus(true);
        this.searchResult = this.objectService.objects;
        this.cdr.detectChanges();
    }

    public deleteObject(object: myObject): void {
        this.deletion = object.objectName;

        setTimeout(() => {

            this.deletion = "";
            this.objectService.deleteObject(object);
            this.search(this.searchWord);
            this.cdr.detectChanges();
        }, 400);

        // this.objectService.deleteObject(object);

        console.log(this.currentObjects);
        console.log(this.searchResult);
        console.log(this.objectService.objects);
        this.cdr.detectChanges();

    }

    public setCurrentObject(object: myObject): void{
        this.objectService.changeCurrentObject(object);
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
            this.searchResult = this.objectService.objects;
        }
        this.cdr.detectChanges();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
