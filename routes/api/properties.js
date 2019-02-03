const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose");

// load Property model
const Property = require("../../models/Property");

// @route GET api/properties/test
// @desc tests our a properties route
// @access PUBLIC
router.get("/test", (req, res) =>
  res.json({ msg: "properties test route is active" })
);

// @route   POST api/properties
// @desc    CREATE a property
// @access  PUBLIC
router.post("/", (req, res) => {
  const newProperty = new Property({
    name: req.body.name,
    img: req.body.img,
    ba: req.body.ba,
    br: req.body.br,
    price: req.body.price,
    sqft: req.body.sqft
  });

  newProperty
    .save()
    .then(property => res.json(property))
    .catch(err =>
      res
        .status(500)
        .json({ msg: "Your property could not be saved. Please try again" })
    );
});

// @route GET api/properties
// @desc retrieves all properties
// @access PUBLIC
router.get("/", (req, res) => {
  const errors = {};
  Property.find()
    .sort({ date: -1 })
    .then(properties => {
      if (!properties) {
        errors.noProperties = "No properties found";
        return res.status(404).json(errors);
      }
      res.json(properties);
    })
    .catch(err => res.status(404).json({ notfound: "No properties found" }));
});

// @route GET api/properties
// @desc retrieves all properties
// @access PUBLIC
router.get("/:id", (req, res) => {
  Property.findById(req.params.id)
    .then(property => res.json(property))
    .catch(err =>
      res.status(404).json({ msg: "This property cannot be found" })
    );
});

// @route GET api/properties
// @desc retrieves a single property
// @access PUBLIC
router.get("/:id", (req, res) => {
  Property.findById(req.params.id)
    .then(property => res.json(property))
    .catch(err => res.status(404).json({ notfound: "No Property found" }));
});

// @route DELETE api/properties/:id
// @desc destroys a single property
// @access PUBLIC
router.delete("/:id", (req, res) => {
  Property.findById(req.params.id)
    .then(property => property.remove())
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
});

module.exports = router;
