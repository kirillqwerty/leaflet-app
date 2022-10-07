import { trigger, state, style, transition, animate } from "@angular/animations";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ObjectService } from "../services/object-data.service";
import { MapObject } from "../types/MapObject.interface";

@Component({
  selector: "app-object-list",
  templateUrl: "./object-list.component.html",
  animations: [trigger("deletion", [
    state("open", style({
      opacity: 1,
    })),
    state("closed", style({
      opacity: 0.7,
      width: 0
    })),
    transition("open => closed", [
      animate("0.4s")
    ]),]),
  ],
  styleUrls: ["./object-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectListComponent implements OnInit, OnDestroy {

    public currentObjects: MapObject[] = [];

    public searchResult: MapObject[] = [];

    public searchWord = "";

    public searchControl = new FormControl("");

    private readonly unsubscribe$: Subject<void> = new Subject();


    constructor(private objectService: ObjectService,
                private cdr: ChangeDetectorRef) { }

    public ngOnInit(): void {
        this.currentObjects = this.objectService.objects;
        // this.searchResult = [
        // {
        //     objectName: "1",
        //     coordinateX: 213,
        //     coordinateY: 4321
        // },
        // {
        //     objectName: "2",
        //     coordinateX: 456,
        //     coordinateY: 175
        // },
        // {
        //     objectName: "3",
        //     coordinateX: 4856,
        //     coordinateY: 1634
        // },
        // {
        //     objectName: "4",
        //     coordinateX: 213,
        //     coordinateY: 4321
        // },
        // {
        //     objectName: "5",
        //     coordinateX: 456,
        //     coordinateY: 175
        // },
        // {
        //     objectName: "6",
        //     coordinateX: 4856,
        //     coordinateY: 1634
        // },{
        //     objectName: "7",
        //     coordinateX: 213,
        //     coordinateY: 4321
        // },
        // {
        //     objectName: "8",
        //     coordinateX: 456,
        //     coordinateY: 175
        // },
        // {
        //     objectName: "9",
        //     coordinateX: 4856,
        //     coordinateY: 1634
        // },{
        //     objectName: "11",
        //     coordinateX: 213,
        //     coordinateY: 4321
        // },
        // {
        //     objectName: "22",
        //     coordinateX: 456,
        //     coordinateY: 175
        // },
        // {
        //     objectName: "33",
        //     coordinateX: 4856,
        //     coordinateY: 1634
        // }]


        this.searchControl.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe( 
                (data) => {
                    this.searchWord = data as string;
                    this.search(this.searchWord);
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

    public deleteObject(object: MapObject): void {
        this.objectService.deleteObject(object);
        this.search(this.searchWord);
        this.cdr.detectChanges();
    }

    public setCurrentObject(object: MapObject): void{
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
