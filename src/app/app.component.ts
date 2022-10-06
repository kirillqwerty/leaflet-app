import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ObjectService } from "./services/object-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy{
    
    public isPopUpActive = false;
    private readonly unsubscribe$: Subject<void> = new Subject();

    constructor(private objectService: ObjectService){}

    public ngOnInit(): void {
        this.objectService.isPopUpActive$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (data) => {
                    this.isPopUpActive = data;
                }
            )
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
