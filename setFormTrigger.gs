function myFunction() {
  ScriptApp.newTrigger("formSubmit")
  .forForm("1UkKUeSLs1bCq-TKTOouxzhIxc7RsOPvVYStJtJ8TE4s")
  .onFormSubmit()
  .create()
}