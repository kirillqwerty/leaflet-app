import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from "@angular/core";
import * as L from "leaflet";
import { Subject, takeUntil } from "rxjs";
import { ObjectService } from "../services/object-data.service";
import { myObject } from "../types/myObject.interface";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapComponent implements AfterViewInit, OnDestroy {

    public currentObject?: myObject;

    private map?: L.Map;

    private myMarkers: L.Marker<myObject>[] = []

    private readonly unsubscribe$: Subject<void> = new Subject();

    constructor(private dataService: ObjectService,
                private cdr: ChangeDetectorRef) { }

    public ngAfterViewInit(): void {
        this.initMap(); 
        this.dataService.newObject$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((object) => this.addMark(object))

        this.dataService.deleteObject$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                console.log(data);
                this.removeMark(data.coordinateY, data.coordinateX);
            })
        
        this.dataService.currentObject$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((object) =>{
                console.log(object);
                this.center(object.coordinateY, object.coordinateX);
            })

        this.cdr.detectChanges();
    }
    
    public addMark(object: myObject): void{
        this.myMarkers.push(L.marker([object.coordinateX, object.coordinateY]).addTo(this.map as L.Map));
        for (const marker of this.myMarkers) {
            console.log(marker);
            console.log(marker.getLatLng());
        }
        this.cdr.detectChanges();
    }

    public removeMark(coordinateY: number, coordinateX: number): void{ 
        for (const marker of this.myMarkers) {
            if (marker.getLatLng().lat === coordinateX && marker.getLatLng().lng === coordinateY) {
                this.map?.removeLayer(marker)
            }
        }
        this.cdr.detectChanges();
    }

    // public removeMarks(): void{
    //     this.map.clearLayers();
    //     this.map.eachLayer((layer) => {
    //         layer.remove();
    //       });
    //     this.cdr.detectChanges();
    //   }

    public center(y: number, x: number): void{
        
        for (const marker of this.myMarkers) {
            if (marker.getLatLng().lat === x && marker.getLatLng().lng === y) {
                this.map?.setView(marker.getLatLng() as L.LatLngExpression, 5);
            }
        }
        console.log(y,x);
        console.log(this.map)
        this.cdr.detectChanges();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private initMap(): void {
        this.map = L.map("map", {
            center: [53.8282, 28.5795],
            zoom: 7
        });

        const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            minZoom: 3,
            attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
        });

        tiles.addTo(this.map);
        this.cdr.detectChanges();
    }
}