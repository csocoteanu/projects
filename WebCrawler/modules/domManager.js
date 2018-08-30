function domManager() {

    const SRC_PROPERTY     = "src=\"";
    const SRC_PROPERTY_LEN = SRC_PROPERTY.length;

    var _me = this;

    this.extractLinks = function(htmlBody) {

        var index = htmlBody.indexOf('<img', index);
        var links = [];

        while (index !== -1) {

            index = htmlBody.indexOf(SRC_PROPERTY, index + 1);
            if (index == -1) {
                break;
            }

            var imageLastIndex = htmlBody.indexOf('\"', index + SRC_PROPERTY_LEN);
            var imagePath      = htmlBody.substring(index + SRC_PROPERTY_LEN, imageLastIndex);

            index = imageLastIndex + imagePath.length + 1;
            index = htmlBody.indexOf('<img', index);

            links.push(imagePath);
        }

        return links;
    };

}

exports.create = function() { return new domManager(); };