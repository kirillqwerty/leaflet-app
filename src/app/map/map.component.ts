import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from "@angular/core";
import * as L from "leaflet";
import { Subject, takeUntil } from "rxjs";
import { ObjectService } from "../services/object-data.service";
import { MapObject } from "../types/MapObject.interface";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapComponent implements AfterViewInit, OnDestroy {

    private map?: L.Map;

    private myMarkers: L.Marker<MapObject>[] = []

    private readonly unsubscribe$: Subject<void> = new Subject();

    private readonly icon = L.icon({
        iconSize: [20, 30],
        iconUrl: "../../assets/marker.png",
      });

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
                this.removeMark(data.coordinateY, data.coordinateX);
            })
        
        this.dataService.currentObject$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((object) =>{
                this.center(object.coordinateY, object.coordinateX);
            })

        this.cdr.detectChanges();
    }
    
    public addMark(object: MapObject): void{
        this.myMarkers.push(L.marker([object.coordinateX, object.coordinateY], { icon: this.icon }).addTo(this.map as L.Map));
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

    public center(y: number, x: number): void{
        
        for (const marker of this.myMarkers) {
            if (marker.getLatLng().lat === x && marker.getLatLng().lng === y) {
                this.map?.setView(marker.getLatLng() as L.LatLngExpression, 7);
            }
        }
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