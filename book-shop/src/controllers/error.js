exports.get404Page = (req, res, next) => {
  res.status(404).render('fourOfour', {pageTitle: 'Page Not Found!'});
};