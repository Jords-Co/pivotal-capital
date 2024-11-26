/**
 * Fix Safari Clip Path Bug.
 * 
 * @author <cabal@digerati.design>
 */
export const fixSafariClipPathBug = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = userAgent.indexOf('safari/') > -1 && userAgent.indexOf('chrome/') === 0;
    const clipPathElements = document.querySelectorAll('[dd-clip-path="true"]');
    if (!isSafari || !clipPathElements) {
        return;
    }
    clipPathElements.forEach((clipPathElement) => {
        clipPathElement.style.clipPath = 'none';
    });
}