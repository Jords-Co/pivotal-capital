import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { headingCircleHighlight } from "./pivotalCapital/headingCircleHighlight";
import { fixSafariClipPathBug } from "./pivotalCapital/fixSafariClipPathBug";

window.Webflow || [];
window.Webflow.push(() => {
  skipToMainContent();
  currentYear();
  headingCircleHighlight();
  fixSafariClipPathBug();
});