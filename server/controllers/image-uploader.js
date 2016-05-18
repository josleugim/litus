/**
 * Created by Mordekaiser on 17/05/16.
 */
exports.post = function (req, res) {
    console.log('POST Image Uploader');
    if(req.files) {
        console.log(req.files);
    }
};

exports.get = function (req, res) {
    console.log('GET Images uploader');
    
};