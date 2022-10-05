import { Component, AfterViewInit} from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]

})

export class MapComponent implements AfterViewInit {

  private map?: any;

  public ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {



    this.map = L.map("map", {

      center: [ 39.8282, -98.5795 ],

      zoom: 3

    });

    L.marker([28.5, 51]).addTo(this.map);

    const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

      maxZoom: 18,

      minZoom: 1,

      attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"

    });

    tiles.addTo(this.map);
  }

  constructor() { }

  
}