import { InjectionToken } from "@angular/core"
import { errorInfo } from "./errorInfo.record"

export const FORMS_VALIDATION_ERRORS = new InjectionToken<errorInfo>("errors")