const express = require('express');
const StyleModel = require("./../model/style");
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const styles = await StyleModel.find();
    res.render("dashboard/styles/styles.hbs", {
      styles,
    });
    } catch (dbErr) {
      next(dbErr);
    }
  });

  router.get('/create', (req, res) => res.render('dashboard/styles/styleCreate.hbs'));

  router.post('/create', (req, res, next) => {
    const { name, color, wikiURL } = req.body;
    StyleModel.create({ name, color, wikiURL})
    .then(styleFromDB => res.redirect('/dashboard/styles'))
    .catch(error => console.log(`Error while creating a new style:`, error));
  });

  router.get('/update/:id', (req, res, next) => {
    const { id } = req.params;
    StyleModel.findById(id)
      .then(styleToEdit => {
        res.render('dashboard/styles/styleUpdate.hbs', {style: styleToEdit}); 
      })
      .catch(error => next(error));
  });
  
  router.post('/update/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, color, wikiURL } = req.body;
    StyleModel.findByIdAndUpdate(id, { name, color, wikiURL }, { new: true })
    .then(updatedStyle => res.redirect("/dashboard/styles"))
    .catch(error => next(error));
  });


  router.post('/delete/:id', (req, res, next) => {
    const { id } = req.params;
    StyleModel.findOneAndDelete(id)
    .then(()=> res.redirect('/dashboard/styles'))
    .catch(error => next(error));
  });
  
  module.exports = router;