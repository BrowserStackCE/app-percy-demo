module.exports = class Page {
  async scroll(anchorDetails, startAndEndPercentage) {
    const startPercentage = startAndEndPercentage["start"];
    const endPercentage = startAndEndPercentage["end"];
    const anchor = anchorDetails["anchor"];
    const fixedAnchor = anchorDetails["fixedAnchor"];

    const anchorPercentage = 50;

    const { width, height } = await driver.getWindowSize();
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    if (anchor == "x") {
      if (!fixedAnchor) {
        startX = (width * anchorPercentage) / 100;
      } else {
        startX = fixedAnchor;
      }
      endX = startX;
      startY = (height * startPercentage) / 100;
      endY = (height * endPercentage) / 100;
    } else if (anchor == "y") {
      if (!fixedAnchor) {
        startY = (height * anchorPercentage) / 100;
      } else {
        startY = fixedAnchor;
      }
      endY = startY;
      startX = (width * startPercentage) / 100;
      endX = (width * endPercentage) / 100;
    }
    console.debug(
      `Swiping from (${startX}, ${startY}) -> (${endX}, ${endY}) with ${anchor} as constant axis`
    );

    await driver.performActions([
        {
            // a. Create the event
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                // b. Move finger into start position
                { type: 'pointerMove', duration: 0, x: startX, y: startY },
                // c. Finger comes down into contact with screen
                { type: 'pointerDown', button: 0 },
                // d. Pause for a little bit
                { type: 'pause', duration: 100 },
                // e. Finger moves to end position
                //    We move our finger from the center of the element to the
                //    starting position of the element.
                //    Play with the duration to make the swipe go slower / faster
                { type: 'pointerMove', duration: 1000, x: endX, y: endY },
                // f. Finger gets up, off the screen
                { type: 'pointerUp', button: 0 },
            ],
        },
    ]);
    await driver.pause(2000);
  }

  async scrollToElement(anchorDetails, element) {
    await driver.pause(2000);
    let startAndEndPercentage = { start: 90, end: 10 };
    if(driver.isIOS){
        startAndEndPercentage = { start: 30, end: 20 };
    }
    
    let elementDisplayed = await (await element).isDisplayed();
    const MAXIMUM_SWIPES = 10;
    let swipes = 0;
    while (swipes < MAXIMUM_SWIPES && !(await elementDisplayed)) {
      await this.scroll(anchorDetails, startAndEndPercentage);
      elementDisplayed = await (await element).isDisplayed();
      swipes++;
    }

    if (swipes == MAXIMUM_SWIPES && !elementDisplayed) {
      throw "Element not found.";
    }
  }

  async swipeOnElement(anchorDetails, startAndEndPercentage, element) {
    const elementLocation = await driver.getElementRect(
      await (
        await element
      ).elementId
    );
    let fixedAnchor = 0;
    if (anchorDetails["anchor"] == "x") {
      fixedAnchor = elementLocation["x"] + elementLocation["width"] / 2;
    } else if (anchorDetails["anchor"] == "y") {
      fixedAnchor = elementLocation["y"] + elementLocation["height"] / 2;
    }
    anchorDetails["fixedAnchor"] = fixedAnchor;
    await this.scroll(anchorDetails, startAndEndPercentage);
  }

  async tap(x, y) {
    await driver.touchPerform([
      {
        action: "press",
        options: {
          x: x,
          y: y,
        },
      },
      {
        action: "wait",
        options: {
          ms: 100,
        },
      },
      {
        action: "release",
        options: {},
      },
    ]);
  }
};
