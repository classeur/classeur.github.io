(function() {
    window.BezierEasing.css.materialOut = window.BezierEasing(0.25, 0.8, 0.25, 1.0);
    window.BezierEasing.css.outBack = window.BezierEasing(0.175, 0.885, 0.320, 1.125);
    var editorContent = '> Re-enjoy writing, with *Markdown*.\n';
    var editor = window.cledit(
        document.querySelector('.content'),
        document.querySelector('.scroller')
    );
    var grammar = window.mdGrammar({
        fcbs: true,
        tables: true,
        strikes: true
    });
    editor.init({
        content: editorContent,
        sectionDelimiter: '^.+[ \\t]*\\n=+[ \\t]*\\n+|^.+[ \\t]*\\n-+[ \\t]*\\n+|^\\#{1,6}[ \\t]*.+?[ \\t]*\\#*\\n+',
        highlighter: function(text) {
            return window.Prism.highlight(text, grammar);
        }
    });

    var splashElt = document.querySelector('.splash');
    var pageElt = document.querySelector('.page');
    var headerElt = document.querySelector('.header');
    var wrapperElt = document.querySelector('.wrapper-1');
    var scrollerElt = document.querySelector('.scroller');
    var startBtnElt = document.querySelector('.start.btn');
    var optionElts = Array.prototype.slice.call(document.querySelectorAll('.option'));
    var socialBtns = Array.prototype.slice.call(document.querySelectorAll('.social a'));

    startBtnElt.addEventListener('click', function(evt) {
        evt.preventDefault();
        document.body.clanim.scrollTop(window.innerHeight).duration(800).easing('materialOut').start();
        document.querySelector('html').clanim.scrollTop(window.innerHeight).duration(800).easing('materialOut').start();
    });

    var wrapperY = 1200;
    var wrapperRatio = 1;

    function onResize() {
        splashElt.clanim.height(window.innerHeight).start();
        pageElt.clanim.top(window.innerHeight).start();
        if (window.innerWidth < 340) {
            wrapperRatio = 0.4;
        } else if (window.innerWidth < 460) {
            wrapperRatio = 0.5;
        } else if (window.innerWidth < 560) {
            wrapperRatio = 0.6;
        } else if (window.innerWidth < 660) {
            wrapperRatio = 0.7;
        } else if (window.innerWidth < 760) {
            wrapperRatio = 0.85;
        }
        var height = window.innerHeight * 3 / 4 / wrapperRatio | 0;
        height = height > 700 ? 700 : height;
        scrollerElt.clanim.height(height).start();
        wrapperElt.clanim.bottom(-wrapperElt.offsetHeight + height).scale(wrapperRatio).translateY(wrapperY).start();
    }
    window.addEventListener('resize', onResize);

    function onScroll() {
        var threshold = window.innerHeight - 120;
        optionElts.forEach(function(elt) {
            if (!elt.isShown && elt.getBoundingClientRect().top < threshold) {
                elt.isShown = true;
                elt.clanim.opacity(1).translateY(0).duration(600).easing('materialOut').start(true);
            }
        });
    }
    window.addEventListener('scroll', onScroll);

    headerElt.clanim.opacity(0).start().classList.remove('hidden');
    startBtnElt.clanim.opacity(0).translateX(-startBtnElt.offsetWidth / 2).translateY(-20).start().classList.remove('hidden');
    optionElts.forEach(function(elt) {
        elt.clanim.opacity(0).translateY(40).start().classList.remove('hidden');
    });
    socialBtns.forEach(function(elt) {
        elt.clanim.duration(400).easing('materialOut').start(true);
    });
    if (navigator.appVersion.indexOf('Mac') != -1) {
        document.querySelector('.osx.option').classList.remove('no-display');
    }
    if (navigator.appVersion.indexOf('Win') != -1) {
        document.querySelector('.windows.option').classList.remove('no-display');
    }
    if (navigator.appVersion.indexOf('Linux') != -1) {
        document.querySelector('.linux.option').classList.remove('no-display');
    }
    if (window.chrome) {
        document.querySelector('.chrome.option').classList.remove('no-display');
    }
    if (typeof InstallTrigger !== 'undefined') {
        document.querySelector('.firefox.option').classList.remove('no-display');
    }
    onResize();
    onScroll();

    setTimeout(function() {
        headerElt.clanim.opacity(1).duration(600).easing('materialOut').start(true);
        setTimeout(function() {
            wrapperY = 0;
            wrapperElt.clanim.scale(wrapperRatio).translateY(wrapperY).duration(500).easing('outBack').start(true).classList.remove('hidden');
            setTimeout(function() {
                startBtnElt.clanim.opacity(1).translateY(0).duration(1000).easing('materialOut').start(true);
                editor.setSelection(editorContent.length, editorContent.length);
            }, 1000);
        }, 500);
    }, 500);
})();
