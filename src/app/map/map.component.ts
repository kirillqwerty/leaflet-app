import { Component, AfterViewInit} from "@angular/core";
import * as L from "leaflet";
import { PopUpDataService } from "../services/pop-up-data.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})

export class MapComponent implements AfterViewInit {

    private map?: any;


    constructor(private dataService: PopUpDataService) { }

    public ngAfterViewInit(): void {
        this.initMap();
        this.dataService.newObject$
            .subscribe(() => this.addMarks())

        this.dataService.deleteObject$
            .subscribe((data) => this.removeMark(data.coordinateY, data.coordinateX))
    }

    
    public addMarks(): void{
        for (const object of this.dataService.objects) {
            L.marker([object.coordinateY, object.coordinateX]).addTo(this.map);
        }
    }

    public removeMark(coordinateY: number, coordinateX: number): void{
        L.marker([coordinateY, coordinateX]).removeFrom(this.map);
    }

    private initMap(): void {
        this.map = L.map("map", {
            center: [ 39.8282, -98.5795 ],
            zoom: 3
        });

        const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

            maxZoom: 18,
            minZoom: 3,
            attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"

        });

        tiles.addTo(this.map);
    }
}