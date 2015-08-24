(function() {
    var vendors = ['moz', 'webkit'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    function identity(x) {
        return x;
    }

    function ElementAttribute(name) {
        this.name = name;
        this.setStart = function(animation) {
            var value = animation.elt[name];
            animation.$start[name] = value;
            return value !== undefined && animation.$end[name] !== undefined;
        };
        this.applyCurrent = function(animation) {
            animation.elt[name] = animation.$current[name];
        };
    }

    function StyleAttribute(name, unit, defaultValue, wrap) {
        wrap = wrap || identity;
        this.name = name;
        this.setStart = function(animation) {
            var value = parseFloat(animation.elt.style[name]);
            if (isNaN(value)) {
                value = animation.$current[name] || defaultValue;
            }
            animation.$start[name] = value;
            return animation.$end[name] !== undefined;
        };
        this.applyCurrent = function(animation) {
            animation.elt.style[name] = wrap(animation.$current[name]) + unit;
        };
    }

    function TransformAttribute(name, unit, defaultValue, wrap) {
        wrap = wrap || identity;
        this.name = name;
        this.setStart = function(animation) {
            var value = animation.$current[name];
            if (value === undefined) {
                value = defaultValue;
            }
            animation.$start[name] = value;
            if (animation.$end[name] === undefined) {
                animation.$end[name] = value;
            }
            return value !== undefined;
        };
        this.applyCurrent = function(animation) {
            var value = animation.$current[name];
            return value !== defaultValue && name + '(' + wrap(value) + unit + ')';
        };
    }

    var attributes = [
        new ElementAttribute('scrollTop'),
        new ElementAttribute('scrollLeft'),
        new StyleAttribute('opacity', '', 1),
        new StyleAttribute('zIndex', '', 0),
        new TransformAttribute('translateX', 'px', 0, Math.round),
        new TransformAttribute('translateY', 'px', 0, Math.round),
        new TransformAttribute('scale', '', 1),
        new TransformAttribute('rotate', 'deg', 0),
    ].concat([
        'width',
        'height',
        'top',
        'right',
        'bottom',
        'left'
    ].map(function(name) {
        return new StyleAttribute(name, 'px', 0, Math.round);
    }));

    function Animation(elt) {
        this.elt = elt;
        this.$current = {};
        this.$pending = {};
    }

    attributes.map(function(attribute) {
        return attribute.name;
    }).concat('duration', 'easing', 'delay').forEach(function(name) {
        Animation.prototype[name] = function(val) {
            this.$pending[name] = val;
            return this;
        };
    });

    Animation.prototype.start = function(endCb, stepCb) {
        var animation = this;
        animation.stop();
        animation.$start = {};
        animation.$end = animation.$pending;
        animation.$pending = {};
        animation.$attributes = attributes.filter(function(attribute) {
            return attribute.setStart(animation);
        });
        animation.$end.duration = animation.$end.duration || 0;
        animation.$end.delay = animation.$end.delay || 0;
        animation.$end.easing = window.BezierEasing.css[animation.$end.easing] || window.BezierEasing.css['ease-out'];
        animation.$end.endCb = typeof endCb === 'function' && endCb;
        animation.$end.stepCb = typeof stepCb === 'function' && stepCb;
        animation.$startTime = Date.now() + animation.$end.delay;
        animationLoop.call(animation, endCb === true);
        return animation.elt;
    };

    Animation.prototype.stop = function() {
        window.cancelAnimationFrame(this.$requestId);
    };

    function animationLoop(useTransition) {
        var animation = this;
        var progress = (Date.now() - animation.$startTime) / animation.$end.duration;
        var transition = '';
        if (useTransition && animation.$end.duration) {
            progress = 1;
            var transitions = [
                'all',
                animation.$end.duration + 'ms',
                animation.$end.easing.toCSS()
            ];
            animation.$end.delay && transitions.push(animation.$end.delay + 'ms');
            transition = transitions.join(' ');
        } else if (progress < 1) {
            animation.$requestId = window.requestAnimationFrame(animationLoop.bind(animation, false));
            if (progress < 0) {
                return;
            }
        } else if (animation.$end.endCb) {
            animation.$requestId = window.requestAnimationFrame(animation.$end.endCb);
        }

        var coeff = animation.$end.easing.get(progress);
        var transforms = animation.$attributes.reduce(function(transforms, attribute) {
            if (progress < 1) {
                var diff = animation.$end[attribute.name] - animation.$start[attribute.name];
                animation.$current[attribute.name] = animation.$start[attribute.name] + diff * coeff;
            } else {
                animation.$current[attribute.name] = animation.$end[attribute.name];
            }
            var transform = attribute.applyCurrent(animation);
            return transform && transforms.push(transform), transforms;
        }, []);

        transforms.length && transforms.push('translateZ(0)'); // activate GPU
        var transform = transforms.join(' ');
        animation.elt.style.WebkitTransform = transform;
        animation.elt.style.MozTransform = transform;
        animation.elt.style.transform = transform;
        animation.elt.style.WebkitTransition = transition;
        animation.elt.style.MozTransition = transition;
        animation.elt.style.transition = transition;
        animation.$end.stepCb && animation.$end.stepCb();
    }

    // Pattern: http://lea.verou.me/2015/04/idea-extending-native-dom-prototypes-without-collisions/
    Object.defineProperty(window.Element.prototype, 'clanim', {
        get: function() {
            Object.defineProperty(this, 'clanim', {
                value: new Animation(this)
            });
            return this.clanim;
        },
        configurable: true,
        writeable: false
    });

})();
