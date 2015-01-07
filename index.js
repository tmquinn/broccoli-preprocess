var Writer = require('broccoli-writer')
  , pp = require('preprocess')
  , path = require('path');

function PreprocessFilter (inputTree, options) {
  if (!(this instanceof PreprocessFilter)) {
    return new PreprocessFilter(inputTree, options);
  }

  this.inputTree = inputTree;
  this.options = options;

}

PreprocessFilter.prototype = Object.create(Writer.prototype);
PreprocessFilter.prototype.constructor = PreprocessFilter;

PreprocessFilter.prototype.write = function (readTree, destDir) {
  var _this = this;

  return readTree(this.inputTree).then(function (result) {
    var src = path.join(result, _this.options.src)
      , dest = path.join(destDir, _this.options.dest);

    pp.preprocessFileSync(src, dest, _this.options.options.context);
  });
};

module.exports = PreprocessFilter;