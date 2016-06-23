;(function () {
  window.BezierEasing.css.materialOut = window.BezierEasing(0.25, 0.8, 0.25, 1.0)
  window.BezierEasing.css.outBack = window.BezierEasing(0.175, 0.885, 0.320, 1.125)
  var editorContent = '> Re-enjoy writing, with *Markdown*.\n'
  var editor = window.cledit(
    document.querySelector('.content'),
    document.querySelector('.scroller')
  )
  var grammar = window.mdGrammar({
    fcbs: true,
    tables: true,
    strikes: true
  })
  editor.init({
    content: editorContent,
    sectionDelimiter: '^.+[ \\t]*\\n=+[ \\t]*\\n+|^.+[ \\t]*\\n-+[ \\t]*\\n+|^\\#{1,6}[ \\t]*.+?[ \\t]*\\#*\\n+',
    highlighter: function (text) {
      return window.Prism.highlight(text, grammar)
    }
  })

  var navbarElt = document.querySelector('.navbar')
  var splashElt = document.querySelector('.splash')
  var backgroundElt = splashElt.querySelector('.background')
  var pageElt = document.querySelector('.page')
  var wrapperElt = document.querySelector('.wrapper-1')
  var scrollerElt = document.querySelector('.scroller')
  // var optionElts = Array.prototype.slice.call(document.querySelectorAll('.option'))
  var socialBtns = Array.prototype.slice.call(document.querySelectorAll('.social a'))

  var wrapperY = 1200

  function onScroll () {
    splashElt.clanim.height(window.innerHeight).start()
    pageElt.clanim.top(window.innerHeight).start()

    if (window.scrollY < window.innerHeight) {
      var wrapperRatio = 1
      if (window.innerWidth < 340) {
        wrapperRatio = 0.4
      } else if (window.innerWidth < 460) {
        wrapperRatio = 0.5
      } else if (window.innerWidth < 560) {
        wrapperRatio = 0.6
      } else if (window.innerWidth < 660) {
        wrapperRatio = 0.7
      } else if (window.innerWidth < 760) {
        wrapperRatio = 0.85
      }
      var height = window.innerHeight * 2 / 3 / wrapperRatio | 0
      height = height > 700 ? 700 : height
      scrollerElt.clanim.height(height).start()
      backgroundElt.clanim.opacity((window.innerHeight - window.scrollY * 0.6) / window.innerHeight).start()
      wrapperElt.clanim.bottom(-wrapperElt.offsetHeight + height).scale(wrapperRatio)
      moveWrapperElt()
    }

    // var threshold = window.innerHeight - 160
    // optionElts.forEach(function (elt) {
    //   var coef = (threshold - elt.getBoundingClientRect().top) / 160
    //   coef = coef > 1 ? 1 : coef < 0 ? 0 : coef
    //   elt.clanim.opacity(coef).translateY((1 - coef) * 80).start(true)
    // })
  }

  function moveWrapperElt (ease) {
    wrapperElt.clanim.translateY(wrapperY - window.scrollY / 2)
    if (ease) {
      wrapperElt.clanim.duration(800).easing('materialOut')
    }
    wrapperElt.clanim.start(true)
  }

  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onScroll)

  socialBtns.forEach(function (elt) {
    elt.clanim.duration(400).easing('materialOut').start(true)
  })
  if (navigator.appVersion.indexOf('Mac') !== -1) {
    document.querySelector('.osx.option').classList.remove('no-display')
  }
  if (navigator.appVersion.indexOf('Win') !== -1) {
    document.querySelector('.windows.option').classList.remove('no-display')
  }
  if (navigator.appVersion.indexOf('Linux') !== -1) {
    document.querySelector('.linux.option').classList.remove('no-display')
  }
  if (window.chrome) {
    document.querySelector('.chrome.option').classList.remove('no-display')
  }
  if (typeof InstallTrigger !== 'undefined') {
    document.querySelector('.firefox.option').classList.remove('no-display')
  }

  onScroll()

  setTimeout(function () {
    wrapperY = 0
    moveWrapperElt(true)
    setTimeout(function () {
      editor.setSelection(editorContent.length, editorContent.length)
      navbarElt.clanim.opacity(1).duration(800).easing('materialOut').start(true)
    }, 1000)
  }, 200)
})()
