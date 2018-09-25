(function() {
    var modals = document.querySelectorAll('.modal');
    var datepickers = document.querySelectorAll('.datepicker');
    M.Modal.init(modals);
    M.Datepicker.init(datepickers, {format: 'dd/mm/yyyy', maxDate: new Date(), container: document.body});
})();