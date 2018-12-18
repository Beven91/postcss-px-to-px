var postcss = require('postcss');

var DEFAULTS = {
  times: 16,
};

function nonForcedNumericRegex(number) {
  // finds pixel values not followed by `/* force */`
  return new RegExp(number + 'px(?!\\s*\\/\\*\\s*force\\s*\\*\\/)', 'g');
}

module.exports = postcss.plugin('postcss-px-to-px', function (opts) {
  var times = opts.times || DEFAULTS.times;

  var minPixelValue = opts.minPixelValue || 0;
  var regex = /([\d\.]+)px(\s*\/\*\s*force\s*\*\/)?/g;

  var convert = function(context) {
    var replaceable = context.match(regex);

    if (replaceable) {
      replaceable.forEach(function(value) {
        var matches = regex.exec(value);
        regex.lastIndex = 0;

        // if the value is not forced to be pixels, let's replace any matching
        if (!matches[2]) {
          if(matches[1]>= minPixelValue){
            context = context.replace(nonForcedNumericRegex(matches[1]), matches[1] / times + 'px');
          }
        }
      });
    }

    return context;
  };

  return function (css) {
    css.walk(function(node) {
      if (node.type === 'decl') {
        node.value = convert(node._value ? node._value.raw : node.value);
      }
    });
  };
});
