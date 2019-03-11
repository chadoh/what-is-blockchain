export const animationLength = 350

export const openBlock = (block: HTMLElement): void => {
  // 1. duplicate the element, position above old element
  const clone = block.cloneNode(true) as HTMLElement
  const rect = block.getBoundingClientRect()
  let styles = `
    position: absolute;
    top: calc(${rect.top}px + 1em);
    left: calc(${rect.left}px - 0.35em);
    width: ${block.offsetWidth}px;
    height: ${block.offsetHeight}px;
    transform: perspective(1000em) rotateY(330deg) scaleX(1.1) translateZ(1em);
    transition: all ${animationLength}ms;
  `
  clone.style.cssText = clone.style.cssText + ";" + styles

  // save values for closing block later
  clone.dataset.top = clone.style.top
  clone.dataset.left = clone.style.left
  clone.dataset.width = clone.style.width
  clone.dataset.height = clone.style.height

  // 2. add to #opened-block, show #opened-block
  const container = document.getElementById("opened-block")
  container.style.display = "block"
  container.appendChild(clone)

  // 3. prevent body scroll
  // DOES NOT WORK ON MOBILE (or at least iOS) –
  // consider using something like https://www.npmjs.com/package/body-scroll-lock
  document.body.style.overflow = "hidden"

  // 4. set visibility=hidden using class which can be removed when closing
  block.className = block.className + " opened"

  // timeout prevents some cross-browser bugs on opening animation
  setTimeout(() => {
    // 5. make full screen
    const inner = clone.querySelector(`[data-behavior="inner-height"]`) as HTMLElement
    styles = `
      top: 1em;
      left: 1em;
      width: calc(100vw - 2em);
      height: ${inner.getBoundingClientRect().height}px;
      transform: perspective(40em) rotateY(180deg) translateZ(1em);
    `
    clone.style.cssText = clone.style.cssText + ";" + styles

    // 6. remove perspective to ensure consistent styling across browsers
    const wrapper = document.querySelector("#opened-block") as HTMLElement
    wrapper.style.perspective = "none"

    // 7. wait for width to adjust, then readjust height to height of inner children
    //    (it's hard to get the height correct until the width is set)
    setTimeout(() => {
      clone.style.height = `calc(${inner.getBoundingClientRect().height}px + 1em)`
    }, animationLength)
  }, 50)
}

export const closeBlock = function(clone: HTMLElement): void {
  // 1. re-add perspective to wrapper
  const wrapper = document.querySelector("#opened-block") as HTMLElement
  wrapper.style.perspective = "1000em"

  // 2. set back to original dimensions
  let styles = `
    position: fixed;
    top: ${clone.dataset.top};
    left: ${clone.dataset.left};
    width: ${clone.dataset.width};
    height: ${clone.dataset.height};
    transform: rotateY(330deg) scaleX(1.1) translateZ(1em);
  `
  clone.style.cssText = clone.style.cssText + ";" + styles

  // 3. wait for animation to complete
  setTimeout(() => {
    // 4. make original block visible again
    const block = document.querySelector(".block.opened")
    if (block) block.className = block.className.replace(/ opened/, "")

    // 5. remove placeholder
    clone.remove()

    // 6. hide #opened-block
    const container = document.getElementById("opened-block")
    container.style.display = "none"

    document.body.style.overflow = ""
  }, animationLength)
};

