import { AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import { myObject } from "src/app/types/myObject.interface";

export function objectNameMatch(objects: myObject[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
       for (const object of objects) {
            if (object.objectName === control.value) {
                return {"objectNameMatch": true}
            }
       }
       return null;
    };
 }