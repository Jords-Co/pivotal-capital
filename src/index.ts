import { fixGooAboveFoldContentFlash } from "$digerati/fixGooAboveFoldContentFlash";
import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { headingCircleHighlight } from "./pivotalCapital/headingCircleHighlight";

window.Webflow || [];
window.Webflow.push(() => {
  fixGooAboveFoldContentFlash();
  skipToMainContent();
  currentYear();
  headingCircleHighlight();
});