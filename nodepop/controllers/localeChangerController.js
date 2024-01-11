function localeChangerController(req, res, next) {
  const locale = req.params.locale;

  res.cookie('nodepop-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24, // 1 dia (cookie diaria)
  });

  res.redirect(req.get('referer'));
}

module.exports = localeChangerController;
