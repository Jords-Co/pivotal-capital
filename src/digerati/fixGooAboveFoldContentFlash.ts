/**
 * Fix Goo Above Fold Content Flash.
 * 
 * @author <cabal@digerati.design>
 */
export const fixGooAboveFoldContentFlash = () => {
    const h1 = document.querySelector('h1');
    if (!h1) {
        return
    }
    const span = h1.querySelector('span');
    if (span) {
        h1.classList.remove('text-style-hidden');
        return;
    }
    new MutationObserver(function () {
        h1.classList.remove('text-style-hidden');
    }).observe(h1, {
        subtree: true,
        childList: true
    });
};
