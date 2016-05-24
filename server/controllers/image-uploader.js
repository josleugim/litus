/**
 * Created by Mordekaiser on 17/05/16.
 */
var Image = require('mongoose').model('Image');

exports.post = function (req, res) {
    console.log('POST Image Uploader');

    var data = {};
    if(req.files['newImage']) {
        data.name = req.files['newImage'][0].filename;
    }

    var image = new Image(data);
    image.save(function (err, collection) {
        if(err) {
            console.log('Error al guardar la imagen: ' + err);
            res.status(500).json({success: false, error: 'No se pudo guardar la imagen: ' + err.errmsg});
            res.end();
        } else {
            res.status(201).json({success: true});
            res.end();
        }
    });
};

exports.get = function (req, res) {
    console.log('GET Images uploader');
    Image.find({isActive: true})
        .exec(function (err, images) {
            if(err) {
                console.log('Error at GET method: ' + err);
                res.status(500);
                res.end()
            } else {
                for(var i in images) {
                    images[i].name = 'http://' + req.headers.host + "/litus-uploads/" + images[i].name;
                }
                res.status(200).json(images);
                res.end();
            }
        })
};

exports.deleteImage = function (req, res) {
    Image.remove({_id: req.query._id}, function (err) {
        if(err) {
            console.log('Cannot delete image record, error: ' + err);
            res.status(500);
            res.end();
        } else {
            res.status(200).json({success: true});
            res.end();
        }
    })
};