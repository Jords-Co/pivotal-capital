/**
 * Heading Circle Highlight.
 * 
 * @author <cabal@digerati.design>
 */
export const headingCircleHighlight = () => {
    const circleWrappers = document.querySelectorAll('[dd-circle-highlight="wrapper"]'),
        circleElements = document.querySelectorAll('[dd-circle-highlight="element"]');
    if (!circleWrappers || !circleElements) {
        return;
    }
    circleWrappers.forEach((circleWrapper, index) => {
        let circleElement = circleElements[index];
        circleWrapper.appendChild(circleElement.cloneNode(true));
    });
};
