import { Component } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { FORMS_VALIDATION_ERRORS } from "../injectionTokenSettings/errors.token";
import { objectNameMatch } from "../object-list/validators/object-name.validator";
import { ObjectService } from "../services/object-data.service";
import { MapObject } from "../types/MapObject.interface";


@Component({
    selector: "app-pop-up-add-object",
    templateUrl: "./pop-up-add-object.component.html",
    styleUrls: ["./pop-up-add-object.component.scss"],
    providers: [{
        provide: FORMS_VALIDATION_ERRORS,
        useValue: { 
            "objectNameMatch": (): string => "Object name already in use",

            "required": (): string => "Field is required",

            "maxlength": (err: ValidationErrors): string => `Maximum length ${err?.["maxlength"].requiredLength}`,

            "min": (err: ValidationErrors): string => `Minimum value ${err?.["min"].min}`,

            "max": (err: ValidationErrors): string => `Maximum value ${err?.["max"].max}`,
        }
    }], 

})
export class PopUpAddObjectComponent{

    public objectForm = new FormGroup({
        objectName: new FormControl(<string> "", [Validators.required, Validators.maxLength(60), objectNameMatch(this.objectService.objects)]),
        coordinateX: new FormControl(<number|null> null, [Validators.required, Validators.min(-180), Validators.max(180)]),
        coordinateY: new FormControl(<number|null> null, [Validators.required, Validators.min(-180), Validators.max(180)])
    })

    constructor(private objectService: ObjectService) { }

    public goBack(): void {
        this.objectService.changePopUpStatus(false);
    }

    public addObject(): void {
        if (this.objectForm.valid) {
            const newObject: MapObject = {
                objectName: this.objectForm.get("objectName")?.value as string,
                coordinateX: this.objectForm.get("coordinateX")?.value as number,
                coordinateY: this.objectForm.get("coordinateY")?.value as number,
            }
            this.objectService.addObject(newObject);
            this.objectService.changePopUpStatus(false);
        }
        else{
            this.objectForm.markAllAsTouched();
        }
    }

}
