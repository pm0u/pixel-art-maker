document.addEventListener('DOMContentLoaded', (event) => {

  let body = document.getElementsByTagName('body')[0]
  let canvasOuter = document.getElementById('outer-canvas')
  let canvasInner = document.getElementById('inner-canvas')
  let palette = document.getElementById('palette')
  let colors = ['#0f151b', '#292732', '#535867', '#95928f', '#f1f1ea', '#c58d65', '#8d5242', '#513d3d', '#ecd56d', '#ea7730', '#cd3d3d', '#7c3f8c', '#304271', '#0083c8', '#47a44d', '#1f6143']
  let brushColor = colors[0]
  let brushActive = false

  // event listener for canvas.
  canvasInner.addEventListener('click', pixelColorSetter)
  //palette.addEventListener('click', colorPicker)


  //event listener for mousedown to enable brush strokes
  body.addEventListener('mousedown', function() {
    brushActive = true;
    console.log('mousedown')
  })
  body.addEventListener('mouseup', function() {
    brushActive = false
  })



  //populate canvas with pixels
  let pixel = document.createElement('div')
  pixel.style.width = '100%'
  pixel.style.paddingTop = '100%'
  pixel.style.border = '1px solid #ddd'
  pixel.style.backgroundColor = colors[4]

  for (let i = 0; i < 4225; i++) {
    pixel.id = i
    canvasInner.appendChild(pixel.cloneNode())
    document.getElementById(i).addEventListener('mouseenter', brushStroke)
  }

  function brushStroke(event) {
    let pix = event.target

    if (brushActive === true) {
      pix.style.backgroundColor = brushColor
    }
  }

  function pixelColorSetter(event) {
    let div = event.target
    if (event.target !== canvasInner) {
      div.style.backgroundColor = brushColor
    }
  }


  //build palette
  let paletteItem = document.createElement('div')
  paletteItem.style.width = '100%'
  paletteItem.style.paddingTop = '100%'
  paletteItem.style.boxSizing = 'border-box'
  paletteItem.className = 'palette-item'

  for (let i in colors) {
    paletteItem.style.backgroundColor = colors[i]
    paletteItem.id = `p${i}`
    paletteItem.style.borderRadius = '10%'
    paletteItem.style.boxShadow = `3px 0px 0px rgba(0,0,0,.4), 3px 0px 0px ${colors[i]}, inset 1px 1px 0px rgba(255,255,255,.6), inset 0px 0px 3px rgba(255,255,255,.5)`
    palette.appendChild(paletteItem.cloneNode())
  }


  let paletteItems = document.getElementsByClassName('palette-item')
  for (let i = 0; i < paletteItems.length; i++) {
    paletteItems[i].addEventListener('click', colorPicker)
  }



  function colorPicker(event) {
    let colorDiv = event.target
    console.log(colorDiv)
    let newColor = event.target.style.backgroundColor
    brushColor = newColor
    buttonToggler(event.target)

  }


  function buttonToggler(button) {



    for (let i = 0; i < paletteItems.length; i++) {

      if (paletteItems[i].classList.contains('down')) {
        paletteItems[i].classList.toggle('down')
        paletteItems[i].style.animationName = 'buttonPress'
        paletteItems[i].style.animationDuration = '.1s'
        paletteItems[i].style.animationTimingFunction = 'ease-out'
        paletteItems[i].style.animationDirection = 'reverse'

      }
    }

    if (!button.classList.contains('down')) {
      button.classList.toggle('down')
      button.style.animationName = 'buttonPress'
      button.style.animationDuration = '.1s'
      button.style.animationTimingFunction = 'ease-out'
      button.style.animationFillMode = 'forwards'
      button.style.animationDirection = 'normal'

    }

  }


})
