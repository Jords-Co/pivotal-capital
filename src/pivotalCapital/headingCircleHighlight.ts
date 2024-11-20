/**
 * Heading Circle Highlight.
 * 
 * @author <cabal@digerati.design>
 */
export const headingCircleHighlight = () => {
    const circleWrappers = document.querySelectorAll('[dd-circle-highlight="wrapper"]'),
        circleElements = document.querySelectorAll('[dd-circle-highlight="element"]');
    console.log(circleWrappers);
    console.log(circleElements);
    if (!circleWrappers || !circleElements) {
        return;
    }
    console.log('present!');
    circleWrappers.forEach((circleWrapper, index) => {
        let circleElement = circleElements[index];
        console.log(circleWrapper);
        console.log(circleElement);
        circleWrapper.appendChild(circleElement.cloneNode(true));
    });
};