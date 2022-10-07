import { AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import { MapObject } from "src/app/types/MapObject.interface";

export function objectNameMatch(objects: MapObject[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
       for (const object of objects) {
            if (object.objectName === control.value) {
                return {"objectNameMatch": true}
            }
       }
       return null;
    };
 }