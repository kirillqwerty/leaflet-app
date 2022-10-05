import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { PopUpDataService } from "./services/pop-up-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy{
    
    public isPopUpActive = false;
    private readonly unsubscribe$: Subject<void> = new Subject();

    constructor(private popUpService: PopUpDataService){
    
    }

    public ngOnInit(): void {
        this.popUpService.isPopUpActive$
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
