import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ObjectListComponent } from "./object-list/object-list.component";
import { MapComponent } from "./map/map.component";
import { PopUpAddObjectComponent } from "./pop-up-add-object/pop-up-add-object.component";
import { ErrWrapperComponent } from "./err-wrapper/err-wrapper.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ObjectListComponent,
    MapComponent,
    PopUpAddObjectComponent,
    ErrWrapperComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
