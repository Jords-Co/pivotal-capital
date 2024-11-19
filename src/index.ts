import { skipToMainContent } from "$digerati/skipToMainContent";
import { formValidation } from "./digerati/formValidation";
import { currentYear } from "$digerati/currentYear";

window.Webflow || [];
window.Webflow.push(() => {
  skipToMainContent();
  formValidation();
  currentYear();
});