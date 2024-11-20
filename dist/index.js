"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/digerati/skipToMainContent.ts
  var skipToMainContent = () => {
    const trigger = document.querySelector('[dd-skip-to-main-content="trigger"]'), target = document.querySelector('[dd-skip-to-main-content="target"]');
    if (!trigger || !target) {
      return;
    }
    ["click", "keypress"].forEach((event) => {
      trigger.addEventListener(event, (e) => {
        if (e.type === "keydown" && e.which !== 13) {
          return;
        }
        e.preventDefault();
        target.setAttribute("tabindex", "-1");
        target.focus();
      });
    });
  };

  // src/digerati/formValidation.ts
  var formValidation = () => {
    class DigeratiFormValidation {
      /**
       * Create a New Instance.
       *
       * @return {void} 
       */
      constructor() {
        this.displayValidationErrorMessage = this.displayValidationErrorMessage.bind(this);
        this.getErrorElements = this.getErrorElements.bind(this);
        this.getErrorMessages = this.getErrorMessages.bind(this);
        this.getFormFieldType = this.getFormFieldType.bind(this);
        this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
        this.init = this.init.bind(this);
        this.triggerFormFieldValidation = this.triggerFormFieldValidation.bind(this);
        this.validateEmailField = this.validateEmailField.bind(this);
        this.validateFormField = this.validateFormField.bind(this);
        this.validateRequiredField = this.validateRequiredField.bind(this);
      }
      /**
       * Display Validation Error Message.
       *
       * @param  {HTMLElement} formField    
       * @param  {string} errorMessage 
       *
       * @return {void}             
       */
      displayValidationErrorMessage(formField, errorMessage) {
        const formFieldType = this.getFormFieldType(formField), errorElements = this.getErrorElements(formField, formFieldType);
        errorElements.message.innerHTML = errorMessage;
        errorElements.message.style.display = "block";
        errorElements.border.classList.add("is-invalid");
      }
      /**
       * Get Error Elements.
       *
       * @param  {HTMLElement} formField     
       * @param  {string} formFieldType 
       *
       * @return {Object}             
       */
      getErrorElements(formField, formFieldType) {
        let errorElements = {};
        if (formFieldType !== "select") {
          if (formFieldType === "textarea" && formField.name === "h-captcha-response") {
            errorElements.border = formField.parentElement;
            errorElements.message = formField.parentElement.nextElementSibling;
          } else {
            errorElements.border = formField;
            errorElements.message = formField.nextElementSibling;
          }
        } else {
          errorElements.border = formField.parentElement.previousElementSibling;
          errorElements.message = formField.parentElement.parentElement.nextElementSibling;
        }
        return errorElements;
      }
      /**
       * Get Error Messages.
       *
       * @param  {HTMLElement} formField 
       *
       * @return {Object}         
       */
      getErrorMessages(formField) {
        const errorMessages = {}, formFieldErrorMessagesAttr = formField.getAttribute("dd-error-messages");
        if (formFieldErrorMessagesAttr !== null) {
          for (let errorMessage of Object.entries(formFieldErrorMessagesAttr.split("|"))) {
            let [key, value] = errorMessage[1].split(":");
            errorMessages[key] = value;
          }
        }
        return errorMessages;
      }
      /**
       * Get Form Field Type.
       *
       * @param  {HTMLElement} formField 
       *
       * @return {string}           
       */
      getFormFieldType(formField) {
        let formFieldType = formField.getAttribute("type") || formField.tagName.toLowerCase();
        return formFieldType;
      }
      /**
       * Handle Subit Event.
       *
       * @param  {event} e 
       *
       * @return {void}   
       */
      handleSubmitEvent(e) {
        e.preventDefault();
        const submitButton = e.target, parentForm = submitButton.closest("form");
        const formFields = parentForm.querySelectorAll('input:not([type="submit"]), textarea, select');
        let formError = false;
        formFields.forEach((formField) => {
          const isValidField = this.validateFormField(formField);
          if (!isValidField) {
            formError = true;
          }
        });
        if (!formError) {
          submitButton.removeEventListener("click", this.handleSubmitEvent);
          submitButton.removeEventListener("touchstart", this.handleSubmitEvent);
          submitButton.click();
        }
      }
      /**
       * Validate Email Field.
       *
       * @param  {HTMLElement} formField     
       * @param  {string} fieldValue    
       * @param  {string} errorMessages 
       *
       * @return {boolean}               
       */
      validateEmailField(formField, fieldValue, errorMessages) {
        let isValidField = true;
        if (fieldValue.length > 0) {
          isValidField = fieldValue.indexOf("@") !== -1 && fieldValue.indexOf(".") !== -1;
          if (!isValidField) {
            let errorMessage = errorMessages.email === void 0 ? '"Email address" error message not defined' : errorMessages.email;
            this.displayValidationErrorMessage(formField, errorMessage);
          }
        }
        return isValidField;
      }
      /**
       * Validate Form Field.
       *
       * @param  {HTMLElement} formField 
       *
       * @return {boolean}           
       */
      validateFormField(formField) {
        let isValidField = true, fieldValue = formField.value.trim(), errorMessages = this.getErrorMessages(formField);
        if (formField.getAttribute("required") !== null) {
          isValidField = this.validateRequiredField(formField, fieldValue, errorMessages);
          if (!isValidField) {
            return false;
          }
        }
        if (formField.getAttribute("type") === "email") {
          isValidField = this.validateEmailField(formField, fieldValue, errorMessages);
          if (!isValidField) {
            return false;
          }
        }
        return isValidField;
      }
      /**
       * Validate Required Field.
       *
       * @param  {HTMLElement} formField     
       * @param  {string} fieldValue    
       * @param  {object} errorMessages 
       *
       * @return {boolean}               
       */
      validateRequiredField(formField, fieldValue, errorMessages) {
        let isValidField = fieldValue.length !== 0;
        if (!isValidField) {
          let errorMessage = errorMessages.required === void 0 ? '"Required" error message not defined' : errorMessages.required;
          this.displayValidationErrorMessage(formField, errorMessage);
        }
        return isValidField;
      }
      /**
       * Trigger Form Validation.
       *
       * @param  {HTMLElement} formField 
       *
       * @return {void}           
       */
      triggerFormFieldValidation(formField) {
        const isValidField = this.validateFormField(formField);
        if (isValidField) {
          const formFieldType = this.getFormFieldType(formField), errorElements = this.getErrorElements(formField, formFieldType);
          errorElements.message.innerHTML = "";
          errorElements.message.style.display = "";
          errorElements.border.classList.remove("is-invalid");
        }
      }
      /**
       * Initialise.
       *
       * @return {void} 
       */
      init() {
        const forms = document.querySelectorAll("form");
        forms.forEach((form) => {
          if (!form.getAttribute("novalidate")) {
            const submitButton = form.querySelector("input[type=submit]");
            submitButton.addEventListener("click", this.handleSubmitEvent);
            submitButton.addEventListener("touchstart", this.handleSubmitEvent);
            const inputAndTextareaFields = form.querySelectorAll('input:not([type="submit"]), textarea');
            inputAndTextareaFields.forEach((formField) => {
              formField.addEventListener("focus", () => {
                formField.removeEventListener("blur", this.triggerFormFieldValidation);
                formField.removeEventListener("keyup", this.triggerFormFieldValidation);
                formField.addEventListener("blur", () => {
                  this.triggerFormFieldValidation(formField);
                }, { passive: true });
                formField.addEventListener("keyup", () => {
                  this.triggerFormFieldValidation(formField);
                }, { passive: true });
              });
            });
          }
        });
        const formSubmitIxTriggers = document.querySelectorAll('[fs-formsubmit-element][data-animation-type="lottie"]');
        formSubmitIxTriggers.forEach((formSubmitIxTrigger) => {
          formSubmitIxTrigger.addEventListener("click", () => {
            const parentSection = formSubmitIxTrigger.closest("section");
            if (!parentSection) {
              return;
            }
            parentSection.scrollIntoView({ behavior: "smooth" });
          }, { passive: true });
        });
      }
    }
    const formValidation2 = new DigeratiFormValidation();
    formValidation2.init();
  };

  // src/digerati/currentYear.ts
  var currentYear = () => {
    const target = document.querySelector('[dd-date="current-year"]');
    if (!target) {
      return;
    }
    const fullYear = (/* @__PURE__ */ new Date()).getFullYear();
    target.innerText = fullYear.toString();
  };

  // src/index.ts
  window.Webflow || [];
  window.Webflow.push(() => {
    skipToMainContent();
    formValidation();
    currentYear();
  });
})();
//# sourceMappingURL=index.js.map
